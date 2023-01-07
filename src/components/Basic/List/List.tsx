import { Trans } from "@lingui/macro";
import cx from "classnames";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

import { Entity } from "@api/types";
import { Button } from "@components/Basic/Button/Button";
import { Spinner } from "@components/Basic/Spinner";

export type ListItem = Pick<Entity, "_id">;

export interface ListProps<T extends ListItem> {
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

export const List = <T extends ListItem>({
  type = "list",
  isLoading,
  data,
  item: getItem,
  noResultsMessage,
  noResulstsCta,
  footer,
}: ListProps<T>) => {
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
