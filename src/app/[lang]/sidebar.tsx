"use client";

import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {ReactNode, useEffect} from "react";

type Link = {
    href: string,
    name: ReactNode
}

export default function Sidebar({links}: { links: Link[] }) {
    const pathname = usePathname();

    useEffect(() => {
        document.body.classList.remove("sidebar-open");
    }, [pathname]);

    return (
        <nav id="sidebar">
            {links.map(({href, name}) => (
                <Link key={href} href={href} className={pathname === href ? 'active' : ''}>
                    {name}
                </Link>
            ))}
        </nav>
    );
}