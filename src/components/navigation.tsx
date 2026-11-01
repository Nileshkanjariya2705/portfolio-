"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  ["Home", "/#home"],
  ["Services", "/#services"],
  ["Projects", "/#projects"],
  ["About", "/#about"],
  ["Process", "/#process"],
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = links
      .map(([, href]) => document.getElementById(href.split("#")[1]))
      .filter((section): section is HTMLElement => !!section);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);
  useEffect(() => {
    function close(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-shell container">
        <Link href="/#home" className="brand" onClick={() => setOpen(false)}>
          <span className="monogram">
            N<span>K</span>
            <i aria-hidden="true" />
          </span>
          <span className="brand-name">
            Nilesh Kanjariya<span>DEVELOPER & PRODUCT PARTNER</span>
          </span>
          <span className="sr-only">Home</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.slice(1).map(([label, href]) => (
            <Link
              key={label}
              href={href}
              aria-current={
                pathname === "/" && active === href.split("#")[1]
                  ? "location"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/#contact" className="nav-cta">
          Let’s talk <ArrowUpRight size={15} />
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {[...links, ["Contact", "/#contact"]].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={
                pathname === "/" && active === href.split("#")[1]
                  ? "location"
                  : undefined
              }
            >
              {label}
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
