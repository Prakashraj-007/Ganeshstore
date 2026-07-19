import type { Metadata } from "next";
import Image from "next/image";
import { Eye, Target } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureCard from "@/components/ui/FeatureCard";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/ui/CtaBand";
import { ABOUT_IMAGE, BUSINESS, TIMELINE, WHY_CHOOSE_US } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Sri Ganesh Store — over 25 years of trusted wholesale and retail provisioning for families, hotels, restaurants and businesses.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A Legacy of Trust Since 1999"
        description="From a small neighbourhood provision shop to one of the region's most trusted wholesale suppliers."
      />

      {/* Introduction */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <div className="relative">
                <div className="overflow-hidden rounded-3xl shadow-lift">
                  <Image
                    src={ABOUT_IMAGE}
                    alt="Fresh provisions at Sri Ganesh Store"
                    width={720}
                    height={560}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="glass absolute -bottom-6 right-6 flex items-center gap-4 rounded-2xl px-6 py-4 shadow-lift">
                  <span className="font-display text-3xl font-bold text-primary">
                    25+
                  </span>
                  <span className="text-sm font-medium leading-tight text-ink/70">
                    Years of trusted
                    <br />
                    service
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary ring-1 ring-primary/15">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Who We Are
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                More Than a Store — A Partner in Every Kitchen
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/65">
                <p>
                  {BUSINESS.name} began in 1999 as a small family-run provision
                  shop with a simple promise: honest weighing, fair prices and
                  products we would happily use in our own homes. That promise
                  has never changed.
                </p>
                <p>
                  Today, we serve thousands of families through our retail
                  store and supply hundreds of hotels, restaurants, catering
                  services and wholesale buyers across the region. Our
                  dedicated warehouse, delivery fleet and experienced team let
                  us handle everything from a household&apos;s monthly
                  provisions to a hotel chain&apos;s daily kitchen supply.
                </p>
                <p>
                  Every relationship we have was built one honest order at a
                  time — and that is exactly how we intend to grow.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-surface py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Purpose"
            title="Mission & Vision"
          />
          <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
            <Reveal>
              <div className="group h-full rounded-3xl bg-white p-10 shadow-soft ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/8 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Target className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  Our Mission
                </h3>
                <p className="mt-3 leading-relaxed text-ink/60">
                  To deliver fresh, quality provisions at honest prices — with
                  the reliability that families depend on and businesses build
                  on. Every order, big or small, deserves the same care.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="group h-full rounded-3xl bg-white p-10 shadow-soft ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent-dark transition-transform duration-300 group-hover:scale-110">
                  <Eye className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  Our Vision
                </h3>
                <p className="mt-3 leading-relaxed text-ink/60">
                  To be the region&apos;s most trusted provision partner — the
                  first name every household, hotel and restaurant thinks of
                  when quality and dependability matter.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Journey"
            title="25 Years of Steady Growth"
            description="Milestones that shaped who we are today."
          />

          <div className="relative mx-auto mt-20 max-w-3xl">
            {/* vertical line */}
            <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-primary/30 via-primary/15 to-transparent sm:left-1/2" />

            <div className="space-y-14">
              {TIMELINE.map((item, i) => {
                const left = i % 2 === 0;
                return (
                  <Reveal key={item.year} delay={0.05}>
                    <div
                      className={`relative flex flex-col gap-4 pl-14 sm:w-1/2 sm:pl-0 ${
                        left
                          ? "sm:pr-12 sm:text-right"
                          : "sm:ml-auto sm:pl-12"
                      }`}
                    >
                      {/* dot */}
                      <span
                        className={`absolute left-5 top-1 flex h-4 w-4 -translate-x-1/2 items-center justify-center sm:top-2 ${
                          left ? "sm:left-full" : "sm:left-0"
                        }`}
                      >
                        <span className="absolute h-4 w-4 animate-ping rounded-full bg-accent/30" />
                        <span className="relative h-3 w-3 rounded-full bg-accent ring-4 ring-accent/15" />
                      </span>

                      <div className="rounded-2xl bg-surface p-7 shadow-soft ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                        <span className="font-display text-sm font-bold text-accent">
                          {item.year}
                        </span>
                        <h3 className="mt-1.5 font-display text-lg font-semibold text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink/60">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-surface py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="What Sets Us Apart"
            description="Seven reasons thousands of customers and hundreds of businesses choose us every day."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {WHY_CHOOSE_US.map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
