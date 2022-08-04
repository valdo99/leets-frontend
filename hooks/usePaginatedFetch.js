import { useEffect, useRef, useState } from "react";

import useFetch from "./useFetch";

const usePaginatedFetch = (fetcher, deps = []) => {
  const [page, setPage] = useState(0);
  const pageRef = useRef(0);
  const fetchedOnce = useRef(false);
  const {
    data,
    loading,
    mutate: baseMutate,
    refetch,
    ...rest
  } = useFetch(() => fetcher(page), [page]);

  const serializedDeps = serialize(deps);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    if (!loading) {
      fetchedOnce.current = true;
    }
  }, [loading]);

  useEffect(() => {
    if (!fetchedOnce.current) return;
    if (pageRef.current > 0) {
      setPage(0);
    } else {
      refetch();
    }
  }, [serializedDeps, refetch]);

  const mutate = (mutation) => {
    baseMutate((data) => ({
      ...data,
      data: typeof mutation === "function" ? mutation(data.data) : mutation,
    }));
  };

  const totalPages = data
    ? Math.ceil(data.pagination.total / data.pagination.perPage)
    : 0;

  return {
    data: data ? data.data : null,
    page,
    setPage,
    totalPages,
    mutate,
    refetch,
    ...rest,
  };
};

export default usePaginatedFetch;
