import Navbar from "./Navbar";
import layoutStyles from "./layout.module.css";
import React, { useRef } from "react";
import TopNavbar from "./TopNavbar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={layoutStyles.layout}>
      <Navbar />
      <div className={layoutStyles.navbar}></div>
      <div className={layoutStyles.rightSide}>
        <TopNavbar></TopNavbar>
        <div className={layoutStyles.topNavbar}></div>
        <main className={layoutStyles.children}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
