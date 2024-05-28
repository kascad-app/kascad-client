"use client";

import ProfileStyles from "./profile.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className={ProfileStyles.main}>
      <p>Hello Profile</p>
    </main>
  );
}
