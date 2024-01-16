import {NextRequest, NextResponse} from "next/server";
import {dictionaries} from "@/translation/dictionaries";
import {getUserSession} from "@/lib/auth/check";

const locales = Object.keys(dictionaries);

function getLocale(request: NextRequest): string {
    const weightedLanguages = request.headers.get("accept-language")!.split(",");
    const languages = weightedLanguages.map(language => language.split(";")[0]);

    return languages.find(l => locales.includes(l)) || locales[0];
}

export async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        const authenticated = await getUserSession(request.cookies.get("auth")?.value);
        if (!authenticated.authenticated) {
            if (request.nextUrl.pathname.endsWith("/login")) return;

            const redirect = request.nextUrl.pathname;

            request.nextUrl.pathname = `/${getLocale(request)}/login`;

            const response = NextResponse.rewrite(request.nextUrl);
            response.headers.set("_redirect", redirect);

            return response;
        }
        return;
    }

    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`

    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
    ],
}