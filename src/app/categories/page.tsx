import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import CtaBand from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Product Categories",
  description:
    "Rice, pulses, cooking oil, spices, vegetables, fruits, dry fruits, cleaning products, bakery, dairy, beverages and household essentials.",
};

export default function CategoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Product Categories"
        title="A Complete Range Under One Roof"
        description="Every category your home or business kitchen needs — sourced fresh, stocked deep and priced fairly."
      />

      <section className="bg-surface py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Stock"
            title="Explore Our Categories"
            description="Visit our store or contact us for availability and wholesale pricing in any category."
          />
          <div className="mt-16">
            <CategoriesGrid full />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
