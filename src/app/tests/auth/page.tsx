"use client";

import useSession from "@hooks/use-session";
import Link from "next/link";

export default function TestAuth() {
  const session = useSession(true);

  console.log(session);

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Link href="/tests">
        <p>Test auth</p>
      </Link>
      <p>TEST AUTH</p>
      {session.loggedIn && <h2>User logged</h2>}
    </div>
  );
}
