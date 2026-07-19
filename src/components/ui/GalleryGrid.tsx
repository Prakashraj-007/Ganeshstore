"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { GALLERY_IMAGES, type GalleryImage } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

const FILTERS = ["All", "Shop", "Warehouse", "Delivery", "Shelves"] as const;

interface GalleryGridProps {
  images?: GalleryImage[];
  showFilters?: boolean;
}

/** Masonry-style gallery grid (CSS columns) with optional category filters. */
export default function GalleryGrid({
  images = GALLERY_IMAGES,
  showFilters = false,
}: GalleryGridProps) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const visible =
    filter === "All" ? images : images.filter((img) => img.category === filter);

  return (
    <div>
      {showFilters ? (
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                filter === f
                  ? "bg-primary text-white shadow-soft"
                  : "bg-white text-ink/65 ring-1 ring-ink/10 hover:text-primary hover:ring-primary/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      ) : null}

      <div className="columns-2 gap-5 lg:columns-3 [&>*]:mb-5">
        {visible.map((image, i) => (
          <Reveal key={image.src} delay={(i % 3) * 0.08}>
            <motion.figure
              layout
              className={`group relative overflow-hidden rounded-2xl shadow-soft ${image.aspect}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-108"
              />
              {/* hover overlay */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary-dark/85 via-primary-dark/20 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                <figcaption className="p-5">
                  <span className="mb-2 inline-block rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    {image.category}
                  </span>
                  <p className="text-sm font-medium text-white">{image.alt}</p>
                </figcaption>
              </div>
            </motion.figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
