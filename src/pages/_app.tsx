import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import "@utils/i18n";
import { DefaultLayout } from "@layouts/DefaultLayout";
import { AuthProvider } from "@providers/AuthProvider";
import { PageWithLayout } from "@types";

import { AuthGuard } from "../guards/AuthGuard";

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <Provider>
          <AuthProvider>
            <AuthGuard auth={(Component as PageWithLayout).auth}>
              {getLayout(<Component {...pageProps} />)}
            </AuthGuard>
          </AuthProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
