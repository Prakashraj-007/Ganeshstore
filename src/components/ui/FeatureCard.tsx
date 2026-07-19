import type { Feature } from "@/lib/data";
import Reveal from "./Reveal";

interface FeatureCardProps {
  feature: Feature;
  index?: number;
  accentIcon?: boolean;
}

/** Rounded card with icon chip, used for services / why-choose-us / benefits. */
export default function FeatureCard({
  feature,
  index = 0,
  accentIcon = false,
}: FeatureCardProps) {
  const { title, description, icon: Icon } = feature;

  return (
    <Reveal delay={(index % 4) * 0.08} className="h-full">
      <div className="group relative h-full overflow-hidden rounded-2xl bg-white p-7 shadow-soft ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
        {/* subtle hover wash */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 transition-colors duration-300 group-hover:from-primary/4 group-hover:to-transparent" />
        <div
          className={`relative mb-5 flex h-13 w-13 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${
            accentIcon
              ? "bg-accent/10 text-accent-dark"
              : "bg-primary/8 text-primary"
          }`}
        >
          <Icon className="h-6 w-6" strokeWidth={1.9} />
        </div>
        <h3 className="relative font-display text-lg font-semibold text-ink">
          {title}
        </h3>
        <p className="relative mt-2.5 text-sm leading-relaxed text-ink/60">
          {description}
        </p>
      </div>
    </Reveal>
  );
}
