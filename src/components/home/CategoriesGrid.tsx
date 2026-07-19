import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { CATEGORIES } from "@/lib/data";

interface CategoriesGridProps {
  /** When true, renders only the grid (no section wrapper) for embedding in a page. */
  full?: boolean;
}

export default function CategoriesGrid({ full = false }: CategoriesGridProps) {
  const grid = (
    <div className={`grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 ${!full ? "mt-10" : ""}`}>
      {CATEGORIES.map((category, i) => {
        const Icon = category.icon;
        return (
          <Reveal key={category.title} delay={(i % 4) * 0.07} className="h-full">
            <div className="group flex h-full flex-col items-center gap-4 rounded-2xl bg-white p-7 text-center shadow-soft ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${category.tint}`}
              >
                <Icon className="h-8 w-8" strokeWidth={1.7} />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-ink">
                  {category.title}
                </h3>
                <p className="mt-1.5 hidden text-xs leading-relaxed text-ink/55 sm:block">
                  {category.description}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );

  if (full) return grid;

  return (
    <section className="bg-surface py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Product Categories"
          title="A Complete Range of Provisions"
          description="From daily staples to specialty items — every category your home or business kitchen needs."
        />

        {/* Collage image */}
        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-3xl shadow-lift ring-1 ring-ink/5">
            <Image
              src="/collage.png"
              alt="A collage of provision store products including rice, spices, pulses, oils, vegetables and more"
              width={1400}
              height={600}
              className="h-64 w-full object-cover sm:h-80 lg:h-96"
              priority
            />
          </div>
        </Reveal>

        {grid}

      </div>
    </section>
  );
}
