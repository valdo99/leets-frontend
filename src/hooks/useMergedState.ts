import { useCallback, useState } from "react";

type StateUpdater<T> = Partial<T> | ((prevState: T) => Partial<T>);

export const useMergedState = <T extends { [key: string]: any }>(
  initialState: T
): [T, (updatedProperties: StateUpdater<T>) => void] => {
  const [state, setState] = useState(initialState);

  const setMergedState = useCallback((updatedProperties: StateUpdater<T>) => {
    setState((prevState) => {
      const updatedState =
        typeof updatedProperties === "function"
          ? updatedProperties(prevState)
          : updatedProperties;

      return {
        ...prevState,
        ...updatedState,
      };
    });
  }, []);

  return [state, setMergedState];
};
