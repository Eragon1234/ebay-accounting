import './globals.css'
import Header from "@/app/header";
import React from "react";

export const metadata = {
    title: 'eBay Accounting',
    description: 'eBay Accounting',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Header/>
        <main>{children}</main>
        </body>
        </html>
    )
}
