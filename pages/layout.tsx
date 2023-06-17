import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React, { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}
const Layout = ({ children }: Prop) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
