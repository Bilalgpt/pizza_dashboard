"use client";

import { seasons, seasonHeatmap } from "@/lib/data";

// Dark-surface-safe blue ramp, low → high popularity.
const RAMP = ["#16263b", "#1d3a5a", "#235181", "#256abf", "#3987e5", "#6da7ec"];

function cell(v) {
  let i = 0;
  if (v >= 85) i = 5;
  else if (v >= 75) i = 4;
  else if (v >= 65) i = 3;
  else if (v >= 55) i = 2;
  else if (v >= 40) i = 1;
  const dark = i >= 3; // bright cell → dark text
  return { bg: RAMP[i], fg: dark ? "#0a0f0d" : "#c3c2b7" };
}

export default function SeasonHeatmap() {
  const peak = (vals) => vals.indexOf(Math.max(...vals));

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[560px]">
        {/* header */}
        <div
          className="grid items-end gap-1.5 pb-2"
          style={{ gridTemplateColumns: `140px repeat(${seasons.length}, 1fr)` }}
        >
          <div />
          {seasons.map((s) => (
            <div key={s} className="text-center text-[11px] font-medium uppercase tracking-wide text-ink-muted">
              {s}
            </div>
          ))}
        </div>

        {/* rows */}
        <div className="space-y-1.5">
          {seasonHeatmap.map((row) => {
            const peakIdx = peak(row.values);
            return (
              <div
                key={row.item}
                className="grid items-center gap-1.5"
                style={{ gridTemplateColumns: `140px repeat(${seasons.length}, 1fr)` }}
              >
                <div className="truncate pr-2 text-sm font-medium text-white">{row.item}</div>
                {row.values.map((v, i) => {
                  const c = cell(v);
                  const isPeak = i === peakIdx;
                  return (
                    <div
                      key={i}
                      title={`${row.item} · ${seasons[i]}: ${v}/100`}
                      className={`relative flex h-11 items-center justify-center rounded-lg text-sm font-semibold tabular-nums transition hover:scale-[1.04] ${
                        isPeak ? "ring-2 ring-wa-green/70" : ""
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
          <span className="text-[11px] text-ink-muted">Less popular</span>
          <div className="flex gap-1">
            {RAMP.map((c) => (
              <span key={c} className="h-3 w-7 rounded" style={{ background: c }} />
            ))}
          </div>
          <span className="text-[11px] text-ink-muted">More popular</span>
          <span className="ml-auto flex items-center gap-1.5 text-[11px] text-ink-muted">
            <span className="h-3 w-3 rounded ring-2 ring-wa-green/70" /> peak season
          </span>
        </div>
      </div>
    </div>
  );
}
