"use client";

import { MailOpen, Ticket, Wallet, UserPlus, ArrowUpRight, ShieldCheck, Clock, Lock, LogOut } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import RevenueBars from "@/components/charts/RevenueBars";
import { reportMetrics, campaigns, formatNum } from "@/lib/data";

const METRIC_ICONS = { read: MailOpen, codes: Ticket, sales: Wallet, growth: UserPlus };

// funnel across all campaigns
const totals = campaigns.reduce(
  (a, c) => ({ sent: a.sent + c.sent, read: a.read + c.read, redeemed: a.redeemed + c.redeemed }),
  { sent: 0, read: 0, redeemed: 0 }
);
const funnel = [
  { stage: "Messages sent", value: totals.sent, color: "#3987e5" },
  { stage: "Messages read", value: totals.read, color: "#199e70" },
  { stage: "Codes redeemed", value: totals.redeemed, color: "#25D366" },
];
const funnelMax = funnel[0].value;

const trust = [
  { icon: ShieldCheck, text: "Official WhatsApp Business API — your number stays safe from bans." },
  { icon: LogOut, text: "One-tap opt-out in every message. No annoyed customers." },
  { icon: Lock, text: "Your data stays yours — never shared with anyone or sold." },
  { icon: Clock, text: "2–3 messages a week at most, sent at mealtimes — never late at night." },
];

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Grow · every rupee tracked"
        title="Monthly Report"
        desc="You see exactly what you get for what you pay — messages read, codes used, orders, and list growth."
      />

      {/* report metric cards */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {reportMetrics.map((m) => {
          const Icon = METRIC_ICONS[m.key];
          return (
            <div key={m.key} className="glass sheen relative overflow-hidden rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-wa-green/10">
                  <Icon className="h-5 w-5 text-wa-mint" strokeWidth={2} />
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-wa-mint">
                  <ArrowUpRight className="h-3.5 w-3.5" /> {m.delta}%
                </span>
              </div>
              <div className="mt-4 text-[28px] font-bold leading-none text-white">{m.value}</div>
              <div className="mt-1.5 text-sm text-ink-secondary">{m.label}</div>
              <div className="text-[11px] text-ink-muted">{m.sub}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        <Panel className="lg:col-span-3" title="Revenue by campaign" subtitle="Attributed by promo code, this month">
          <RevenueBars />
        </Panel>

        <Panel className="lg:col-span-2" title="Conversion funnel" subtitle="Sent → read → redeemed">
          <div className="space-y-5 pt-2">
            {funnel.map((f, i) => {
              const pct = (f.value / funnelMax) * 100;
              const vsPrev = i === 0 ? 100 : (f.value / funnel[i - 1].value) * 100;
              return (
                <div key={f.stage}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-ink-secondary">{f.stage}</span>
                    <span className="font-semibold tabular-nums text-white">{formatNum(f.value)}</span>
                  </div>
                  <div className="h-9 overflow-hidden rounded-xl bg-white/5">
                    <div
                      className="flex h-full items-center justify-end rounded-xl pr-3 text-xs font-semibold text-black"
                      style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${f.color}aa, ${f.color})` }}
                    >
                      {i > 0 && `${vsPrev.toFixed(0)}%`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-5 text-xs text-ink-muted">
            Of every message read, {((totals.redeemed / totals.read) * 100).toFixed(1)}% turned into a tracked order.
          </p>
        </Panel>
      </div>

      {/* trust / compliance */}
      <div className="mt-5">
        <Panel title="Safe & professional" subtitle="Done the right way">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {trust.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.text} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-wa-green/12">
                    <Icon className="h-4.5 w-4.5 text-wa-mint" strokeWidth={2} />
                  </div>
                  <p className="text-sm leading-relaxed text-ink-secondary">{t.text}</p>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </>
  );
}
