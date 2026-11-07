"use client";

import { peakDays, peakSlots, peakHeatmap } from "@/lib/data";

// Dark-surface-safe GREEN ramp (sequential, one hue), low → high demand.
const RAMP = ["#10231a", "#13402b", "#13593a", "#0f7a4a", "#17a85f", "#34d27e"];

function cell(v) {
  let i = 0;
  if (v >= 85) i = 5;
  else if (v >= 70) i = 4;
  else if (v >= 55) i = 3;
  else if (v >= 40) i = 2;
  else if (v >= 25) i = 1;
  const dark = i >= 4; // bright cell → dark text
  return { bg: RAMP[i], fg: dark ? "#0a0f0d" : "#c3c2b7" };
}

export default function PeakHeatmap() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[560px]">
        {/* header */}
        <div
          className="grid items-end gap-1.5 pb-2"
          style={{ gridTemplateColumns: `56px repeat(${peakSlots.length}, 1fr)` }}
        >
          <div />
          {peakSlots.map((s) => (
            <div key={s} className="text-center text-[11px] font-medium uppercase tracking-wide text-ink-muted">
              {s}
            </div>
          ))}
        </div>

        {/* rows */}
        <div className="space-y-1.5">
          {peakHeatmap.map((row) => {
            const peakIdx = row.values.indexOf(Math.max(...row.values));
            return (
              <div
                key={row.day}
                className="grid items-center gap-1.5"
                style={{ gridTemplateColumns: `56px repeat(${peakSlots.length}, 1fr)` }}
              >
                <div className="text-sm font-medium text-white">{row.day}</div>
                {row.values.map((v, i) => {
                  const c = cell(v);
                  return (
                    <div
                      key={i}
                      title={`${row.day} · ${peakSlots[i]}: ${v}/100`}
                      className={`relative flex h-10 items-center justify-center rounded-lg text-sm font-semibold tabular-nums transition hover:scale-[1.04] ${
                        i === peakIdx ? "ring-2 ring-wa-green/70" : ""
                      }`}
                      style={{ background: c.bg, color: c.fg }}
                    >
                      {v}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* legend */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-[11px] text-ink-muted">Quiet</span>
          <div className="flex gap-1">
            {RAMP.map((c) => (
              <span key={c} className="h-3 w-7 rounded" style={{ background: c }} />
            ))}
          </div>
          <span className="text-[11px] text-ink-muted">Busy</span>
          <span className="ml-auto flex items-center gap-1.5 text-[11px] text-ink-muted">
            <span className="h-3 w-3 rounded ring-2 ring-wa-green/70" /> peak slot
          </span>
        </div>
      </div>
    </div>
  );
}
