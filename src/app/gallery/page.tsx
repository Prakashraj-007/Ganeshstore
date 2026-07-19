import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/ui/GalleryGrid";
import CtaBand from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look inside Sri Ganesh Store — our shop, warehouse, delivery fleet and stocked product shelves.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Inside Our Store & Warehouse"
        description="Our shop floor, warehouse operations, delivery fleet and fully stocked shelves — quality you can see."
      />

      <section className="bg-surface py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GalleryGrid showFilters />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
