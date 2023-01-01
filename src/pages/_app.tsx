import "react-toastify/dist/ReactToastify.min.css";
import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { Provider } from "jotai";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import { ErrorState } from "@components/Modals/ErrorState";
import { useInitViewportHeight } from "@hooks/useInitViewportHeight";
import { DefaultLayout } from "@layouts/DefaultLayout";
import { AuthProvider } from "@providers/AuthProvider";
import { PlayerProvider } from "@providers/PlayerProvider";
import { PageWithLayout } from "@types";
import { LocaleProvider } from "locales/locale-provider";

import SEO from "../../next-seo.config";
import { AuthGuard } from "../guards/AuthGuard";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as PageWithLayout).getLayout ||
    ((page) => <DefaultLayout>{page}</DefaultLayout>);

  useInitViewportHeight();

  return (
    <>
      <ToastContainer
        position="top-right"
        closeOnClick
        pauseOnHover
        autoClose={8000}
        toastClassName={() =>
          "relative flex justify-between p-3 rounded-btn overflow-hidden bg-secondary cursor-pointer mb-2"
        }
        bodyClassName={() =>
          "flex items-center p-2 text-sm font-medium text-secondary-content"
        }
      />

      <QueryClientProvider client={queryClient}>
        <Provider>
          <LocaleProvider>
            <AuthProvider>
              <PlayerProvider>
                <ErrorState />
                <DefaultSeo {...SEO} />
                <AuthGuard auth={(Component as PageWithLayout).auth}>
                  {getLayout(<Component {...pageProps} />)}
                </AuthGuard>
              </PlayerProvider>
            </AuthProvider>
          </LocaleProvider>
        </Provider>
      </QueryClientProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
