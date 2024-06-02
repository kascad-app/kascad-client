import Link from "next/link";
import NavStyles from "./layout.module.css";
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <p className={NavStyles.links}>Home</p>
          </Link>
        </li>
        <li>
          <Link href="/dashboard">
            <p className={NavStyles.links}>Dashboard</p>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <p className={NavStyles.links}>Profile</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
