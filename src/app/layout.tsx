import './globals.css'
import {Inter} from 'next/font/google'
import Header from "@/app/header";
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'eBay Accounting',
    description: 'eBay Accounting',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Header/>
        <main>{children}</main>
        </body>
        </html>
    )
}
