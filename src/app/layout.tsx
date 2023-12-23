import './globals.css'
import Sidebar from "@/app/sidebar";
import React from "react";

export const metadata = {
    title: 'eBay Accounting',
    description: 'eBay Accounting',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Sidebar/>
        <main>{children}</main>
        </body>
        </html>
    )
}
