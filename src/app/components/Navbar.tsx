import Link from "next/link";
import NavStyles from "./navbar.module.css";
import React from "react";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className={NavStyles.navbar}>
      <div className={NavStyles.contentNavbar}>
        <div className={NavStyles.topSection}>
          <img src="logo-kascad-mini.svg" />
          <div className={NavStyles.unwrap}>
            <img className={NavStyles.icon} src="arrows.svg" />
            <span className={NavStyles.separator}></span>
          </div>
        </div>
        <div className={NavStyles.listLinks}>
          <Link href="/profile">
            <img className={NavStyles.icon} src="user.svg" />
          </Link>
          <Link href="/marketplace">
            <img className={NavStyles.icon} src="dashboard.svg" />
          </Link>
          <Link href="/marketplace">
            <img className={NavStyles.icon} src="notif.svg" />
          </Link>
          <Link href ="/sponsors">
            <p>sp</p>
          </Link>
        </div>
      </div>
      <div className={NavStyles.bottomSection}>
        <img className={NavStyles.icon} src="help.svg" />
        <img className={NavStyles.icon} src="setting.svg" />
        <img className={NavStyles.icon} src="disconnect.svg" />
      </div>
    </nav>
  );
};

export default Navbar;
