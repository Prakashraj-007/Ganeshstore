import type { Metadata } from "next";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { BUSINESS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Sri Ganesh Store — phone, WhatsApp, email, business hours, address and directions.",
};

const CONTACT_CARDS = [
  {
    icon: Phone,
    title: "Phone",
    lines: [BUSINESS.phone],
    href: `tel:${BUSINESS.phone.replace(/\s/g, "")}`,
    action: "Call Now",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: [BUSINESS.whatsapp],
    href: BUSINESS.whatsappLink,
    action: "Chat on WhatsApp",
  },
  {
    icon: Mail,
    title: "Email",
    lines: [BUSINESS.email],
    href: `mailto:${BUSINESS.email}`,
    action: "Send Email",
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: BUSINESS.hours.map((h) => `${h.days}: ${h.time}`),
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We'd Love to Hear From You"
        description="Call, message or visit us — our team is ready to help with retail purchases, wholesale enquiries and business supply arrangements."
      />

      <section className="bg-surface py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Contact cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={i * 0.08} className="h-full">
                  <div className="group flex h-full flex-col rounded-2xl bg-white p-7 shadow-soft ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                    <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-primary/8 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/12 group-hover:text-accent-dark">
                      <Icon className="h-6 w-6" strokeWidth={1.9} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {card.title}
                    </h3>
                    <div className="mt-2 flex-1 space-y-1">
                      {card.lines.map((line) => (
                        <p key={line} className="text-sm leading-relaxed text-ink/60">
                          {line}
                        </p>
                      ))}
                    </div>
                    {"href" in card && card.href ? (
                      <a
                        href={card.href}
                        target={card.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          card.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="mt-5 inline-flex items-center justify-center rounded-full bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary ring-1 ring-primary/15 transition-all duration-300 hover:bg-primary hover:text-white"
                      >
                        {card.action}
                      </a>
                    ) : null}
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Address + map */}
          <div className="mt-16 grid gap-8 lg:grid-cols-5">
            <Reveal className="lg:col-span-2">
              <div className="flex h-full flex-col justify-center rounded-3xl bg-white p-10 shadow-soft ring-1 ring-ink/5">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent-dark">
                  <MapPin className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  Visit Our Store
                </h3>
                <p className="mt-3 leading-relaxed text-ink/60">
                  {BUSINESS.address}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-ink/50">
                  Ample parking available. Wholesale counter open throughout
                  business hours — walk in anytime or call ahead for large
                  orders.
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-lift"
                >
                  <MapPin className="h-4 w-4" />
                  Get Directions
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-3">
              <div className="h-full min-h-96 overflow-hidden rounded-3xl shadow-soft ring-1 ring-ink/5">
                <iframe
                  src={BUSINESS.mapEmbed}
                  title={`Map location of ${BUSINESS.name}`}
                  className="h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
