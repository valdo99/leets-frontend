import { PaginatedApiResponse } from "@api/types";

export const getNextPageParam = (res: PaginatedApiResponse<any>) => {
  const { page, perPage, total } = res.pagination;
  if ((page + 1) * perPage < total) {
    return page + 1;
  }
  return undefined;
};
