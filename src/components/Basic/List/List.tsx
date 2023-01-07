import cx from "classnames";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

import { Entity } from "@api/types";
import { Button } from "@components/Basic/Button/Button";
import { Spinner } from "@components/Basic/Spinner";

import { InfoTooltip } from "../Tooltip";

export type ListItem = Pick<Entity, "_id">;

export interface ListInnerProps<T extends ListItem> {
  type?: "list" | "grid";
  isLoading: boolean;
  data: T[] | undefined;
  item: (props: T) => ReactNode;
  noResultsMessage?: string;
  noResulstsCta?: {
    label: string;
    href: string;
  };
  footer?: ReactNode;
}

export const ListInner = <T extends ListItem>({
  type = "list",
  isLoading,
  data,
  item: getItem,
  noResultsMessage,
  noResulstsCta,
  footer,
}: ListInnerProps<T>) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-32">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  // TODO: handle case when no user is logged (allow different content, ReactNode)
  if (data?.length === 0 && (noResultsMessage || noResulstsCta)) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-14">
        {noResultsMessage && <p className="text-lg">{noResultsMessage}</p>}
        {noResulstsCta && (
          <Link href={noResulstsCta.href}>
            <a>
              <Button>{noResulstsCta.label}</Button>
            </a>
          </Link>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Data */}
      <div
        className={cx(
          type === "list"
            ? "flex flex-col space-y-4"
            : "grid grid-cols-1 gap-4 lg:grid-cols-2"
        )}
      >
        {data?.map((item) => (
          <Fragment key={item._id}>{getItem(item)}</Fragment>
        ))}
      </div>
      {footer}
    </>
  );
};

export interface ListProps<T extends ListItem> extends ListInnerProps<T> {
  title?: string;
  tooltip?: string;
  header?: ReactNode;
}

export const List = <T extends ListItem>({
  title,
  tooltip,
  header,
  ...rest
}: ListProps<T>) => {
  return (
    <div>
      {/* Title */}
      {title && (
        <div className="mb-8 flex flex-col justify-between space-y-3 sm:flex-row sm:items-center">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold leading-tight ">{title}</h2>
            {/* Tooltip */}
            {tooltip && (
              <InfoTooltip
                color="secondary"
                content={
                  <p className="max-w-[200px] text-center text-sm">{tooltip}</p>
                }
              />
            )}
          </div>
          {header && <div>{header}</div>}
        </div>
      )}
      <ListInner {...rest} />
    </div>
  );
};
