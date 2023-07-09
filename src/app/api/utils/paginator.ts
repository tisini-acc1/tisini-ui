type Payloader<T> = {
  data: T[];
  page: number;
  limit: number;
  totalDocs: number;
  msg?: string;
};

export type ApiResult<T> = {
  data: T[];
  message?: string;
  pagination: {
    totalDocs: number;
    totalPages: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
};

export type ApiPaginatorInterface<D extends {}> = (
  payload: Payloader<D>
) => ApiResult<D>;
export function apiPaginator<T extends any>(payload: Payloader<T>): ApiResult<T> {
  // Extract properties from payload
  const { data, page, limit, totalDocs, msg } = payload;

  // Your pagination logic might be different
  const hasNextPage = page * limit < totalDocs;
  const hasPrevPage = page > 1;
  const totalPages = Math.ceil(totalDocs / limit);

  return {
    data,
    message: msg ?? "Operation ran successfully",
    pagination: {
      totalDocs,
      totalPages,
      page,
      limit,
      hasNextPage,
      hasPrevPage,
      nextPage: hasNextPage ? page + 1 : null,
      prevPage: hasPrevPage ? page - 1 : null,
    },
  };
}
