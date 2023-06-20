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

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.js" as any);
  }, []);

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </AuthProvider>
  );
}
