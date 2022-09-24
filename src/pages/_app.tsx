import "../styles/globals.css";

import { Provider } from "jotai";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import { DefaultLayout } from "@layouts/Layout";
import { AuthProvider } from "@providers/AuthProvider";
import { PageWithLayout } from "@types";

import { AuthGuard } from "../guards/AuthGuard";
import "@utils/i18n";

import "react-toastify/dist/ReactToastify.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as PageWithLayout).getLayout ||
    ((page) => <DefaultLayout>{page}</DefaultLayout>);

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
          <AuthGuard auth={(Component as PageWithLayout).auth}>
            {getLayout(<Component {...pageProps} />)}
          </AuthGuard>
        </AuthProvider>
      </Provider>
    </>
  );
}

export default MyApp;
