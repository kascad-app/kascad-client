import { jwtVerify } from "jose";

export async function verifyJwtToken(token: string) {
  //   try {
  const verified = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_ACCESSTOKEN_SECRET)
  );
  console.log(verified);
  return verified.payload;
  //   } catch (error: any) {
  //     throw new Error(error.message);
  //   }
}
