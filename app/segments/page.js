"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import DataFlow from "@/components/DataFlow";
import { segments, poll, formatNum } from "@/lib/data";

export default function SegmentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Smart targeting"
        title="Segments & Flow"
        desc="The same list, split into groups — so every customer gets the right message at the right time."
      />

      <Panel title="How the data works" subtitle="Sources → one database → targeted segments → campaigns">
        <DataFlow />
      </Panel>

      {/* smart targeting table */}
      <div className="mt-5">
        <Panel pad={false} title="The right message for each customer" subtitle="Slide-ready targeting map">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-y border-white/8 text-[11px] uppercase tracking-wide text-ink-muted">
                  <th className="px-6 py-3 font-medium">Group</th>
                  <th className="px-4 py-3 font-medium">Who</th>
                  <th className="px-4 py-3 text-right font-medium">Customers</th>
                  <th className="px-6 py-3 font-medium">Example message</th>
                </tr>
              </thead>
              <tbody>
                {segments.map((s) => (
                  <tr key={s.key} className="border-b border-white/5 transition hover:bg-white/[0.03]">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 font-medium text-white">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-ink-secondary">{s.who}</td>
                    <td className="px-4 py-4 text-right font-semibold tabular-nums text-white">{formatNum(s.count)}</td>
                    <td className="px-6 py-4">
                      <span className="italic text-ink-secondary">“{s.message}”</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      {/* live poll */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-5">
        <Panel className="lg:col-span-3" title="Customer poll" subtitle="Let customers vote, then crown a winner">
          <div className="mb-4 text-sm font-medium text-white">{poll.question}</div>
          <div className="space-y-3">
            {poll.options.map((o, i) => (
              <div key={o.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-ink-secondary">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: o.color }} />
                    {o.label}
                    {o.label === poll.winner && (
                      <span className="rounded-full bg-wa-green/15 px-2 py-0.5 text-[10px] font-semibold text-wa-mint">Winner</span>
                    )}
                  </span>
                  <span className="font-semibold tabular-nums text-white">{o.pct}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${o.pct}%` }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: o.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-ink-muted">
            {formatNum(poll.totalVotes)} votes · results update live in your WhatsApp Channel · figures are an example
          </div>
        </Panel>

        <Panel className="lg:col-span-2" title="Why segment?" subtitle="Beyond the blast">
          <ul className="space-y-3 text-sm text-ink-secondary">
            {[
              "Birthday & win-back messages send themselves automatically.",
              "VIPs get early access; new customers get a welcome offer.",
              "Nearby customers hear only about their branch's deals.",
              "Every message is relevant — so opt-outs stay near zero.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-wa-green" />
                {t}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
