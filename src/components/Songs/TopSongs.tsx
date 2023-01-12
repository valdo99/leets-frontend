import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { PaginatedItemsList } from "@components/Basic/List/PaginatedItemsList";
import { SongCard } from "@components/Songs/SongCard";
import { useApiClient, useUser } from "@providers/AuthProvider";
import { usePlayer } from "@providers/PlayerProvider";
import { slugToName } from "@utils/genres";
import { getNextPageParam } from "@utils/getNextPageParam";

import { GenresSelect } from "./GenresSelect";

export const TopSongs = ({ genre }: { genre?: string }) => {
  const { i18n } = useLingui();
  const { user, loading } = useUser();
  const apiClient = useApiClient();
  const { setQueue } = usePlayer();

  const query = useInfiniteQuery(
    ["feed", user?._id, genre],
    ({ pageParam }) =>
      apiClient.songs.feed({
        page: pageParam,
        genres: encodeURIComponent(genre || ""),
      }),
    {
      enabled: !loading,
      getNextPageParam,
    }
  );

  const { data: songs, refetch } = query;

  const onPlay = (songId: string) => {
    if (!songs) return;

    const songsList = songs.pages
      .map((page) => page.data)
      .flat()
      .filter((song) => song.preview_url !== null);
    const index = songsList.findIndex((song) => song._id === songId);

    setQueue(songsList, index);
  };

  return (
    <PaginatedItemsList
      title={t(i18n)`Today's top ${genre ? slugToName(genre) : ""} songs`}
      tooltip={t(i18n)`Songs which received the most likes today`}
      noResultsMessage={t(i18n)`No songs found`}
      query={query}
      item={(song) => (
        <SongCard
          key={song._id}
          song={song}
          onLikeChange={refetch}
          onPlay={() => onPlay(song._id)}
        />
      )}
      header={<GenresSelect baseUrl="/feed" selected={genre} />}
    />
  );
};
