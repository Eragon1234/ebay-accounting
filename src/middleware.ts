import {NextRequest, NextResponse} from "next/server";
import {getUserSession} from "@/lib/auth/check";
import {defaultLocale, isValidLocale} from "@/translation/dictionaries";

function getLocale(request: NextRequest): string {
    const weightedLanguages = request.headers.get("accept-language")!.split(",");
    const languages = weightedLanguages.map(language => language.split(";")[0]);

    return languages.find(l => isValidLocale(l)) || defaultLocale;
}

export async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    const firstPathnameSegment = pathname.split("/")[1];
    const pathnameHasLocale = isValidLocale(firstPathnameSegment);
    if (!pathnameHasLocale) {
        const locale = getLocale(request);

        const localizedURL = new URL(`/${locale}${pathname}`, request.nextUrl);
        return NextResponse.redirect(localizedURL);
    }

    const locale = firstPathnameSegment;

    if (request.nextUrl.pathname.endsWith("/login")) return;

    const authenticated = await getUserSession(request.cookies.get("auth")?.value);
    if (!authenticated.authenticated) {
        const loginURL = new URL(`/${locale}/login`, request.url);

        const response = NextResponse.rewrite(loginURL);
        response.headers.set("_redirect", pathname);
        return response;
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
    ],
}