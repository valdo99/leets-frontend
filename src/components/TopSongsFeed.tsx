import { Trans } from "@lingui/macro";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";

import { Spinner } from "@components/Basic/Spinner";
import { SongCard } from "@components/Song/SongCard";
import { useApiClient, useUser } from "@providers/AuthProvider";

import { Button } from "./Basic/Button";
import { InfoTooltip } from "./Basic/Tooltip";

export const TopSongsFeed = () => {
  const { user, loading } = useUser();
  const apiClient = useApiClient();

  const {
    data: songs,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["feed", user?._id],
    ({ pageParam }) => apiClient.posts.feed({ page: pageParam }),
    {
      enabled: !loading,
      getNextPageParam: ({ pagination }) => {
        const { page, perPage, total } = pagination;
        if ((page + 1) * perPage < total) {
          return page + 1;
        }
        return undefined;
      },
    }
  );

  return (
    <>
      <div className="mb-8 mt-10 flex items-center gap-3">
        <h2 className="text-2xl font-bold leading-tight">
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
            {songs?.pages.map((page, index) => (
              <Fragment key={index}>
                {page.data.map((song) => (
                  <SongCard key={song._id} post={song} onLikeChange={refetch} />
                ))}
              </Fragment>
            ))}
          </div>
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
        </>
      )}
    </>
  );
};
