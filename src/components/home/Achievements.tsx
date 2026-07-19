import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { ACHIEVEMENTS } from "@/lib/data";

export default function Achievements() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Achievements"
          title="Numbers That Speak for Themselves"
          description="A track record built on decades of consistent quality and dependable service."
        />
        <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ACHIEVEMENTS.map(({ value, suffix, label, icon: Icon }, i) => (
            <Reveal key={label} delay={i * 0.08} className="h-full">
              <div className="group flex h-full flex-col items-center gap-3 rounded-2xl bg-gradient-to-b from-surface to-white p-8 text-center shadow-soft ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/12 group-hover:text-accent-dark">
                  <Icon className="h-6 w-6" strokeWidth={1.9} />
                </div>
                <Counter
                  value={value}
                  suffix={suffix}
                  className="font-display text-3xl font-bold text-primary"
                />
                <span className="text-xs font-medium leading-snug text-ink/60">
                  {label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
