"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Panel({ title, subtitle, action, className = "", children, pad = true }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 0, on: false });

  function onMove(e) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    // gentle tilt — panels are large, so keep the angle small
    setT({ ry: (px - 0.5) * 6, rx: -(py - 0.5) * 6, gx: px * 100, gy: py * 100, on: true });
  }
  function onLeave() {
    setT({ rx: 0, ry: 0, gx: 50, gy: 0, on: false });
  }

  return (
    <div className={`scene ${className}`}>
      <motion.section
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
        style={{ transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
        className="tilt relative h-full rounded-3xl"
      >
        {/* clipped glass background + cursor glow — 2D layer sitting at the back */}
        <div
          className={`glass sheen absolute inset-0 overflow-hidden rounded-3xl transition-shadow duration-300 ${
            t.on
              ? "border-wa-green/35 shadow-[0_0_0_1px_rgba(37,211,102,0.18),0_30px_70px_-30px_rgba(37,211,102,0.4)]"
              : ""
          }`}
          style={{ transform: "translateZ(0px)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: t.on ? 0.7 : 0,
              background: `radial-gradient(360px circle at ${t.gx}% ${t.gy}%, rgba(37,211,102,0.12), transparent 60%)`,
            }}
          />
        </div>

        {/* header — floats slightly forward */}
        {(title || action) && (
          <div
            className="relative flex items-start justify-between gap-3 px-6 pt-5"
            style={{ transform: "translateZ(18px)" }}
          >
            <div>
              {title && <h3 className="text-[15px] font-semibold text-white">{title}</h3>}
              {subtitle && <p className="mt-0.5 text-xs text-ink-muted">{subtitle}</p>}
            </div>
            {action}
          </div>
        )}

        {/* plot / content — floats furthest forward for real depth on tilt */}
        <div
          className={`relative ${pad ? "p-6" : ""}`}
          style={{ transform: "translateZ(38px)" }}
        >
          {children}
        </div>
      </motion.section>
    </div>
  );
}
