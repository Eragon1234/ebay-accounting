import Link from "next/link";
import HamburgerIcon from "@/components/icons/hamburger";

export function Topbar() {
    return <div id="topbar">
        <HamburgerIcon />
        <h1>eBay</h1>
        <Link href="/add" style={{fontSize: "3.5rem"}}>+</Link>
    </div>;
}