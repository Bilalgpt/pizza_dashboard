"use client";

import { TrendingUp, CalendarRange, Target, Sparkles, Clock, Users, Package, Send } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import ForecastChart from "@/components/charts/ForecastChart";
import ItemTrendLines from "@/components/charts/ItemTrendLines";
import SeasonHeatmap from "@/components/charts/SeasonHeatmap";
import HourlyOrders from "@/components/charts/HourlyOrders";
import PeakHeatmap from "@/components/charts/PeakHeatmap";
import { forecastSummary, seasonalUplift, peakSummary, sendWindows } from "@/lib/data";

const PEAK_ICONS = [Clock, Clock, Clock, Users];

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

      {/* ── Peak order times ───────────────────────────────── */}
      <div className="mb-3 mt-9">
        <div className="inline-flex items-center gap-2 rounded-full border border-wa-green/25 bg-wa-green/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-wa-mint">
          <Clock className="h-3.5 w-3.5" /> Peak order times
        </div>
        <h2 className="mt-2 text-xl font-bold text-white">When your customers order</h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-secondary">
          Know your busy and quiet hours — staff and stock for the rush, and send WhatsApp campaigns just before people order.
        </p>
      </div>

      {/* peak summary chips */}
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {peakSummary.map((s, i) => {
          const Icon = PEAK_ICONS[i];
          return (
            <div key={s.label} className="glass sheen relative overflow-hidden rounded-2xl p-5">
              <div className="flex items-center gap-2 text-xs text-ink-muted">
                <Icon className="h-4 w-4 text-wa-mint" /> {s.label}
              </div>
              <div className="mt-2 text-[24px] font-bold leading-none text-white">{s.value}</div>
              <div className="mt-1 text-[11px] text-ink-muted">{s.sub}</div>
            </div>
          );
        })}
      </div>

      {/* hourly + weekly heatmap */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Panel title="Orders by hour of day" subtitle="Typical day — two meal peaks">
          <HourlyOrders />
        </Panel>
        <Panel title="Busy hours by day of week" subtitle="Order intensity (0–100) per time slot">
          <PeakHeatmap />
        </Panel>
      </div>

      {/* best send windows → campaigns */}
      <div className="mt-5">
        <Panel
          title="Best times to send campaigns"
          subtitle="Reach people just before they order — tied to your peak windows"
          action={
            <span className="flex items-center gap-1.5 rounded-full bg-wa-green/12 px-2.5 py-1 text-xs font-semibold text-wa-mint">
              <Send className="h-3.5 w-3.5" /> Auto-scheduled
            </span>
          }
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {sendWindows.map((w, i) => {
              const avoid = i === sendWindows.length - 1;
              return (
                <div
                  key={w.time}
                  className={`relative overflow-hidden rounded-2xl border p-4 ${
                    avoid
                      ? "border-white/8 bg-white/[0.02]"
                      : "border-wa-green/25 bg-gradient-to-br from-wa-green/10 to-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock className={`h-4 w-4 ${avoid ? "text-ink-muted" : "text-wa-mint"}`} />
                    <span className={`text-lg font-bold ${avoid ? "text-ink-secondary" : "text-white"}`}>
                      {w.time}
                    </span>
                  </div>
                  <div className={`mt-2 text-sm font-semibold ${avoid ? "text-ink-secondary" : "text-white"}`}>
                    {w.label}
                  </div>
                  <div className="mt-1 text-xs text-ink-muted">{w.detail}</div>
                  <div className="mt-3 border-t border-white/8 pt-2 text-[11px] text-ink-muted">{w.peak}</div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 flex items-start gap-2 text-xs text-ink-muted">
            <Package className="mt-0.5 h-3.5 w-3.5 shrink-0 text-wa-mint" />
            Campaigns scheduled 30–60 min before each peak land while customers are deciding what to eat — and keep to meal times, never late night.
          </p>
        </Panel>
      </div>
    </>
  );
}
