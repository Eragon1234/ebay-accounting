"use server";

import {cookies, headers} from "next/headers";
import {redirect} from "next/navigation";
import {cookieOptions, getToken} from "@/lib/auth/token";

export async function signIn(formData: FormData) {
    const password = formData.get("password");

    if (password === process.env.PASSWORD) {
        cookies().set("auth", await getToken(), cookieOptions);

        redirect(headers().get("_redirect") || "/");
    }
}
