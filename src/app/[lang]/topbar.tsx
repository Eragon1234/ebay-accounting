import Link from "next/link";
import Hamburger from "@/app/[lang]/hamburger";

export function Topbar() {
    return <div id="topbar">
        <Hamburger/>
        <h1>eBay</h1>
        <Link href="/add" style={{fontSize: "3.5rem"}}>+</Link>
    </div>;
}