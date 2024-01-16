import {NextRequest, NextResponse} from "next/server";
import {dictionaries} from "@/translation/dictionaries";
import {getUserSession} from "@/lib/auth/check";
import {cookieOptions, getToken, sevenDaysInSeconds} from "@/lib/auth/token";

const locales = Object.keys(dictionaries);

function getLocale(request: NextRequest): string {
    const weightedLanguages = request.headers.get("accept-language")!.split(",");
    const languages = weightedLanguages.map(language => language.split(";")[0]);

    return languages.find(l => locales.includes(l)) || locales[0];
}

export async function middleware(request: NextRequest) {
    const authenticated = await getUserSession(request.cookies.get("auth")?.value);
    if (!authenticated.authenticated) {
        if (request.nextUrl.pathname.endsWith("/login")) return;

        request.nextUrl.pathname = `/${getLocale(request)}/login`;

        const response = NextResponse.rewrite(request.nextUrl);
        response.headers.set("_redirect", request.url);

        return response;
    }

    const {pathname} = request.nextUrl;

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`

    const response = NextResponse.redirect(request.nextUrl);

    const epochSeconds = new Date().getTime() / 1000;
    if (authenticated.payload.exp - epochSeconds < sevenDaysInSeconds / 2) {
        response.cookies.set("auth", await getToken(), cookieOptions);
    }

    return response;
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
    ],
}