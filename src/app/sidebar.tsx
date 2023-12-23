"use client";

import {usePathname} from 'next/navigation';
import Link from 'next/link';

export default function Sidebar() {
    const pathname = usePathname();
    const links = [
        {href: '/', name: 'Home'},
        {href: '/expenses', name: 'Expenses'},
        {href: '/incomes', name: 'Incomes'},
        {href: '/add', name: '+', style: {fontSize: "3.5rem"}},
    ];

    return (
        <nav id="sidebar">
            {links.map(({href, name, style}) => (
                <Link key={href} href={href} className={pathname === href ? 'active' : ''} style={style}>
                    {name}
                </Link>
            ))}
        </nav>
    );
}