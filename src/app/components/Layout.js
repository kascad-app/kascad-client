import Navbar from "./Navbar";
import layoutStyles from "./layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={layoutStyles.layout}>
      <Navbar className={layoutStyles.navbar} />
      <div className={layoutStyles.navbar}></div>
      <div className={layoutStyles.rightSide}>
        <div className={layoutStyles.topNavbar}></div>
        <main className={layoutStyles.children}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
