"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { HERO_IMAGE, HERO_STATS } from "@/lib/data";
import Counter from "@/components/ui/Counter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image + gradient overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMAGE}
          alt="Premium grocery provisions"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/95 via-primary/85 to-primary-dark/70" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-40 sm:px-6 sm:pt-48 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent ring-1 ring-white/20 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Wholesale & Retail Provisions Since 2000
          </motion.span>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 font-display text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Your Trusted{" "}
            <span className="relative whitespace-nowrap text-accent">
              Wholesale & Retail
            </span>{" "}
            Provision Partner
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            Serving families, hotels, restaurants, catering services and
            wholesale businesses with quality products and trusted service.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/portal"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dark sm:w-auto"
            >
              Business Customer Portal
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Stats — glass cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {HERO_STATS.map(({ value, suffix, label, icon: Icon }) => (
            <div
              key={label}
              className="glass-dark group flex flex-col items-center gap-2 rounded-2xl px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              <Icon
                className="h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.9}
              />
              <Counter
                value={value}
                suffix={suffix}
                className="font-display text-2xl font-bold text-white"
              />
              <span className="text-[11px] font-medium leading-snug text-white/65">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
