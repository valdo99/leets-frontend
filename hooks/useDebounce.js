import React from 'react'

const useDebounce = (callback, delay) => {
    const latestCallback = React.useRef();
    const [callCount, setCallCount] = React.useState(0);
  
    React.useEffect(() => {
      latestCallback.current = callback;
    }, [callback]);
  
    React.useEffect(() => {
      if (callCount > 0) {
        const fire = () => {
          setCallCount(0);
          latestCallback.current();
        };
  
        const id = setTimeout(fire, delay);
        return () => clearTimeout(id);
      }
    }, [callCount, delay]);
  
    return () => setCallCount(callCount => callCount + 1);
  };

  export default useDebounce