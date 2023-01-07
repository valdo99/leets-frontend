import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { User } from "@api/users";
import { PaginatedItemsList } from "@components/Basic/List/PaginatedItemsList";
import { SongCard } from "@components/Songs/SongCard";
import { useApiClient, useUser } from "@providers/AuthProvider";
import { usePlayer } from "@providers/PlayerProvider";
import { getNextPageParam } from "@utils/getNextPageParam";

export const UserLikedSongs = ({ user }: { user: User }) => {
  const { i18n } = useLingui();
  const apiClient = useApiClient();
  const { loading, user: loggedUser } = useUser();
  const { setQueue } = usePlayer();

  const isLoggedUser = user._id === loggedUser?._id;

  const query = useInfiniteQuery(
    ["liked-songs", user?._id, loggedUser?._id],
    ({ pageParam }) =>
      apiClient.users.likes(user.username, { page: pageParam }),
    {
      getNextPageParam,
      enabled: !loading,
    }
  );

  const { data: likedSongs, refetch } = query;

  const onPlay = (songId: string) => {
    if (!likedSongs) return;

    const songsList = likedSongs.pages
      .map((page) => page.data)
      .flat()
      .filter((song) => song.preview_url !== null);
    const index = songsList.findIndex((song) => song._id === songId);

    setQueue(songsList, index);
  };

  return (
    <PaginatedItemsList
      type="grid"
      query={query}
      noResultsMessage={
        isLoggedUser
          ? t(i18n)`You have no liked songs yet`
          : t(i18n)`No liked songs`
      }
      noResulstsCta={
        isLoggedUser
          ? { label: t(i18n)`Discover songs`, href: "/feed" }
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
