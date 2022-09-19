import { useAtom } from "jotai";
import { createContext, useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { userAtom } from "@state/user";

import ApiClient from "../api/client";

const ApiClientContext = createContext();

const AuthProvider = ({ children }) => {
  const [userState, setUserState] = useAtom(userAtom);

  const handleUnauthorizedError = async () => {
    setUserState({
      user: null,
    });
  };

  const handleForbiddenError = (error) => {
    toast.error(error.message);
  };

  const apiClientRef = useRef(
    new ApiClient({
      handleUnauthorizedError,
      handleForbiddenError,
    })
  );

  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        const loggedUser = await apiClientRef.current.auth.getLoggedUser();

        setUserState({
          user: loggedUser,
          loading: false,
        });
      } catch (err) {
        setUserState({
          ...userState,
          loading: false,
        });
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
  const [user] = useAtom(userAtom);

  useEffect(() => {}, [user]);

  return user;
};

export default AuthProvider;
