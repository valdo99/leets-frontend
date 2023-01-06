import { Trans } from "@lingui/macro";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

import { Entity, PaginatedApiResponse } from "@api/types";
import { Button } from "@components/Basic/Button/Button";
import { Spinner } from "@components/Basic/Spinner";
import { InfoTooltip } from "@components/Basic/Tooltip";

type Data = Pick<Entity, "_id">;

interface ListProps<T extends Data> {
  query: UseInfiniteQueryResult<PaginatedApiResponse<T[]>, unknown>;
  item: (props: T) => ReactNode;
  noResultsMessage?: string;
  noResulstsCta?: {
    label: string;
    href: string;
  };
}

const List = <T extends Data>({
  query,
  item: getItem,
  noResultsMessage,
  noResulstsCta,
}: ListProps<T>) => {
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    query;

  if (isLoading) {
    return (
      <div className="flex justify-center py-32">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  // TODO: handle custom "no results" message (ReactNode)
  // TODO: handle case when no user is logged (allow different content, ReactNode)
  if (data?.pages.length === 0 && (noResultsMessage || noResulstsCta)) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-14">
        {noResultsMessage && (
          <p className="text-lg">
            <Trans>{noResultsMessage}</Trans>
          </p>
        )}
        {noResulstsCta && (
          <Link href={noResulstsCta.href}>
            <a>
              <Button>
                <Trans>{noResulstsCta.label}</Trans>
              </Button>
            </a>
          </Link>
        )}
      </div>
    );
  }

  return (
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
  );
};

interface PaginatedListProps<T extends Data> extends ListProps<T> {
  title?: string;
  tooltip?: string;
}

export const PaginatedList = <T extends Data>({
  title,
  tooltip,
  ...rest
}: PaginatedListProps<T>) => {
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

      <List {...rest} />
    </>
  );
};
