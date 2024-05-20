import './globals.css'
import Sidebar from "@/app/[lang]/sidebar";
import React from "react";
import {Topbar} from "@/app/[lang]/topbar";
import {dictionaries, getDictionary, Locales} from "@/translation/dictionaries";
import {getLocalizationContext} from "@/lib/server-contexts";

export const runtime = "edge";

export const metadata = {
    title: 'eBay Accounting',
    description: 'eBay Accounting',
}

export async function generateStaticParams() {
    return Object.keys(dictionaries).map(lang => ({
        lang
    }));
}

export default async function RootLayout({children, params}: { children: React.ReactNode, params: { lang: Locales } }) {
    const localizationContext = getLocalizationContext();
    const dict = getDictionary(params.lang);
    localizationContext.resolve({
        locale: params.lang,
        dict
    });

    return (
        <html>
        <body>
        <Topbar/>
        <Sidebar links={[
            {href: `/${params.lang}`, name: dict.sidebar.home},
            {href: `/${params.lang}/expenses`, name: dict.sidebar.expenses},
            {href: `/${params.lang}/incomes`, name: dict.sidebar.incomes},
        ]}/>
        <main>{children}</main>
        </body>
        </html>
    )
}
