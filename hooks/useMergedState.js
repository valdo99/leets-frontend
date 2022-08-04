import { useCallback, useState } from "react";

const useMergedState = (initialState) => {
  const [state, setState] = useState(initialState);

  const setMergedState = useCallback((updatedProperties) => {
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

export default useMergedState;
