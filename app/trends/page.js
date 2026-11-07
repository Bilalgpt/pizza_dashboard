"use client";

import { TrendingUp, CalendarRange, Target, Sparkles } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import ForecastChart from "@/components/charts/ForecastChart";
import ItemTrendLines from "@/components/charts/ItemTrendLines";
import SeasonHeatmap from "@/components/charts/SeasonHeatmap";
import { forecastSummary, seasonalUplift } from "@/lib/data";

const SUMMARY_ICONS = [Target, CalendarRange, Sparkles];

const upliftMax = Math.max(...seasonalUplift.map((s) => s.uplift));

export default function TrendsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patterns & forecast"
        title="Trends & Forecast"
        desc="Spot which dishes sell in which season, see demand lift around Pakistani seasons and events, and project the months ahead."
      />

      {/* forecast summary */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {forecastSummary.map((s, i) => {
          const Icon = SUMMARY_ICONS[i];
          return (
            <div key={s.label} className="glass sheen relative overflow-hidden rounded-2xl p-5">
              <div className="flex items-center gap-2 text-xs text-ink-muted">
                <Icon className="h-4 w-4 text-wa-mint" /> {s.label}
              </div>
              <div className="mt-2 text-[26px] font-bold leading-none text-white">{s.value}</div>
              <div className="mt-1 text-xs text-wa-mint">{s.sub}</div>
            </div>
          );
        })}
      </div>

      {/* forecast chart */}
      <Panel
        title="Orders forecast"
        subtitle="12 months of history + 3-month projection with confidence band"
        action={
          <span className="flex items-center gap-1.5 rounded-full bg-series-1/15 px-2.5 py-1 text-xs font-semibold text-series-1">
            <TrendingUp className="h-3.5 w-3.5" /> Winter peak ahead
          </span>
        }
      >
        <ForecastChart />
        <p className="mt-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-ink-secondary">
          <span className="font-semibold text-white">Insight:</span> orders dip through summer
          (May–Jun) and peak in winter. Expect <span className="text-wa-mint">~6,980 orders in January</span> —
          stock up on Chicken Tikka & Cheese Lover, and schedule winter-night campaigns early.
        </p>
      </Panel>

      {/* heatmap + item trends */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Panel title="What sells in each season" subtitle="Popularity index (0–100) by dish & season">
          <SeasonHeatmap />
        </Panel>
        <Panel title="Item popularity over the year" subtitle="Top 4 items, monthly orders">
          <ItemTrendLines />
        </Panel>
      </div>

      {/* seasonal uplift */}
      <div className="mt-5">
        <Panel title="Demand lift by season & event" subtitle="Order uplift vs a normal week — your calendar of opportunities">
          <div className="space-y-3.5">
            {seasonalUplift.map((s) => (
              <div key={s.event} className="flex items-center gap-4">
                <div className="w-48 shrink-0">
                  <div className="text-sm font-medium text-white">{s.event}</div>
                  <div className="text-[11px] text-ink-muted">{s.note}</div>
                </div>
                <div className="h-8 flex-1 overflow-hidden rounded-lg bg-white/5">
                  <div
                    className="flex h-full items-center justify-end rounded-lg pr-2.5 text-xs font-bold text-black"
                    style={{
                      width: `${(s.uplift / upliftMax) * 100}%`,
                      background: "linear-gradient(90deg, #128C7E, #25D366)",
                    }}
                  >
                    +{s.uplift}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-ink-muted">
            Plan campaigns around the biggest lifts — Eid, Ramadan Iftar and PSL match-days drive the most extra orders.
          </p>
        </Panel>
      </div>
    </>
  );
}
