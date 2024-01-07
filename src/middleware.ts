import {NextRequest} from "next/server";
import {dictionaries} from "@/translation/dictionaries";

const locales = Object.keys(dictionaries);

function getLocale(request: NextRequest): string {
    const weightedLanguages = request.headers.get("accept-language")!.split(",");
    const languages = weightedLanguages.map(language => language.split(";")[0]);

    return languages.find(l => locales.includes(l)) || locales[0];
}

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`

    return Response.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
    ],
}