import useSession from "@hooks/use-session";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";
import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import { verifyToken } from "./verifyToken";
import { verifyJwtToken } from "./verifyToken";
import { jwtVerify } from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const loggedIn: string | undefined = cookies().get("logged-in")?.value;
  const accessToken: string | undefined = cookies().get("access-token")?.value;
  //   console.log(accessToken, loggedIn, loggedIn == "true");
  if (
    accessToken == undefined &&
    (loggedIn == "false" || loggedIn == undefined)
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    try {
      const verifiedToken = await jwtVerify(
        accessToken!,
        new TextEncoder().encode(process.env.JWT_ACCESSTOKEN_SECRET)
      );
    } catch (error: any) {
      console.log(error.message);
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // if (verifiedToken.code && verifiedToken.code == "ERR_JWT_EXPIRED") {
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/marketplace",
};
