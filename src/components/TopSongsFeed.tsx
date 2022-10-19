import { Trans } from "@lingui/macro";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { Button } from "@components/Basic/Button/Button";
import { Spinner } from "@components/Basic/Spinner";
import { SongCard } from "@components/Song/SongCard";
import { useApiClient, useUser } from "@providers/AuthProvider";

import { InfoTooltip } from "./Basic/Tooltip";

export const TopSongsFeed = () => {
  const { user } = useUser();
  const apiClient = useApiClient();

  const {
    data: songs,
    isLoading,
    refetch,
  } = useQuery(["top-songs", user?._id], () =>
    apiClient.posts.feed().then((data) => data.data)
  );

  return (
    <>
      <div className="mb-8 flex items-center gap-3">
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
      {isLoading ? (
        <div className="flex justify-center py-32">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {songs &&
              songs
                .slice(0, 7)
                .map((song) => (
                  <SongCard key={song._id} post={song} onLikeChange={refetch} />
                ))}
            <Link href="/songs">
              <Button size="lg">
                <Trans>See all</Trans>
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex h-10 items-center justify-center"></div>
        </>
      )}
    </>
  );
};
