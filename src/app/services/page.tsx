import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureCard from "@/components/ui/FeatureCard";
import CtaBand from "@/components/ui/CtaBand";
import { SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Retail supply, wholesale supply, hotel and restaurant provisioning, catering supply, bulk orders, door delivery and monthly supply arrangements.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="One Partner for Every Supply Need"
        description="Whether you run a household, a restaurant or a hotel chain — we have a service built around you."
      />

      <section className="bg-surface py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Offer"
            title="Services Built Around Your Needs"
            description="Eight core services, one standard of quality."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, i) => (
              <FeatureCard
                key={service.title}
                feature={service}
                index={i}
                accentIcon
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
