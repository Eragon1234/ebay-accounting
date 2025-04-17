"use server";

import {cookies, headers} from "next/headers";
import {redirect} from "next/navigation";
import {cookieOptions, getToken} from "@/lib/auth/token";

export async function signIn(formData: FormData) {
    const password = formData.get("password");

    if (!password || typeof password != "string") {
        return;
    }

    const hash = await crypto.subtle.digest("SHA-256", Buffer.from(password));

    const b64hash = Buffer.from(hash).toString("base64");

    if (b64hash === process.env.PASSWORD_HASH) {
        (await cookies()).set("auth", await getToken(), cookieOptions);

        redirect((await headers()).get("_redirect") || "/");
    }
}
