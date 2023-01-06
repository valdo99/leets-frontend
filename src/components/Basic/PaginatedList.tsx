import { Trans } from "@lingui/macro";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { Fragment, ReactNode } from "react";

import { Entity, PaginatedApiResponse } from "@api/types";
import { Button } from "@components/Basic/Button/Button";
import { Spinner } from "@components/Basic/Spinner";

interface PaginatedListProps<T extends Pick<Entity, "_id">> {
  // data:
  //   | {
  //       pages: {
  //         data: T[];
  //       }[];
  //     }
  //   | undefined;
  // isLoading: boolean;
  // fetchNextPage: () => void;
  // hasNextPage: boolean | undefined;
  // isFetchingNextPage: boolean;
  query: UseInfiniteQueryResult<PaginatedApiResponse<T[]>, unknown>;
  item: (props: T) => ReactNode;
}

export const PaginatedList = <T extends Pick<Entity, "_id">>({
  item: getItem,
  query,
}: PaginatedListProps<T>) => {
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    query;

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center py-32">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <>
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
                <Spinner className="h-10 w-10" />
              ) : (
                <>
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
