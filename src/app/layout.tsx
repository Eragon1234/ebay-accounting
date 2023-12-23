import './globals.css'
import Sidebar from "@/app/sidebar";
import React from "react";
import {Topbar} from "@/app/topbar";

export const metadata = {
    title: 'eBay Accounting',
    description: 'eBay Accounting',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Topbar />
        <Sidebar/>
        <main>{children}</main>
        </body>
        </html>
    )
}
