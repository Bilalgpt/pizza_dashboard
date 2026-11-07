"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { channels, formatNum } from "@/lib/data";

const total = channels.reduce((s, c) => s + c.value, 0);

function TT({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-xl border border-white/10 bg-surface-base/95 px-3.5 py-2.5 text-xs shadow-xl backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-sm" style={{ background: p.color }} />
        <span className="font-semibold text-white">{p.name}</span>
      </div>
      <div className="mt-1 text-ink-secondary">
        {formatNum(p.value)} orders ·{" "}
        <span className="text-wa-mint">{((p.value / total) * 100).toFixed(1)}%</span>
      </div>
    </div>
  );
}

export default function ChannelDonut() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={channels}
              dataKey="value"
              innerRadius={62}
              outerRadius={92}
              paddingAngle={3}
              stroke="var(--surface-1)"
              strokeWidth={3}
              startAngle={90}
              endAngle={-270}
            >
              {channels.map((c) => (
                <Cell key={c.name} fill={c.color} />
              ))}
            </Pie>
            <Tooltip content={<TT />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-white">{formatNum(total)}</div>
          <div className="text-[11px] text-ink-muted">total orders</div>
        </div>
      </div>

      <ul className="w-full space-y-2.5">
        {channels.map((c) => (
          <li key={c.name} className="flex items-center gap-2.5">
            <span className="h-3 w-3 shrink-0 rounded-[4px]" style={{ background: c.color }} />
            <span className="text-sm text-ink-secondary">{c.name}</span>
            <span className="ml-auto shrink-0 text-sm font-semibold tabular-nums text-white">
              {((c.value / total) * 100).toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
