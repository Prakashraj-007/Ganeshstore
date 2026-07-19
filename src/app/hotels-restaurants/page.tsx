import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureCard from "@/components/ui/FeatureCard";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/ui/CtaBand";
import { B2B_BENEFITS, B2B_IMAGE, B2B_SEGMENTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hotels & Restaurants",
  description:
    "Dedicated provision supply for hotels, restaurants, catering services, corporate kitchens and wholesale buyers — with competitive pricing, reliable delivery and monthly billing.",
};

export default function HotelsRestaurantsPage() {
  return (
    <>
      <PageHero
        eyebrow="Hotels & Restaurants"
        title="Supply Partner to Professional Kitchens"
        description="Consistent quality, dependable delivery and pricing that protects your margins — trusted by hundreds of business kitchens."
      />

      {/* Who we serve */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Who We Serve"
            title="Built for Every Business Kitchen"
            description="From boutique restaurants to hotel chains and event caterers — our supply operation scales with your needs."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {B2B_SEGMENTS.map((segment, i) => (
              <FeatureCard key={segment.title} feature={segment} index={i} />
            ))}

            {/* CTA card completes the grid */}
            <Reveal delay={0.16} className="h-full">
              <Link
                href="/portal"
                className="group flex h-full flex-col items-start justify-between gap-6 rounded-2xl bg-gradient-to-br from-primary to-primary-light p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    Ready to Get Started?
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/70">
                    Register your business and our team will set up your
                    dedicated supply arrangement.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 group-hover:gap-3 group-hover:bg-accent-dark">
                  Business Customer Portal
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative overflow-hidden bg-primary-dark py-24 sm:py-28">
        <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Business Benefits"
            title="Why Businesses Stay With Us"
            description="Six commitments we make to every business customer — and keep, order after order."
            light
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {B2B_BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <Reveal key={benefit.title} delay={(i % 3) * 0.08} className="h-full">
                  <div className="glass-dark group h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/10">
                    <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-accent/15 text-accent transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" strokeWidth={1.9} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {benefit.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-white/65">
                      {benefit.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <div className="overflow-hidden rounded-3xl shadow-lift">
                <Image
                  src={B2B_IMAGE}
                  alt="Professional kitchen supplied by Sri Ganesh Store"
                  width={720}
                  height={520}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary ring-1 ring-primary/15">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                How It Works
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Getting Started Is Simple
              </h2>
              <ol className="mt-8 space-y-6">
                {[
                  {
                    step: "01",
                    title: "Register Your Business",
                    text: "Reach out through the Business Customer Portal or give us a call.",
                  },
                  {
                    step: "02",
                    title: "Share Your Requirements",
                    text: "Tell us your regular items, quantities and delivery schedule.",
                  },
                  {
                    step: "03",
                    title: "Receive Your Quote",
                    text: "We prepare competitive wholesale pricing tailored to your volumes.",
                  },
                  {
                    step: "04",
                    title: "Enjoy Reliable Supply",
                    text: "Scheduled deliveries, consistent quality and consolidated monthly billing.",
                  },
                ].map((item) => (
                  <li key={item.step} className="flex gap-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white font-display text-sm font-bold text-accent shadow-soft ring-1 ring-ink/5">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink/60">
                        {item.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <Link
                href="/portal"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-lift"
              >
                Business Customer Portal
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
