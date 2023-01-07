import { UseQueryResult } from "@tanstack/react-query";

import { InfoTooltip } from "../Tooltip";

import { List, ListItem, ListProps } from "./List";

export interface ItemsListProps<T extends ListItem>
  extends Omit<ListProps<T>, "data" | "isLoading"> {
  query: UseQueryResult<T[], unknown>;
  title?: string;
  tooltip?: string;
}

export const ItemsList = <T extends ListItem>({
  title,
  tooltip,
  query,
  ...rest
}: ItemsListProps<T>) => {
  return (
    <div>
      {/* Title */}
      {title && (
        <div className="mb-8 flex items-center space-x-3">
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
      )}
      <List {...rest} data={query.data} isLoading={query.isLoading} />
    </div>
  );
};
