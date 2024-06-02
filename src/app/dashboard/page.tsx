import DashStyles from "./dashboard.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className={DashStyles.main}>
      <p>Hello Dashboard</p>

      <p>Good Hacking</p>
    </main>
  );
}
