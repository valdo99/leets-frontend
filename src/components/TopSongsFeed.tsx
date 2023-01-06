import { Trans } from "@lingui/macro";
import { useInfiniteQuery } from "@tanstack/react-query";

import { PaginatedList } from "@components/Basic/PaginatedList";
import { InfoTooltip } from "@components/Basic/Tooltip";
import { SongCard } from "@components/Song/SongCard";
import { useApiClient, useUser } from "@providers/AuthProvider";
import { usePlayer } from "@providers/PlayerProvider";
import { getNextPageParam } from "@utils/getNextPageParam";

export const TopSongsFeed = () => {
  const { user, loading } = useUser();
  const apiClient = useApiClient();
  const { setQueue } = usePlayer();

  const query = useInfiniteQuery(
    ["feed", user?._id],
    ({ pageParam }) => apiClient.songs.feed({ page: pageParam }),
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
    <>
      <div className="mb-8 flex items-center space-x-3">
        <h2 className="text-2xl font-bold leading-tight ">
          <Trans>Today&apos;s top songs</Trans>
        </h2>

        <InfoTooltip
          color="secondary"
          content={
            <p className="max-w-[200px] text-center text-sm">
              <Trans>Songs which received the most likes today</Trans>
            </p>
          }
        />
      </div>
      <PaginatedList
        query={query}
        item={(song) => (
          <SongCard
            key={song._id}
            song={song}
            onLikeChange={refetch}
            onPlay={() => onPlay(song._id)}
          />
        )}
      />
    </>
  );
};
