"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Animated counter that counts up when scrolled into view. */
export default function Counter({
  value,
  suffix = "",
  duration = 2,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = value.toLocaleString() + suffix;
      return;
    }
    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent =
            Math.round(latest).toLocaleString() + suffix;
        }
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, duration, motionValue, reduce]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
