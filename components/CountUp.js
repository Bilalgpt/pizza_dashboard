"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Animates a number from 0 → value on mount, formatting each frame.
// `format` receives the current (fractional) number and returns a string.
export default function CountUp({ value, format, duration = 1.4, delay = 0 }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  const ref = useRef(null);

  useEffect(() => {
    if (reduce) {
      setN(value);
      return;
    }
    let raf;
    let startTs;
    const dur = duration * 1000;
    const ease = (x) => 1 - Math.pow(1 - x, 4); // easeOutQuart

    const loop = (ts) => {
      if (startTs == null) startTs = ts;
      const p = Math.min((ts - startTs) / dur, 1);
      setN(value * ease(p));
      if (p < 1) raf = requestAnimationFrame(loop);
      else setN(value);
    };

    const timer = setTimeout(() => {
      raf = requestAnimationFrame(loop);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [value, duration, delay, reduce]);

  return <span ref={ref}>{format ? format(n) : Math.round(n).toLocaleString("en-US")}</span>;
}
