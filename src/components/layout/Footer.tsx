"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Leaf, Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS, NAV_LINKS, SERVICES } from "@/lib/data";

/* Brand icons (lucide no longer ships brand logos) */
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M13.5 21.9v-7.4h2.5l.4-2.9h-2.9V9.7c0-.8.2-1.4 1.4-1.4h1.6V5.7c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2h-2.6v2.9h2.6v7.4h3.2z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M17.9 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.3L5.7 21h-3l7.1-8.1L2 3h6.3l4.3 5.7L17.9 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.2 14.5z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21h-4V9z" />
  </svg>
);

const SOCIALS = [
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "X (Twitter)", href: "#", icon: XIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/portal")) {
    return null;
  }

  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-accent ring-1 ring-white/15">
                <Leaf className="h-5 w-5" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-lg font-bold">
                  {BUSINESS.name}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
                  {BUSINESS.tagline}
                </span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/60">
              Your trusted wholesale & retail provision partner — serving
              families, hotels, restaurants, catering services and wholesale
              businesses with quality products and trusted service.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-accent">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-2.5">
              {[...NAV_LINKS, { label: "Business Customer Portal", href: "/portal" }].map(
                (link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-accent">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-white/65">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{BUSINESS.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a
                  href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="transition-colors hover:text-white"
                >
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  {BUSINESS.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/45">
            Wholesale & Retail Provisions — Quality You Can Trust
          </p>
        </div>
      </div>
    </footer>
  );
}
