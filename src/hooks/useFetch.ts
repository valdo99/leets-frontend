import { useCallback, useEffect, useReducer, useRef } from "react";

import { useUser } from "@providers/AuthProvider";

export const serialize = (elements: unknown[] = []) =>
  elements
    .map((el) => (typeof el === "object" ? JSON.stringify(el) : el))
    .join("-");

export type Data = string | { [key: string]: any } | unknown[];

export type Fetcher<T extends Data> = () => T | Promise<T> | null;

export type Deps = unknown[];

type MutationCallback<T extends Data> = (currentData: T) => T;

export type Mutation<T extends Data> = T | MutationCallback<T>;

interface FetchState<T extends Data> {
  data: T | null;
  loading: boolean;
  error: boolean;
}

type FetchAction<T extends Data> =
  | { type: "FETCH_SUCCESS"; payload: { data: T } }
  | { type: "FETCH_FAILURE" }
  | { type: "MUTATE"; payload: { data: T } };

type FetchReducer<T extends Data> = React.Reducer<
  FetchState<T>,
  FetchAction<T>
>;

const dataFetchReducer = <T extends Data>(
  state: FetchState<T>,
  action: FetchAction<T>
): FetchState<T> => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "MUTATE":
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export const useFetch = <T extends Data>(
  fetcher: Fetcher<T>,
  deps: Deps = []
) => {
  const [state, dispatch] = useReducer<FetchReducer<T>>(dataFetchReducer, {
    loading: true,
    error: false,
    data: null,
  });

  const fetcherRef = useRef<Fetcher<T>>();
  const cancelRequest = useRef(false);
  const { loading } = useUser();

  const serializedDeps = serialize(deps);

  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  const fetch = useCallback(() => {
    const fetchData = async () => {
      if (!fetcherRef.current || loading) return;
      cancelRequest.current = false;

      try {
        const data = await fetcherRef.current();
        if (!data) return;

        if (cancelRequest.current) return;
        dispatch({ type: "FETCH_SUCCESS", payload: { data } });
      } catch (error) {
        if (cancelRequest.current) return;
        dispatch({ type: "FETCH_FAILURE" });
      }
    };
    fetchData();
  }, [loading]);

  useEffect(() => {
    fetch();

    return () => {
      cancelRequest.current = true;
    };
  }, [fetch, serializedDeps]);

  const mutate = (mutation: Mutation<T>) => {
    if (!state.data) return;

    dispatch({
      type: "MUTATE",
      payload: {
        data: typeof mutation === "function" ? mutation(state.data) : mutation,
      },
    });
  };

  return { ...state, refetch: fetch, mutate };
};
