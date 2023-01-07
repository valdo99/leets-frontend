import { UseQueryResult } from "@tanstack/react-query";

import { List, ListItem, ListProps } from "./List";

export interface ItemsListProps<T extends ListItem>
  extends Omit<ListProps<T>, "data" | "isLoading"> {
  query: UseQueryResult<T[], unknown>;
}

export const ItemsList = <T extends ListItem>({
  query,
  ...rest
}: ItemsListProps<T>) => {
  return <List {...rest} data={query.data} isLoading={query.isLoading} />;
};
