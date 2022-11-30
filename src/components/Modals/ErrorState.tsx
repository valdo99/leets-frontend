import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const ErrorState = () => {
  const router = useRouter();
  useEffect(() => {
    if (window) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const error = urlSearchParams.get("error");
      const success = urlSearchParams.get("success");

      if (error) {
        toast.error(error);
      } else if (success) {
        toast.success(success);
      }
    }
  }, [router.asPath]);

  return null;
};
