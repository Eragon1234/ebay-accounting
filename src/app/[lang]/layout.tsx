import './globals.css'
import Sidebar from "@/app/[lang]/sidebar";
import React from "react";
import {Topbar} from "@/app/[lang]/topbar";
import {getDictionary, Locales} from "@/translation/dictionaries";

export const metadata = {
    title: 'eBay Accounting',
    description: 'eBay Accounting',
}

export default async function RootLayout({children, params}: { children: React.ReactNode, params: { lang: Locales } }) {
    const dict = await getDictionary(params.lang);

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
