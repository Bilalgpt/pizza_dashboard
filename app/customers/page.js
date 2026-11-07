"use client";

import { useState } from "react";
import { Search, Phone, MapPin, Cake, Star } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import { customers, segments, formatMoney, formatNum } from "@/lib/data";

const fields = [
  { label: "Name & WhatsApp", use: "Send offers straight to their phone" },
  { label: "Area & nearest branch", use: "Run branch-specific deals" },
  { label: "Birthday", use: "Send birthday treats automatically" },
  { label: "Favourite items", use: "Recommend what they actually like" },
  { label: "Order history & spend", use: "Find and reward VIP customers" },
  { label: "Last order date", use: "Win back customers who stopped" },
  { label: "Order channel", use: "See where each customer came from" },
];

const segColor = Object.fromEntries(segments.map((s) => [s.label, s.color]));

export default function CustomersPage() {
  const [q, setQ] = useState("");
  const [seg, setSeg] = useState("All");

  const filtered = customers.filter((c) => {
    const matchQ =
      !q ||
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.area.toLowerCase().includes(q.toLowerCase()) ||
      c.fav.toLowerCase().includes(q.toLowerCase());
    const matchSeg = seg === "All" || c.segment === seg;
    return matchQ && matchSeg;
  });

  const segOptions = ["All", ...segments.map((s) => s.label)];

  return (
    <>
      <PageHeader
        eyebrow="Customer database"
        title="Customers"
        desc="One private list you own — never sold, never shared. Every field exists to power a campaign."
      />

      {/* what we save */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {fields.map((f, i) => (
          <div
            key={f.label}
            className="glass sheen relative overflow-hidden rounded-2xl p-4"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wide text-wa-mint">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="mt-1 text-sm font-semibold text-white">{f.label}</div>
            <div className="mt-1 text-xs leading-relaxed text-ink-muted">{f.use}</div>
          </div>
        ))}
      </div>

      <Panel pad={false} title="All customers" subtitle={`${formatNum(12480)} total · showing ${filtered.length} match`}>
        {/* filters */}
        <div className="flex flex-col gap-3 px-6 pb-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, area or favourite item…"
              className="h-10 w-full rounded-xl border border-white/8 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-ink-muted outline-none focus:border-wa-green/40"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {segOptions.map((s) => (
              <button
                key={s}
                onClick={() => setSeg(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  seg === s
                    ? "bg-wa-green/20 text-wa-mint ring-1 ring-wa-green/40"
                    : "bg-white/5 text-ink-muted hover:text-ink-secondary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[840px] text-left text-sm">
            <thead>
              <tr className="border-y border-white/8 text-[11px] uppercase tracking-wide text-ink-muted">
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Area / Branch</th>
                <th className="px-4 py-3 font-medium">Favourite</th>
                <th className="px-4 py-3 text-right font-medium">Orders</th>
                <th className="px-4 py-3 text-right font-medium">Spend</th>
                <th className="px-4 py-3 font-medium">Last order</th>
                <th className="px-6 py-3 font-medium">Segment</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.name} className="border-b border-white/5 transition hover:bg-white/[0.03]">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-wa-green/30 to-wa-teal/20 text-xs font-bold text-wa-mint">
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-medium text-white">{c.name}</div>
                        <div className="flex items-center gap-1 text-[11px] text-ink-muted">
                          <Phone className="h-3 w-3" /> {c.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 text-ink-secondary">
                      <MapPin className="h-3.5 w-3.5 text-ink-muted" /> {c.area}
                    </div>
                    <div className="text-[11px] text-ink-muted">{c.branch}</div>
                  </td>
                  <td className="px-4 py-3.5 text-ink-secondary">{c.fav}</td>
                  <td className="px-4 py-3.5 text-right font-semibold tabular-nums text-white">{c.orders}</td>
                  <td className="px-4 py-3.5 text-right tabular-nums text-ink-secondary">{formatMoney(c.spend)}</td>
                  <td className="px-4 py-3.5 text-ink-secondary">
                    <div>{c.last}</div>
                    <div className="flex items-center gap-1 text-[11px] text-ink-muted">
                      <Cake className="h-3 w-3" /> {c.birthday}
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
                      style={{ background: `${segColor[c.segment]}22`, color: segColor[c.segment] }}
                    >
                      {c.orders >= 8 && <Star className="h-3 w-3" />}
                      {c.segment}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-ink-muted">
                    No customers match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
