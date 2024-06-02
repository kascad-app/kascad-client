"use client";

import ProfileStyles from "./page.module.css";
import Layout from "../components/Layout";

export default function ProfilePage() {
  return (
    <Layout>
      <p className={ProfileStyles.main}>Hello Profile</p>

      <p>Good Hacking</p>
    </Layout>
  );
}
