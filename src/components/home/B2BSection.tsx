import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { B2B_BENEFITS, B2B_IMAGE } from "@/lib/data";

export default function B2BSection() {
  return (
    <section className="relative overflow-hidden bg-primary-dark py-24 sm:py-28">
      {/* decorative orbs */}
      <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent ring-1 ring-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              For Hotels & Restaurants
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A Dedicated Supply Partner for Your Business Kitchen
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
              Hotels, restaurants, caterers, corporate kitchens and wholesale
              buyers across the city trust us for consistent quality, honest
              pricing and delivery that never misses a service.
            </p>

            <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
              {B2B_BENEFITS.map((benefit) => (
                <li key={benefit.title} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm font-medium text-white/85">
                    {benefit.title}
                  </span>
                </li>
              ))}
            </ul>

          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-lift">
                <Image
                  src={B2B_IMAGE}
                  alt="Professional restaurant kitchen service"
                  width={720}
                  height={520}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {/* floating glass badge */}
              <div className="glass absolute -bottom-6 left-6 flex items-center gap-4 rounded-2xl px-6 py-4 shadow-lift">
                <span className="font-display text-3xl font-bold text-primary">
                  500+
                </span>
                <span className="text-sm font-medium leading-tight text-ink/70">
                  Business clients
                  <br />
                  supplied every month
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
