export interface ApiResponse<T> {
  code: number;
  data: T;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
  pagination: {
    total: number;
    perPage: number;
    page: number;
  };
}

export interface ApiErrorResponse {
  status: number;
  data: {
    code: number;
    data: Record<string, string>;
    message: string;
  };
}

export type QueryParams = Record<string, string | number | boolean | undefined>;

export interface Entity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export type Id = Entity["_id"];

export type PaginationQueryParams = {
  page?: number;
  limit?: number;
};
