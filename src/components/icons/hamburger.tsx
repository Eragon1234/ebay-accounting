"use client";

export default function HamburgerIcon() {
    return <svg viewBox="0 0 50 50" className="hamburger-icon" onClick={() => {
        document.body.classList.toggle("sidebar-open");
    }}>
        <path
            d="M3 9a1 1 0 1 0 0 2h44a1 1 0 1 0 0-2H3zm0 15a1 1 0 1 0 0 2h44a1 1 0 1 0 0-2H3zm0 15a1 1 0 1 0 0 2h44a1 1 0 1 0 0-2H3z"/>
    </svg>;
}