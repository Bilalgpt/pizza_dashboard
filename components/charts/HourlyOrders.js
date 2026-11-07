"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { hourlyOrders } from "@/lib/data";

const max = Math.max(...hourlyOrders.map((d) => d.orders));
// highlight the two meal peaks
const isPeak = (h) => (h >= 12 && h <= 14) || (h >= 19 && h <= 21);

function TT({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const v = payload[0].value;
  const peak = isPeak(payload[0].payload.h);
  return (
    <div className="rounded-xl border border-white/10 bg-surface-base/95 px-3.5 py-2.5 text-xs shadow-xl backdrop-blur">
      <div className="font-semibold text-white">{label}</div>
      <div className="mt-0.5 text-ink-secondary">{v} orders / hr</div>
      {peak && <div className="mt-0.5 font-medium text-wa-mint">Peak window — staff up</div>}
    </div>
  );
}

export default function HourlyOrders() {
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4 text-xs text-ink-secondary">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-wa-green" /> Peak hours (staff &amp; stock up)
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: "#1f6b4a" }} /> Normal
        </span>
      </div>
      <ResponsiveContainer width="100%" height={272}>
        <BarChart data={hourlyOrders} margin={{ top: 6, right: 6, left: -16, bottom: 0 }} barCategoryGap={2}>
          <defs>
            <linearGradient id="peakBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#25D366" />
              <stop offset="100%" stopColor="#0f9f52" />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--grid)" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} interval={1} tick={{ fill: "var(--text-muted)", fontSize: 10 }} dy={4} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--text-muted)", fontSize: 11 }} width={44} />
          <Tooltip content={<TT />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Bar dataKey="orders" radius={[4, 4, 0, 0]} maxBarSize={26}>
            {hourlyOrders.map((d) => (
              <Cell key={d.h} fill={isPeak(d.h) ? "url(#peakBar)" : "#1f6b4a"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
