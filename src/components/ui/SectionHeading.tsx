import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}

/** Consistent section heading: eyebrow chip, title and optional description. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      <span
        className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest ${
          light
            ? "bg-white/10 text-accent ring-1 ring-white/20"
            : "bg-primary/5 text-primary ring-1 ring-primary/15"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {eyebrow}
      </span>
      <h2
        className={`font-display text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`text-base leading-relaxed sm:text-lg ${
            light ? "text-white/70" : "text-ink/60"
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
