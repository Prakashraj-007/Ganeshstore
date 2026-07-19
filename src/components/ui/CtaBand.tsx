import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BUSINESS } from "@/lib/data";

/** Full-width closing CTA band used on several pages. */
export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Partner With a Supplier You Can Trust?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            Call us, message us on WhatsApp, or register your business — we
            will take care of the rest.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {BUSINESS.phone.split(',').map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface sm:w-auto"
              >
                <Phone className="h-4 w-4" />
                {phone.trim()}
              </a>
            ))}
            <a
              href={BUSINESS.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
            <Link
              href="/portal"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dark sm:w-auto"
            >
              Business Customer Portal
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
