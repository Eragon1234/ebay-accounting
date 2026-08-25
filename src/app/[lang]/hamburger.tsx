"use client";

import { MenuIcon } from "lucide-react";

export default function Hamburger() {
  return (
    <MenuIcon
      className={"hamburger-icon"}
      onClick={() => {
        document.body.classList.toggle("sidebar-open");
      }}
    />
  );
}
