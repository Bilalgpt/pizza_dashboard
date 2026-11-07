"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Database, Store, Globe, MessageCircle, Phone, Send } from "lucide-react";
import { sources, segments, formatNum } from "@/lib/data";

const SRC_ICON = { Store, Globe, MessageCircle, Phone };

// SVG geometry --------------------------------------------------
const VB_W = 1200;
const VB_H = 420;

const srcCenters = sources.map((_, i) => 55 + i * 98);
const segCenters = segments.map((_, i) => 43 + i * 78);

const HUB = { cx: 585, cy: 200 };

// connectors recompute so they stay attached to the floating hub
function srcPath(cy, dx, dy) {
  return `M 230 ${cy} C 360 ${cy}, 360 ${HUB.cy + dy}, ${490 + dx} ${HUB.cy + dy}`;
}
function segPath(cy, dx, dy) {
  return `M ${680 + dx} ${HUB.cy + dy} C 820 ${HUB.cy + dy}, 820 ${cy}, 965 ${cy}`;
}

export default function DataFlow() {
  const reduce = useReducedMotion();
  const target = useRef({ x: 0, y: 0 });
  const [p, setP] = useState({ x: 0, y: 0 });

  // smooth lerp toward the cursor target (and back to centre on leave)
  useEffect(() => {
    if (reduce) return;
    let raf;
    const tick = () => {
      setP((prev) => {
        const tx = target.current.x;
        const ty = target.current.y;
        let nx = prev.x + (tx - prev.x) * 0.1;
        let ny = prev.y + (ty - prev.y) * 0.1;
        if (Math.abs(tx - nx) < 0.001) nx = tx;
        if (Math.abs(ty - ny) < 0.001) ny = ty;
        // settled: return same reference so React skips the re-render
        if (nx === prev.x && ny === prev.y) return prev;
        return { x: nx, y: ny };
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  function onMove(e) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    target.current = {
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    };
  }
  function onLeave() {
    target.current = { x: 0, y: 0 };
  }

  const dx = p.x * 18; // hub parallax range
  const dy = p.y * 13;
  const gdx = p.x * 7; // glow drifts a touch more for depth
  const gdy = p.y * 5;

  return (
    <div className="relative">
      <div className="overflow-x-auto" onMouseMove={onMove} onMouseLeave={onLeave}>
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="h-auto w-full min-w-[760px]"
          role="img"
          aria-label="Data flow from order sources into the customer database, split into targeted segments"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="hubGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#25D366" />
              <stop offset="100%" stopColor="#128C7E" />
            </linearGradient>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#25D366" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#25D366" stopOpacity="0" />
            </radialGradient>
            <style>{`
              .flow { stroke-dasharray: 6 10; animation: dash 1.1s linear infinite; }
              @keyframes dash { to { stroke-dashoffset: -32; } }
            `}</style>
          </defs>

          {/* connectors: sources -> hub */}
          {srcCenters.map((cy, i) => (
            <g key={`sc-${i}`}>
              <path d={srcPath(cy, dx, dy)} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              <path d={srcPath(cy, dx, dy)} fill="none" stroke="#2a78d6" strokeWidth="2" className="flow" opacity="0.8" />
            </g>
          ))}

          {/* connectors: hub -> segments */}
          {segCenters.map((cy, i) => (
            <g key={`sg-${i}`}>
              <path d={segPath(cy, dx, dy)} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              <path d={segPath(cy, dx, dy)} fill="none" stroke={segments[i].color} strokeWidth="2" className="flow" opacity="0.85" />
            </g>
          ))}

          {/* hub glow (drifts a touch more → depth) */}
          <circle cx={HUB.cx + dx + gdx} cy={HUB.cy + dy + gdy} r="150" fill="url(#hubGlow)" />

          {/* floating hub node + label */}
          <g transform={`translate(${dx} ${dy})`}>
            <circle cx={HUB.cx} cy={HUB.cy} r="92" fill="#0c1512" stroke="url(#hubGrad)" strokeWidth="2.5" filter="url(#glow)" />
            <circle cx={HUB.cx} cy={HUB.cy} r="78" fill="none" stroke="rgba(37,211,102,0.25)" strokeWidth="1" />
            <text x={HUB.cx} y={HUB.cy - 6} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700">
              Customer
            </text>
            <text x={HUB.cx} y={HUB.cy + 16} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700">
              Database
            </text>
            <text x={HUB.cx} y={HUB.cy + 40} textAnchor="middle" fill="#4ADE80" fontSize="12" fontWeight="600">
              12,480 records
            </text>
          </g>

          {/* source nodes (fixed) */}
          {sources.map((s, i) => {
            const cy = srcCenters[i];
            return (
              <g key={s.key}>
                <rect x="20" y={cy - 34} width="210" height="68" rx="16" fill="#0f1613" stroke="rgba(42,120,214,0.4)" strokeWidth="1.5" />
                <circle cx="52" cy={cy} r="5" fill="#3987e5" />
                <text x="78" y={cy - 4} fill="#fff" fontSize="14" fontWeight="600">{s.label}</text>
                <text x="78" y={cy + 16} fill="#898781" fontSize="12">{formatNum(s.value)} contacts</text>
              </g>
            );
          })}

          {/* segment nodes (fixed) */}
          {segments.map((s, i) => {
            const cy = segCenters[i];
            return (
              <g key={s.key}>
                <rect x="965" y={cy - 28} width="215" height="56" rx="14" fill="#0f1613" stroke={s.color} strokeOpacity="0.5" strokeWidth="1.5" />
                <circle cx="992" cy={cy} r="5" fill={s.color} />
                <text x="1010" y={cy - 2} fill="#fff" fontSize="13" fontWeight="600">{s.label}</text>
                <text x="1010" y={cy + 15} fill="#898781" fontSize="11">{formatNum(s.count)} customers</text>
              </g>
            );
          })}

          {/* column captions */}
          <text x="125" y="400" textAnchor="middle" fill="#898781" fontSize="12" fontWeight="600" letterSpacing="1">
            DATA SOURCES
          </text>
          <text x={HUB.cx} y="340" textAnchor="middle" fill="#898781" fontSize="12" fontWeight="600" letterSpacing="1">
            ONE PRIVATE LIST
          </text>
          <text x="1072" y="400" textAnchor="middle" fill="#898781" fontSize="12" fontWeight="600" letterSpacing="1">
            TARGETED SEGMENTS
          </text>
        </svg>
      </div>

      {/* targeted campaign result strip */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-4 flex items-center gap-4 rounded-2xl border border-wa-green/25 bg-gradient-to-r from-wa-green/12 to-transparent px-5 py-4"
      >
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-wa-green to-wa-teal">
          <Send className="h-5 w-5 text-black/80" strokeWidth={2.2} />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">
            → Every segment becomes a targeted WhatsApp campaign
          </div>
          <div className="text-xs text-ink-muted">
            The right message, to the right customer, at the right time — tracked by a unique promo code.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
