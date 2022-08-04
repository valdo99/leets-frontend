import { useRef, useState } from "react";

const useDelayedInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const timeOutRef = useRef();

  const handleChange = (event) => {
    window.clearTimeout(timeOutRef.current);

    timeOutRef.current = window.setTimeout(
      () => setValue(event.target.value),
      300
    );
  };

  return [value, handleChange];
};

export default useDelayedInput;
