import { Trans } from "@lingui/macro";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Fragment } from "react";

import { User } from "@api/users";
import { Spinner } from "@components/Basic/Spinner";
import { useApiClient, useUser } from "@providers/AuthProvider";
import { usePlayer } from "@providers/PlayerProvider";

import { Button } from "./Basic/Button";
import { SongCard } from "./Song/SongCard";

export const UserHuntedSongs = ({ user }: { user: User }) => {
  const apiClient = useApiClient();
  const { loading, user: loggedUser } = useUser();
  const { setQueue } = usePlayer();

  const isLoggedUser = user._id === loggedUser?._id;

  const {
    data: uploadedSongs,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["uploaded-songs", user?._id, loggedUser?._id],
    ({ pageParam }) =>
      apiClient.users.uploads(user.username, { page: pageParam }),
    {
      getNextPageParam: ({ pagination }) => {
        const { page, perPage, total } = pagination;
        if ((page + 1) * perPage < total) {
          return page + 1;
        }
        return undefined;
      },
      enabled: !loading,
    }
  );

  const onPlay = (songId: string) => {
    if (!uploadedSongs) return;

    const songsList = uploadedSongs.pages
      .map((page) => page.data)
      .flat()
      .filter((song) => song.preview_url !== null);
    const index = songsList.findIndex((song) => song._id === songId);

    setQueue(songsList, index);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-14">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

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
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {uploadedSongs?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.data.map((song) => (
              <SongCard
                key={song._id}
                song={song}
                onLikeChange={refetch}
                onPlay={() => onPlay(song._id)}
              />
            ))}
          </Fragment>
        ))}
      </div>
      {(isFetchingNextPage || hasNextPage) && (
        <div className="mt-8 flex h-10 items-center justify-center">
          {isFetchingNextPage ? (
            <Spinner className="h-10 w-10" />
          ) : (
            <>
              {hasNextPage && (
                <Button onClick={() => fetchNextPage()}>
                  <Trans>Load more</Trans>
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
