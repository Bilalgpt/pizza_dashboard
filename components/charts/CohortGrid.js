"use client";

import { cohortMonths, cohorts, formatNum } from "@/lib/data";

// Green sequential ramp (one hue), low → high retention, dark-surface safe.
const RAMP = ["#10231a", "#13402b", "#13593a", "#0f7a4a", "#17a85f", "#34d27e"];

function cell(v) {
  let i;
  if (v >= 80) i = 5; // M0 (100%)
  else if (v >= 45) i = 4;
  else if (v >= 35) i = 3;
  else if (v >= 28) i = 2;
  else if (v >= 22) i = 1;
  else i = 0;
  const dark = i >= 4;
  return { bg: RAMP[i], fg: dark ? "#0a0f0d" : "#c3c2b7" };
}

export default function CohortGrid() {
  const cols = cohortMonths.length;
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[640px]">
        {/* header */}
        <div className="grid items-end gap-1.5 pb-2" style={{ gridTemplateColumns: `108px repeat(${cols}, 1fr)` }}>
          <div className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">Cohort</div>
          {cohortMonths.map((m) => (
            <div key={m} className="text-center text-[11px] font-medium text-ink-muted">{m}</div>
          ))}
        </div>

        {/* rows */}
        <div className="space-y-1.5">
          {cohorts.map((row) => (
            <div key={row.cohort} className="grid items-center gap-1.5" style={{ gridTemplateColumns: `108px repeat(${cols}, 1fr)` }}>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-white">{row.cohort}</span>
                <span className="text-[10px] text-ink-muted">{formatNum(row.size)}</span>
              </div>
              {Array.from({ length: cols }).map((_, i) => {
                const v = row.retention[i];
                if (v == null) return <div key={i} className="h-9 rounded-lg bg-white/[0.02]" />;
                const c = cell(v);
                return (
                  <div
                    key={i}
                    title={`${row.cohort} cohort · ${cohortMonths[i]}: ${v}% retained`}
                    className="flex h-9 items-center justify-center rounded-lg text-xs font-semibold tabular-nums transition hover:scale-[1.05]"
                    style={{ background: c.bg, color: c.fg }}
                  >
                    {v}%
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-ink-muted">
          Read a row left→right to see a cohort fade over time. Read the <span className="text-wa-mint">M1 column top→bottom</span>:
          second-order rate climbed from 42% (Apr) to 54% (Oct) — the system is keeping more customers each month.
        </p>
      </div>
    </div>
  );
}
