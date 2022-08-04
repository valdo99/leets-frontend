import { useAtom } from "jotai";
import { createContext, useContext, useEffect, useRef } from "react";
import { userAtom } from "state/user";

// import { useToast } from '@providers/ToastProvider'
import ApiClient from "../api/client";

const ApiClientContext = createContext();

const AuthProvider = ({ children }) => {
  // const addToast = useToast()
  const [userState, setUserState] = useAtom(userAtom);

  const handleUnauthorizedError = async () => {
    setUserState({
      user: null,
    });
  };

  const handleForbiddenError = (error) => {
    alert(error.message);
    // TODO ADD MODAL
    //addToast({ type: 'error', content: error.message })
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
