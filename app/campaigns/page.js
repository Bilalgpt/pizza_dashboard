"use client";

import { Film, Ticket, Clock, HeartHandshake, Cake, Trophy } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import { campaigns, formatMoney, formatNum } from "@/lib/data";

const types = [
  { icon: Film, name: "Launch videos", text: "15–20s reels of new items, sent on launch day." },
  { icon: Ticket, name: "Promo codes", text: "A unique code per campaign (e.g. WA20) so every order is tracked." },
  { icon: Clock, name: "Slow-hour deals", text: "Fill quiet Monday & Tuesday nights with time-limited offers." },
  { icon: HeartHandshake, name: "Win-back offers", text: "“We miss you” discounts for customers inactive 30+ days." },
  { icon: Cake, name: "Birthday treats", text: "A free dessert sent automatically in birthday week." },
  { icon: Trophy, name: "Match-day deals", text: "“Order before the toss” offers for PSL & Pakistan games." },
];

const statusStyle = {
  live: "bg-wa-green/15 text-wa-mint ring-wa-green/30",
  scheduled: "bg-series-1/15 text-series-1 ring-series-1/30",
  completed: "bg-white/10 text-ink-secondary ring-white/15",
};

export default function CampaignsPage() {
  const totalRev = campaigns.reduce((s, c) => s + c.revenue, 0);
  const totalRedeemed = campaigns.reduce((s, c) => s + c.redeemed, 0);

  return (
    <>
      <PageHeader
        eyebrow="Engage · campaigns that bring orders"
        title="WhatsApp Campaigns"
        desc="Every campaign carries a unique promo code, so each order traces back to the message that drove it."
      />

      {/* summary row */}
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Active campaigns", value: campaigns.filter((c) => c.status === "live").length },
          { label: "Codes redeemed", value: formatNum(totalRedeemed) },
          { label: "Revenue attributed", value: formatMoney(totalRev) },
          { label: "Avg read rate", value: "68.4%" },
        ].map((s) => (
          <div key={s.label} className="glass sheen rounded-2xl p-4">
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="mt-1 text-xs text-ink-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <Panel pad={false} title="Campaign performance" subtitle="Sent → read → redeemed, with revenue attributed by code">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead>
              <tr className="border-y border-white/8 text-[11px] uppercase tracking-wide text-ink-muted">
                <th className="px-6 py-3 font-medium">Campaign</th>
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Segment</th>
                <th className="px-4 py-3 font-medium">Read rate</th>
                <th className="px-4 py-3 text-right font-medium">Redeemed</th>
                <th className="px-4 py-3 text-right font-medium">Revenue</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => {
                const readPct = Math.round((c.read / c.sent) * 100);
                return (
                  <tr key={c.code} className="border-b border-white/5 transition hover:bg-white/[0.03]">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{c.name}</div>
                      <div className="text-[11px] text-ink-muted">{c.type} · {formatNum(c.sent)} sent</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-md bg-white/8 px-2 py-1 font-mono text-xs text-wa-mint">{c.code}</span>
                    </td>
                    <td className="px-4 py-4 text-ink-secondary">{c.segment}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-gradient-to-r from-wa-green to-wa-mint" style={{ width: `${readPct}%` }} />
                        </div>
                        <span className="text-xs tabular-nums text-ink-secondary">{readPct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right font-semibold tabular-nums text-white">{formatNum(c.redeemed)}</td>
                    <td className="px-4 py-4 text-right tabular-nums text-wa-mint">{formatMoney(c.revenue)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ring-1 ${statusStyle[c.status]}`}>
                        {c.status === "live" && <span className="h-1.5 w-1.5 rounded-full bg-wa-green" />}
                        {c.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="mt-6 mb-3 text-sm font-semibold text-white">Campaign types you can run</div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {types.map((t) => {
          const Icon = t.icon;
          return (
            <div key={t.name} className="glass glass-hover sheen relative overflow-hidden rounded-2xl p-5 transition">
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-wa-green/10">
                <Icon className="h-5 w-5 text-wa-mint" strokeWidth={2} />
              </div>
              <div className="mt-4 text-[15px] font-semibold text-white">{t.name}</div>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{t.text}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
