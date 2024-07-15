"use client";

import API from "@/services/api";
import useSession from "@hooks/use-session";
import { ProfileType } from "@kascad-app/shared-types";
import Link from "next/link";

export default function TestAuth() {
  const session = useSession();

  console.log(session);

  const handleLogin = () => {
    API.auth
      .login({
        email: "test@test.com",
        password: "Ouiouioui1",
        type: ProfileType.RIDER,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const handleLogout = () => {
    session.loggedIn && session.signOut();
  };

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Link href="/tests/auth">
        <p>test protectted route</p>
      </Link>
      <p>TEST AUTH</p>
      <button onClick={handleLogin}>Login rider</button>
      <button onClick={handleLogout}>logout rider</button>
      {session.loggedIn && <h2>User logged</h2>}
    </div>
  );
}
