import { Trans } from "@lingui/macro";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";

import { Spinner } from "@components/Basic/Spinner";
import { useApiClient } from "@providers/AuthProvider";

import { ArtistCard } from "./ArtistCard";
import { Button } from "./Basic/Button";
import { InfoTooltip } from "./Basic/Tooltip";

export const ArtistsFeed = () => {
  const apiClient = useApiClient();

  const {
    data: artists,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["artists-feed"],
    ({ pageParam }) => apiClient.artists.topArtists({ page: pageParam }),
    {
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
    <div>
      <div className="mb-8 flex items-center space-x-3">
        <h2 className="text-2xl font-bold leading-tight">
          <Trans>Top Artists</Trans>
        </h2>
        <InfoTooltip
          color="secondary"
          content={
            <p className="max-w-[200px] text-center text-sm">
              <Trans>Score is based on number of likes to hunted songs</Trans>
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
          <div className="flex flex-col space-y-4">
            {artists?.pages.map((page, index) => (
              <Fragment key={index}>
                {page.data.map((artist) => (
                  <ArtistCard key={artist._id} artist={artist} />
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
                    <Button block onClick={() => fetchNextPage()}>
                      <Trans>Load more</Trans>
                    </Button>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
