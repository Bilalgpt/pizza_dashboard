"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatMoney, formatNum } from "@/lib/data";
import CountUp from "@/components/CountUp";

function Spark({ data, up }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120;
  const h = 40;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return [x, y];
  });
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const area = `${d} L${w},${h} L0,${h} Z`;
  const stroke = up ? "#4ADE80" : "#e66767";
  const id = `sg-${Math.round(data[0])}-${up}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-10 w-28" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function StatCard({ kpi, index = 0, icon: Icon }) {
  const ref = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 0 });
  const up = kpi.delta >= 0;

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({
      ry: (px - 0.5) * 14,
      rx: -(py - 0.5) * 14,
      gx: px * 100,
      gy: py * 100,
    });
  }
  function onLeave() {
    setT({ rx: 0, ry: 0, gx: 50, gy: 0 });
  }

  const fmt = kpi.money ? formatMoney : (x) => formatNum(Math.round(x));

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      className="scene"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="glass glass-hover sheen tilt relative overflow-hidden rounded-3xl p-5"
        style={{ transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
      >
        {/* cursor-follow glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70 transition-opacity"
          style={{
            background: `radial-gradient(240px circle at ${t.gx}% ${t.gy}%, rgba(37,211,102,0.16), transparent 60%)`,
          }}
        />

        <div className="relative flex items-start justify-between">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
            {Icon && <Icon className="h-5 w-5 text-wa-mint" strokeWidth={2} />}
          </div>
          <span
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
              up ? "bg-wa-green/15 text-wa-mint" : "bg-red-500/15 text-red-300"
            }`}
          >
            {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {Math.abs(kpi.delta)}%
          </span>
        </div>

        <div className="relative mt-5 flex items-end justify-between">
          <div>
            <div className="text-[32px] font-bold leading-none tracking-tight text-white">
              <CountUp value={kpi.value} format={fmt} delay={index * 0.07 + 0.25} />
            </div>
            <div className="mt-2 text-sm text-ink-secondary">{kpi.label}</div>
            <div className="mt-0.5 text-[11px] text-ink-muted">{kpi.hint}</div>
          </div>
          <div style={{ transform: "translateZ(30px)" }}>
            <Spark data={kpi.spark} up={up} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
