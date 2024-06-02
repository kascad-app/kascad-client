import DashStyles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";

export default function DashboardPage() {
  return (
    <Layout>
      <p className={DashStyles.main}>Hello Dashboard</p>

      <p>Good Hacking</p>
    </Layout>
  );
}
