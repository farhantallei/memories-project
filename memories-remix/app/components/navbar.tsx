import React from "react";

function Navbar() {
  return (
    <nav>
      <ul className="flex items-center gap-4">
        <li className="">
          <a
            href="/"
            className="text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/about"
            className="text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            About
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
