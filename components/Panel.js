"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Panel({ title, subtitle, action, className = "", children, pad = true }) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
      className={`glass sheen relative overflow-hidden rounded-3xl ${className}`}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-3 px-6 pt-5">
          <div>
            {title && <h3 className="text-[15px] font-semibold text-white">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-ink-muted">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={pad ? "p-6" : ""}>{children}</div>
    </motion.section>
  );
}
