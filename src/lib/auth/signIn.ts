import "server-only";

import { cookies } from "next/headers";
import { cookieOptions, getToken } from "@/lib/auth/token";

export async function checkPassword(password: string): Promise<boolean> {
  const hash = await crypto.subtle.digest("SHA-256", Buffer.from(password));

  const b64hash = Buffer.from(hash).toString("base64");

  return b64hash === process.env.PASSWORD_HASH;
}

export async function setAuthCookie() {
  (await cookies()).set("auth", await getToken(), cookieOptions);
}
