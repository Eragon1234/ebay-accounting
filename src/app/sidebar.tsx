"use client";

import {usePathname} from 'next/navigation';
import Link from 'next/link';

export default function Sidebar() {
    const pathname = usePathname();
    const links = [
        {href: '/', name: 'Home'},
        {href: '/expenses', name: 'Expenses'},
        {href: '/incomes', name: 'Incomes'},
    ];

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