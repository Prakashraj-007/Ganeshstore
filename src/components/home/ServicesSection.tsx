import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureCard from "@/components/ui/FeatureCard";
import Reveal from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/data";

export default function ServicesSection() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="Everything Your Kitchen or Business Needs"
          description="From single households to hotel chains — one dependable supply partner for every requirement."
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
  );
}
