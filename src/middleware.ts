import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const loggedIn: string | undefined = cookies().get("logged-in")?.value;
  const accessToken: string | undefined = cookies().get("access-token")?.value;
  if (
    accessToken == undefined &&
    (loggedIn == "false" || loggedIn == undefined)
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    try {
      const verifiedToken = await jwtVerify(
        accessToken!,
        new TextEncoder().encode(process.env.JWT_ACCESSTOKEN_SECRET),
      );
    } catch (error: any) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/home", "/profile"],
};
