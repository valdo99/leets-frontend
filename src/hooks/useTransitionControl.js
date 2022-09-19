import { useEffect, useState } from "react";

const useTransitionControl = (loading = false) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setShow(true));
    }
  }, [loading]);

  return [show, setShow];
};

export default useTransitionControl;
