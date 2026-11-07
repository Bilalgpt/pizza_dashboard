"use client";

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";
import { forecast, formatNum } from "@/lib/data";

function TT({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const actual = payload.find((p) => p.dataKey === "actual" && p.value != null);
  const fc = payload.find((p) => p.dataKey === "forecast" && p.value != null);
  const band = payload.find((p) => p.dataKey === "band" && p.value != null);
  return (
    <div className="rounded-xl border border-white/10 bg-surface-base/95 px-3.5 py-2.5 text-xs shadow-xl backdrop-blur">
      <div className="mb-1 font-semibold text-white">{label}</div>
      {actual && (
        <div className="text-wa-mint">Actual · {formatNum(actual.value)} orders</div>
      )}
      {fc && !actual && (
        <div className="text-series-1">Forecast · {formatNum(fc.value)} orders</div>
      )}
      {band && Array.isArray(band.value) && (
        <div className="mt-0.5 text-ink-muted">
          Range {formatNum(band.value[0])} – {formatNum(band.value[1])}
        </div>
      )}
    </div>
  );
}

export default function ForecastChart() {
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4 text-xs text-ink-secondary">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-wa-green" /> Actual
        </span>
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-5 rounded bg-series-1" style={{ borderTop: "2px dashed" }} /> Forecast
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-series-1/25" /> Confidence band
        </span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={forecast} margin={{ top: 6, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#25D366" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#25D366" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--grid)" />
          {/* shade the forecast region */}
          <ReferenceArea x1="Nov" x2="Feb" fill="#3987e5" fillOpacity={0.05} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "var(--text-muted)", fontSize: 11 }} dy={6} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--text-muted)", fontSize: 11 }} width={48} tickFormatter={(v) => `${v / 1000}k`} />
          <Tooltip content={<TT />} cursor={{ stroke: "rgba(255,255,255,0.15)" }} />
          {/* confidence band (range area) */}
          <Area dataKey="band" stroke="none" fill="#3987e5" fillOpacity={0.18} connectNulls={false} isAnimationActive={false} />
          {/* actual with soft fill */}
          <Area dataKey="actual" stroke="#25D366" strokeWidth={2.5} fill="url(#actualFill)" connectNulls={false} dot={false} />
          {/* forecast dashed */}
          <Line dataKey="forecast" stroke="#3987e5" strokeWidth={2.5} strokeDasharray="6 6" dot={{ r: 3, fill: "#3987e5" }} connectNulls={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
