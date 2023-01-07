import { Trans } from "@lingui/macro";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

import { PaginatedApiResponse } from "@api/types";
import { Button } from "@components/Basic/Button/Button";
import { List, ListProps, ListItem } from "@components/Basic/List/List";
import { Spinner } from "@components/Basic/Spinner";
import { InfoTooltip } from "@components/Basic/Tooltip";

interface PaginatedListProps<T extends ListItem>
  extends Omit<ListProps<T>, "data" | "isLoading"> {
  query: UseInfiniteQueryResult<PaginatedApiResponse<T[]>, unknown>;
}

const PaginatedList = <T extends ListItem>({
  query,
  type = "list",
  ...rest
}: PaginatedListProps<T>) => {
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    query;

  const items = data?.pages.map((page) => page.data).flat();

  const LoadMoreButton = () => (
    <>
      {(isFetchingNextPage || hasNextPage) && (
        <div className="mt-8 flex h-10 items-center justify-center">
          {isFetchingNextPage ? (
            /* Loading more spinner */
            <Spinner className="h-10 w-10" />
          ) : (
            <>
              {/* Next page button */}
              {hasNextPage && (
                <Button onClick={() => fetchNextPage()} block={type === "list"}>
                  <Trans>Load more</Trans>
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );

  return (
    <List
      {...rest}
      type={type}
      data={items}
      isLoading={isLoading}
      footer={<LoadMoreButton />}
    />
  );
};

interface PaginatedItemsListProps<T extends ListItem>
  extends PaginatedListProps<T> {
  title?: string;
  tooltip?: string;
}

export const PaginatedItemsList = <T extends ListItem>({
  title,
  tooltip,
  ...rest
}: PaginatedItemsListProps<T>) => {
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

      <PaginatedList {...rest} />
    </>
  );
};
