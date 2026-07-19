"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/lib/data";

const AUTOPLAY_MS = 6000;

export default function Testimonials() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);

  const paginate = useCallback((dir: number) => {
    setState(([current]) => [
      (current + dir + TESTIMONIALS.length) % TESTIMONIALS.length,
      dir,
    ]);
  }, []);

  useEffect(() => {
    const id = setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paginate, index]);

  const testimonial = TESTIMONIALS[index];

  return (
    <section className="bg-surface py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Customers Say"
          description="The trust of families and businesses is our proudest achievement."
        />

        <Reveal className="relative mx-auto mt-16 max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl bg-white px-6 py-12 shadow-soft ring-1 ring-ink/5 sm:px-14">
            <Quote className="absolute left-6 top-6 h-10 w-10 text-primary/10 sm:left-8 sm:top-8" />

            <div className="relative min-h-56 sm:min-h-44">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.figure
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-6 text-center"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <blockquote className="text-base leading-relaxed text-ink/75 sm:text-lg">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption>
                    <div className="font-display text-base font-semibold text-primary">
                      {testimonial.name}
                    </div>
                    <div className="mt-1 text-sm text-ink/55">
                      {testimonial.role}
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-soft ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-lift"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-7 bg-accent"
                      : "w-2 bg-ink/15 hover:bg-ink/30"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-soft ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-lift"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
