import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout";
import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@/styles/globals.css"; //!it must be under bootstrap
import { AuthProvider } from "@/context/AuthContext";
import { apiAxiosApp } from "service/axios";
import { SWRConfig } from "swr";
import { Provider } from "react-redux";
import {store} from "../store/store"
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.js" as any);
  }, []);

  return (
    <AuthProvider>
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            apiAxiosApp.get(url).then((res) => res.data),
        }}
      >
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
        <ToastContainer />
      </SWRConfig>
    </AuthProvider>
  );
}
