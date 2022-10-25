import { useEffect } from "react";
import { toast } from "react-toastify";

export const ErrorState = () => {
  useEffect(() => {
    if (window) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const error = urlSearchParams.get("error");

      if (error) {
        toast.error(error);
      }
    }
  }, []);

  return null;
};
