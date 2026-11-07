"use client";

import { rfmRecency, rfmFrequency, rfmMatrix, formatNum } from "@/lib/data";

const RAMP = ["#10231a", "#13402b", "#13593a", "#0f7a4a", "#17a85f", "#34d27e"];
const flat = rfmMatrix.flat();
const max = Math.max(...flat);

function cell(v) {
  const t = v / max;
  let i;
  if (t >= 0.8) i = 5;
  else if (t >= 0.6) i = 4;
  else if (t >= 0.4) i = 3;
  else if (t >= 0.25) i = 2;
  else if (t >= 0.12) i = 1;
  else i = 0;
  const dark = i >= 4;
  return { bg: RAMP[i], fg: dark ? "#0a0f0d" : "#c3c2b7" };
}

export default function RfmMatrix() {
  const cols = rfmFrequency.length;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-[11px] text-ink-muted">
        <span>← less recent · more recent ↑</span>
        <span>Frequency →</span>
      </div>
      <div className="flex gap-3">
        {/* y label */}
        <div className="flex items-center">
          <span className="rotate-180 text-[11px] font-medium uppercase tracking-wide text-ink-muted [writing-mode:vertical-rl]">
            Recency
          </span>
        </div>
        <div className="flex-1">
          {/* col header */}
          <div className="grid gap-1.5 pb-1.5" style={{ gridTemplateColumns: `28px repeat(${cols}, 1fr)` }}>
            <div />
            {rfmFrequency.map((f) => (
              <div key={f} className="text-center text-[11px] text-ink-muted">{f}</div>
            ))}
          </div>
          {rfmMatrix.map((rowVals, r) => (
            <div key={r} className="mb-1.5 grid gap-1.5" style={{ gridTemplateColumns: `28px repeat(${cols}, 1fr)` }}>
              <div className="flex items-center text-[11px] text-ink-muted">{rfmRecency[r]}</div>
              {rowVals.map((v, c) => {
                const col = cell(v);
                return (
                  <div
                    key={c}
                    title={`${rfmRecency[r]} × ${rfmFrequency[c]}: ${formatNum(v)} customers`}
                    className="flex h-10 items-center justify-center rounded-lg text-xs font-semibold tabular-nums transition hover:scale-[1.05]"
                    style={{ background: col.bg, color: col.fg }}
                  >
                    {formatNum(v)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs text-ink-muted">
        Top-right = <span className="text-wa-mint">Champions</span> (recent + frequent). Bottom-left = hibernating.
      </p>
    </div>
  );
}
