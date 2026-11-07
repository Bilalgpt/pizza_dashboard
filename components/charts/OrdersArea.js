"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ordersTrend, SERIES } from "@/lib/data";

// Color follows the channel entity, consistent with the donut.
const seriesDefs = [
  { key: "whatsapp", label: "WhatsApp", color: SERIES.green },
  { key: "branch", label: "Branch", color: SERIES.blue },
  { key: "online", label: "Online", color: SERIES.orange },
  { key: "phone", label: "Phone", color: SERIES.yellow },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s, p) => s + (p.value || 0), 0);
  return (
    <div className="rounded-xl border border-white/10 bg-surface-base/95 px-3.5 py-3 text-xs shadow-xl backdrop-blur">
      <div className="mb-2 font-semibold text-white">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="mb-1 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: p.color }} />
          <span className="text-ink-secondary">
            {seriesDefs.find((s) => s.key === p.dataKey)?.label}
          </span>
          <span className="ml-auto font-semibold tabular-nums text-white">{p.value}</span>
        </div>
      ))}
      <div className="mt-2 flex items-center gap-2 border-t border-white/10 pt-2">
        <span className="text-ink-muted">Total orders</span>
        <span className="ml-auto font-bold tabular-nums text-wa-mint">{total}</span>
      </div>
    </div>
  );
}

export default function OrdersArea() {
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        {seriesDefs.map((s) => (
          <div key={s.key} className="flex items-center gap-2 text-xs text-ink-secondary">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
            {s.label}
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={288}>
        <AreaChart data={ordersTrend} margin={{ top: 6, right: 8, left: -14, bottom: 0 }}>
          <defs>
            {seriesDefs.map((s) => (
              <linearGradient key={s.key} id={`fill-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity={0.55} />
                <stop offset="100%" stopColor={s.color} stopOpacity={0.04} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid vertical={false} stroke="var(--grid)" strokeDasharray="0" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "var(--text-muted)", fontSize: 11 }} dy={6} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--text-muted)", fontSize: 11 }} width={44} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.18)", strokeWidth: 1 }} />
          {seriesDefs.map((s) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stackId="1"
              stroke={s.color}
              strokeWidth={2}
              fill={`url(#fill-${s.key})`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
