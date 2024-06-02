import DashStyles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";

export default function DashboardPage() {
  return (
<<<<<<< HEAD
    <Layout>
      <p className={DashStyles.main}>Hello Dashboard</p>

      <p>Good Hacking</p>
    </Layout>
=======
    <main className={DashStyles.main}>
      <p>Hello Dashboard</p>

      <p>Good Hacking</p>
    </main>
>>>>>>> 44b54a408a6e317e119943c0bf0ecfb9908250ed
  );
}
