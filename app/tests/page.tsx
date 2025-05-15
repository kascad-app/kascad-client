"use client";

import { AuthentificationTypes } from "@/entities/authentification";
import useSession from "@/shared/api/use-session";
import Link from "next/link";

export default function TestAuth() {
  const session = useSession();

  // console.log(session);

  const handleLogin = () => {
    AuthentificationTypes.API.auth
      .login({
        email: "test@test.com",
        password: "Ouiouioui1",
      })
      .then((res) => {});
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
