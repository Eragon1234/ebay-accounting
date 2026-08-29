"use server";

import { checkPassword, setAuthCookie } from "@/lib/auth/signIn";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function signInAction(formData: FormData) {
  const password = formData.get("password");

  if (!password || typeof password !== "string") {
    return;
  }

  const validPassword = await checkPassword(password);

  if (!validPassword) {
    return;
  }

  await setAuthCookie();
  redirect((await headers()).get("_redirect") || "/");
}
