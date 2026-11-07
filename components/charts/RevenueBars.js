"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { campaigns, formatMoney } from "@/lib/data";

const data = [...campaigns]
  .sort((a, b) => b.revenue - a.revenue)
  .map((c) => ({ name: c.code, revenue: c.revenue, full: c.name }));

function TT({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-xl border border-white/10 bg-surface-base/95 px-3.5 py-2.5 text-xs shadow-xl backdrop-blur">
      <div className="font-semibold text-white">{p.full}</div>
      <div className="mt-1 text-wa-mint">{formatMoney(p.revenue)}</div>
    </div>
  );
}

export default function RevenueBars() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 56, left: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="revbar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#128C7E" />
            <stop offset="100%" stopColor="#25D366" />
          </linearGradient>
        </defs>
        <CartesianGrid horizontal={false} stroke="var(--grid)" />
        <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: "var(--text-muted)", fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
        <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={86} tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
        <Tooltip content={<TT />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        <Bar dataKey="revenue" radius={[0, 6, 6, 0]} barSize={22} label={{ position: "right", fill: "#c3c2b7", fontSize: 11, formatter: (v) => formatMoney(v) }}>
          {data.map((d) => (
            <Cell key={d.name} fill="url(#revbar)" />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
