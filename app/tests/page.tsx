"use client";

import {
  useLogin,
  useLogout,
} from "@/entities/authentication/authentication.hooks";
import useSession from "@/shared/api/use-session";
import Link from "next/link";

export default function TestAuth() {
  const session = useSession();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  // console.log(session);

  const handleLogin = () => {
    loginMutation
      .trigger({
        email: "test@test.com",
        password: "Ouiouioui1",
      })
      .then((res) => {});
  };

  const handleLogout = () => {
    session.loggedIn && logoutMutation.trigger();
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
