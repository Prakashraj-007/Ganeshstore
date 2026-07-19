import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryGrid from "@/components/ui/GalleryGrid";
import Reveal from "@/components/ui/Reveal";
import { GALLERY_IMAGES } from "@/lib/data";

export default function GalleryPreview() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="A Look Inside Our Store & Warehouse"
          description="Our shop, warehouse, delivery fleet and stocked shelves — quality you can see."
        />
        <div className="mt-16">
          <GalleryGrid images={GALLERY_IMAGES.slice(0, 6)} />
        </div>
        <Reveal className="mt-8 flex justify-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-7 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-lift"
          >
            View Full Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
