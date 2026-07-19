"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Leaf, Menu, X, ArrowRight } from "lucide-react";
import { BUSINESS, NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -30% 0px" }
    );

    const ids = ["home", "about", "services", "categories", "hotels-restaurants", "contact"];
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [pathname]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
    setOpen(false);
  };

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/portal")) {
    return null;
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "glass shadow-soft"
          : "bg-transparent border-b border-white/10"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img src="/logo.svg" alt="Store Logo" className="h-full w-full object-contain" />
          </div>
          <span className="flex flex-col leading-tight overflow-hidden">
            <span
              className={`font-display text-lg font-bold tracking-tight sm:text-xl whitespace-nowrap ${
                scrolled || open ? "text-primary" : "text-white"
              }`}
            >
              {BUSINESS.name}
            </span>
            <span
              className={`text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.15em] whitespace-nowrap ${
                scrolled || open ? "text-primary/70" : "text-white/70"
              }`}
            >
              {BUSINESS.tagline}
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === "/" 
              ? link.href === `/#${activeSection}`
              : pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`relative whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? scrolled
                        ? "text-primary"
                        : "text-white"
                      : scrolled
                        ? "text-ink/70 hover:text-primary"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-pill"
                      className={`absolute inset-0 -z-10 rounded-full ${
                        scrolled ? "bg-primary/8" : "bg-white/15"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors xl:hidden ${
              scrolled || open
                ? "text-primary hover:bg-primary/8"
                : "text-white hover:bg-white/15"
            }`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden xl:hidden"
          >
            <ul className="space-y-1 px-4 pb-6 pt-2 sm:px-6">
              {NAV_LINKS.map((link, i) => {
                const active = pathname === "/" 
                  ? link.href === `/#${activeSection}`
                  : pathname === link.href;
                return (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary/8 text-primary"
                        : "text-ink/75 hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
                );
              })}
              </ul>
            </motion.div>
          ) : null}
      </AnimatePresence>
    </header>
  );
}
