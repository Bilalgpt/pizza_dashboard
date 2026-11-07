"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { itemTrends, itemTrendDefs } from "@/lib/data";

function TT({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-surface-base/95 px-3.5 py-2.5 text-xs shadow-xl backdrop-blur">
      <div className="mb-1.5 font-semibold text-white">{label}</div>
      {payload
        .slice()
        .sort((a, b) => b.value - a.value)
        .map((p) => (
          <div key={p.dataKey} className="mb-1 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
            <span className="text-ink-secondary">
              {itemTrendDefs.find((d) => d.key === p.dataKey)?.label}
            </span>
            <span className="ml-auto font-semibold tabular-nums text-white">{p.value}</span>
          </div>
        ))}
    </div>
  );
}

export default function ItemTrendLines() {
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        {itemTrendDefs.map((d) => (
          <span key={d.key} className="flex items-center gap-2 text-xs text-ink-secondary">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
            {d.label}
          </span>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={288}>
        <LineChart data={itemTrends} margin={{ top: 6, right: 12, left: -12, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--grid)" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "var(--text-muted)", fontSize: 11 }} dy={6} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--text-muted)", fontSize: 11 }} width={44} />
          <Tooltip content={<TT />} cursor={{ stroke: "rgba(255,255,255,0.15)" }} />
          {itemTrendDefs.map((d) => (
            <Line
              key={d.key}
              type="monotone"
              dataKey={d.key}
              stroke={d.color}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
