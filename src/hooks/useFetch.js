import { useCallback, useEffect, useReducer, useRef } from "react";
import { useUser } from "@providers/AuthProvider";

export const serialize = (elements = []) =>
  elements
    .map((el) => (typeof el === "object" ? JSON.stringify(el) : el))
    .join("-");

const dataFetchReducer = (state, action) => {
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

const useFetch = (fetcher, deps = []) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: true,
    error: false,
    data: null,
  });

  const fetcherRef = useRef();
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

  const mutate = (mutation) => {
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

export default useFetch;
