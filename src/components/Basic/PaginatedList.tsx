import { Trans } from "@lingui/macro";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { Fragment, ReactNode } from "react";

import { Entity, PaginatedApiResponse } from "@api/types";
import { Button } from "@components/Basic/Button/Button";
import { Spinner } from "@components/Basic/Spinner";
import { InfoTooltip } from "@components/Basic/Tooltip";

interface PaginatedListProps<T extends Pick<Entity, "_id">> {
  query: UseInfiniteQueryResult<PaginatedApiResponse<T[]>, unknown>;
  item: (props: T) => ReactNode;
  title?: string;
  tooltip?: string;
}

export const PaginatedList = <T extends Pick<Entity, "_id">>({
  item: getItem,
  query,
  title,
  tooltip,
}: PaginatedListProps<T>) => {
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    query;

  return (
    <>
      {/* Title */}
      {title && (
        <div className="mb-8 flex items-center space-x-3">
          <h2 className="text-2xl font-bold leading-tight ">
            <Trans>{title}</Trans>
          </h2>

          {/* Tooltip */}
          {tooltip && (
            <InfoTooltip
              color="secondary"
              content={
                <p className="max-w-[200px] text-center text-sm">
                  <Trans>{tooltip}</Trans>
                </p>
              }
            />
          )}
        </div>
      )}

      {isLoading ? (
        /* Loading Spinner */
        <div className="flex justify-center py-32">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <>
          {/* Data */}
          <div className="flex flex-col space-y-4">
            {data?.pages.map((page, index) => (
              <Fragment key={index}>
                {page.data.map((item) => (
                  <Fragment key={item._id}>{getItem(item)}</Fragment>
                ))}
              </Fragment>
            ))}
          </div>
          {(isFetchingNextPage || hasNextPage) && (
            <div className="mt-8 flex h-10 items-center justify-center">
              {isFetchingNextPage ? (
                /* Loading more spinner */
                <Spinner className="h-10 w-10" />
              ) : (
                <>
                  {/* Next page button */}
                  {hasNextPage && (
                    <Button onClick={() => fetchNextPage()} block>
                      <Trans>Load more</Trans>
                    </Button>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
