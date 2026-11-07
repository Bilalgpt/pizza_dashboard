"use client";

import { Users, Wallet, ShoppingBag, Ticket, ArrowUpRight, TrendingUp } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import Panel from "@/components/Panel";
import OrdersArea from "@/components/charts/OrdersArea";
import ChannelDonut from "@/components/charts/ChannelDonut";
import DataFlow from "@/components/DataFlow";
import { kpis, segments, branches, formatNum } from "@/lib/data";

const KPI_ICONS = { customers: Users, revenue: Wallet, orders: ShoppingBag, codes: Ticket };

export default function Overview() {
  return (
    <>
      <PageHeader
        eyebrow="Live demo"
        title="Growth Overview"
        desc="Every order — branch, online, WhatsApp or phone — captured into one private customer list and turned into targeted campaigns."
      >
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-wa-green to-wa-teal px-4 py-2.5 text-sm font-semibold text-black shadow-glow transition hover:brightness-110">
          New campaign <ArrowUpRight className="h-4 w-4" />
        </button>
      </PageHeader>

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k, i) => (
          <StatCard key={k.key} kpi={k} index={i} icon={KPI_ICONS[k.key]} />
        ))}
      </div>

      {/* trend + channels */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2"
          title="Orders by channel"
          subtitle="Daily orders, last 30 days — WhatsApp is now the top channel"
          action={
            <span className="flex items-center gap-1.5 rounded-full bg-wa-green/12 px-2.5 py-1 text-xs font-semibold text-wa-mint">
              <TrendingUp className="h-3.5 w-3.5" /> +14.6%
            </span>
          }
        >
          <OrdersArea />
        </Panel>

        <Panel title="Where orders come from" subtitle="This month">
          <ChannelDonut />
        </Panel>
      </div>

      {/* data flow */}
      <div className="mt-5">
        <Panel
          title="How the data works"
          subtitle="From every order to the right message"
        >
          <DataFlow />
        </Panel>
      </div>

      {/* segments summary + branches */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-5">
        <Panel className="lg:col-span-3" title="Customer segments" subtitle="Who's in your list right now">
          <div className="space-y-3">
            {segments.map((s) => {
              const max = Math.max(...segments.map((x) => x.count));
              return (
                <div key={s.key} className="group flex items-center gap-4">
                  <div className="w-40 shrink-0">
                    <div className="text-sm font-medium text-white">{s.label}</div>
                    <div className="text-[11px] text-ink-muted">{s.who}</div>
                  </div>
                  <div className="h-7 flex-1 overflow-hidden rounded-lg bg-white/5">
                    <div
                      className="flex h-full items-center justify-end rounded-lg pr-2 transition-all"
                      style={{ width: `${(s.count / max) * 100}%`, background: `linear-gradient(90deg, ${s.color}55, ${s.color})` }}
                    >
                      <span className="text-xs font-semibold tabular-nums text-white">{formatNum(s.count)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel className="lg:col-span-2" title="Branches" subtitle="Customers & orders by location">
          <div className="space-y-1">
            {branches.map((b) => (
              <div key={b.name} className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-white/5">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-xs font-bold text-wa-mint">
                  {b.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-white">{b.name}</div>
                  <div className="text-[11px] text-ink-muted">{b.city} · {formatNum(b.customers)} customers</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold tabular-nums text-white">{formatNum(b.orders)}</div>
                  <div className={`text-[11px] font-medium ${b.trend >= 0 ? "text-wa-mint" : "text-red-300"}`}>
                    {b.trend >= 0 ? "+" : ""}{b.trend}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
