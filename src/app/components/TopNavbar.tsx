import React from "react";
import NavStyles from "./navbar.module.css";

interface TopNavbarProps {}

const TopNavbar: React.FC<TopNavbarProps> = () => {
  return <div className={NavStyles.topNavbar}></div>;
};

export default TopNavbar;
