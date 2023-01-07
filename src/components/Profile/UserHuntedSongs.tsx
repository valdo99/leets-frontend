import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";

import { User } from "@api/users";
import { Button } from "@components/Basic/Button";
import { PaginatedItemsList } from "@components/Basic/List/PaginatedItemsList";
import { SongCard } from "@components/Songs/SongCard";
import { useApiClient, useUser } from "@providers/AuthProvider";
import { usePlayer } from "@providers/PlayerProvider";
import { getNextPageParam } from "@utils/getNextPageParam";

export const UserHuntedSongs = ({ user }: { user: User }) => {
  const { i18n } = useLingui();
  const apiClient = useApiClient();
  const { loading, user: loggedUser } = useUser();
  const { setQueue } = usePlayer();

  const isLoggedUser = user._id === loggedUser?._id;

  const query = useInfiniteQuery(
    ["uploaded-songs", user?._id, loggedUser?._id],
    ({ pageParam }) =>
      apiClient.users.uploads(user.username, { page: pageParam }),
    {
      getNextPageParam,
      enabled: !loading,
    }
  );

  const { data: uploadedSongs, refetch } = query;

  const onPlay = (songId: string) => {
    if (!uploadedSongs) return;

    const songsList = uploadedSongs.pages
      .map((page) => page.data)
      .flat()
      .filter((song) => song.preview_url !== null);
    const index = songsList.findIndex((song) => song._id === songId);

    setQueue(songsList, index);
  };

  if (uploadedSongs?.pages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-14">
        {isLoggedUser ? (
          <>
            <p className="text-lg">
              <Trans>You have no uploaded songs yet</Trans>
            </p>
            <Link href="/upload">
              <a>
                <Button>
                  <Trans>Upload new song</Trans>
                </Button>
              </a>
            </Link>
          </>
        ) : (
          <p className="text-lg">
            <Trans>No uploaded songs</Trans>
          </p>
        )}
      </div>
    );
  }

  return (
    <PaginatedItemsList
      type="grid"
      query={query}
      noResultsMessage={
        isLoggedUser
          ? t(i18n)`You have no uploaded songs yet`
          : t(i18n)`No uploaded songs`
      }
      noResulstsCta={
        isLoggedUser
          ? { label: t(i18n)`Upload new song`, href: "/upload" }
          : undefined
      }
      item={(song) => (
        <SongCard
          key={song._id}
          song={song}
          onLikeChange={refetch}
          onPlay={() => onPlay(song._id)}
        />
      )}
    />
  );
};
