"use client";

import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {ReactNode} from "react";

type Link = {
    href: string,
    name: ReactNode
}

export default function Sidebar({links}: { links: Link[] }) {
    const pathname = usePathname();

    return (
        <nav id="sidebar" onClick={() => document.body.classList.remove("sidebar-open")}>
            {links.map(({href, name}) => (
                <Link key={href} href={href} className={pathname === href ? 'active' : ''}>
                    {name}
                </Link>
            ))}
        </nav>
    );
}