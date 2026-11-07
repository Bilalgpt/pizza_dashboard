"use client";

import {
  Repeat,
  UserCheck,
  Receipt,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Send,
  Gem,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import CohortGrid from "@/components/charts/CohortGrid";
import RfmMatrix from "@/components/charts/RfmMatrix";
import { insightKpis, rfmTiers, churnRisk, churnSummary, formatMoney, formatNum } from "@/lib/data";

const KPI_ICONS = { repeat: Repeat, retain90: UserCheck, aov: Receipt, atrisk: AlertTriangle };

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Customer insights"
        title="Who stays, who's valuable, who's slipping"
        desc="Retention cohorts, RFM value tiers and a live churn-risk list — the proof that every order becomes a repeat customer."
      />

      {/* headline KPIs */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {insightKpis.map((k) => {
          const Icon = KPI_ICONS[k.key];
          const up = k.delta >= 0;
          const showDelta = k.delta !== 0;
          return (
            <div key={k.key} className="glass sheen relative overflow-hidden rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className={`grid h-10 w-10 place-items-center rounded-xl border border-white/10 ${k.danger ? "bg-orange-500/10" : "bg-wa-green/10"}`}>
                  <Icon className={`h-5 w-5 ${k.danger ? "text-orange-300" : "text-wa-mint"}`} strokeWidth={2} />
                </div>
                {showDelta && (
                  <span className={`flex items-center gap-1 text-xs font-semibold ${up ? "text-wa-mint" : "text-red-300"}`}>
                    {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                    {Math.abs(k.delta)}%
                  </span>
                )}
              </div>
              <div className="mt-4 text-[26px] font-bold leading-none text-white">{k.value}</div>
              <div className="mt-1.5 text-sm text-ink-secondary">{k.label}</div>
              <div className="text-[11px] text-ink-muted">{k.sub}</div>
            </div>
          );
        })}
      </div>

      {/* cohort retention */}
      <Panel
        title="Cohort retention"
        subtitle="Of customers acquired each month, the % still ordering N months later"
        action={
          <span className="flex items-center gap-1.5 rounded-full bg-wa-green/12 px-2.5 py-1 text-xs font-semibold text-wa-mint">
            <ArrowUpRight className="h-3.5 w-3.5" /> Improving
          </span>
        }
      >
        <CohortGrid />
      </Panel>

      {/* RFM tiers + matrix */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-5">
        <Panel className="xl:col-span-3" title="RFM value tiers" subtitle="Every customer scored on Recency, Frequency & Monetary value">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {rfmTiers.map((t) => (
              <div key={t.key} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.color }} />
                    {t.label}
                  </span>
                  <span className="text-sm font-bold tabular-nums text-white">{formatNum(t.count)}</span>
                </div>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-ink-muted">
                  <span>avg {formatMoney(t.avgSpend)}</span>
                  <span>·</span>
                  <span>last order {t.recency}</span>
                </div>
                <div className="mt-2.5 flex items-start gap-1.5 border-t border-white/8 pt-2.5 text-xs" style={{ color: t.color }}>
                  <Gem className="mt-0.5 h-3 w-3 shrink-0" />
                  <span className="text-ink-secondary">{t.action}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="xl:col-span-2" title="RFM distribution" subtitle="Recency × Frequency — where your base sits">
          <RfmMatrix />
        </Panel>
      </div>

      {/* churn risk */}
      <div className="mt-5">
        <Panel
          pad={false}
          title="Churn-risk — act now"
          subtitle="Valuable customers about to lapse, with the recommended save"
          action={
            <div className="flex items-center gap-4 pr-1 text-right">
              <div>
                <div className="text-sm font-bold text-white">{formatNum(churnSummary.atRisk)}</div>
                <div className="text-[10px] text-ink-muted">at risk</div>
              </div>
              <div>
                <div className="text-sm font-bold text-orange-300">{formatMoney(churnSummary.revenueAtRisk)}</div>
                <div className="text-[10px] text-ink-muted">revenue at risk</div>
              </div>
            </div>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="border-y border-white/8 text-[11px] uppercase tracking-wide text-ink-muted">
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Tier</th>
                  <th className="px-4 py-3 font-medium">Last order</th>
                  <th className="px-4 py-3 text-right font-medium">Spend</th>
                  <th className="px-4 py-3 font-medium">Churn risk</th>
                  <th className="px-4 py-3 font-medium">Suggested offer</th>
                  <th className="px-6 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {churnRisk.map((c) => {
                  const high = c.score >= 80;
                  return (
                    <tr key={c.name} className="border-b border-white/5 transition hover:bg-white/[0.03]">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-orange-500/25 to-wa-teal/10 text-xs font-bold text-orange-200">
                            {c.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div className="font-medium text-white">{c.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-ink-secondary">{c.tier}</td>
                      <td className="px-4 py-3.5 text-ink-secondary">{c.lastDays} days ago</td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-white">{formatMoney(c.spend)}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${c.score}%`, background: high ? "linear-gradient(90deg,#ec835a,#d03b3b)" : "linear-gradient(90deg,#fab219,#ec835a)" }}
                            />
                          </div>
                          <span className={`text-xs font-semibold tabular-nums ${high ? "text-red-300" : "text-orange-300"}`}>{c.score}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-ink-secondary">{c.offer}</td>
                      <td className="px-6 py-3.5">
                        <button className="flex items-center gap-1.5 rounded-lg bg-wa-green/15 px-3 py-1.5 text-xs font-semibold text-wa-mint ring-1 ring-wa-green/30 transition hover:bg-wa-green/25">
                          <Send className="h-3.5 w-3.5" /> Win back
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 text-xs text-ink-muted">
            {formatNum(churnSummary.savedLastMonth)} customers reactivated last month via automated win-back campaigns.
          </div>
        </Panel>
      </div>
    </>
  );
}
