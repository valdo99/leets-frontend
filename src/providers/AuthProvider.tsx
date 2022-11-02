import { useLingui } from "@lingui/react";
import { useAtom } from "jotai";
import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import { ForbiddenError } from "@api/errors";
import { userAtom } from "@state/user";
import { Locale } from "locales/available-locales";

import { ApiClient } from "../api/client";

const ApiClientContext = createContext<ApiClient | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [, setUserState] = useAtom(userAtom);

  const { i18n } = useLingui();

  const handleUnauthorizedError = async () => {
    setUserState({
      user: null,
      loading: false,
    });
  };

  const handleForbiddenError = (error: ForbiddenError) => {
    toast.error(error.message);
  };

  const apiClientRef = useRef(
    new ApiClient({
      handleUnauthorizedError,
      handleForbiddenError,
    })
  );

  useEffect(() => {
    apiClientRef.current.setLocaleHeader(i18n.locale as Locale);
  }, [i18n.locale]);

  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        const loggedUser = await apiClientRef.current.auth.getLoggedUser();

        setUserState({
          user: loggedUser,
          loading: false,
        });
      } catch (err) {
        setUserState((user) => ({
          ...user,
          loading: false,
        }));
      }
    };

    getLoggedUser();
  }, [setUserState]);

  return (
    <ApiClientContext.Provider value={apiClientRef.current}>
      {children}
    </ApiClientContext.Provider>
  );
};

export const useApiClient = () => {
  const context = useContext(ApiClientContext);

  if (context === undefined) {
    throw new Error("useApiClient must be used within an AuthProvider");
  }

  return context;
};

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);
  return { ...user, setUser };
};
