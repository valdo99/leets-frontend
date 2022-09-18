import "../styles/globals.css";
import { Provider } from "jotai";
import AuthProvider from "providers/AuthProvider";
import AuthGuard from "guards/AuthGuard";
import { ToastContainer } from "react-toastify";
import "@utils/i18n";

import "react-toastify/dist/ReactToastify.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer
        position="top-right"
        closeOnClick
        pauseOnHover
        autoClose={5000}
        toastStyle={{
          zIndex: 9999,
          position: "relative",
        }}
      />
      <Provider>
        <AuthProvider>
          <AuthGuard auth={Component.auth}>
            <Component {...pageProps} />
          </AuthGuard>
        </AuthProvider>
      </Provider>
    </>
  );
}

export default MyApp;
