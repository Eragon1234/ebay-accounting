import Link from "next/link";

export function Topbar() {
    return <div id="topbar">
        <h1>eBay</h1>
        <Link href="/add" style={{fontSize: "3.5rem"}}>+</Link>
    </div>;
}