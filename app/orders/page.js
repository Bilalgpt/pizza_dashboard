"use client";

import { Store, QrCode, Globe, MessageCircle, Phone, Package } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import OrdersArea from "@/components/charts/OrdersArea";
import ChannelDonut from "@/components/charts/ChannelDonut";
import { formatNum } from "@/lib/data";

const touchpoints = [
  { icon: Store, title: "At the counter", text: "Cashier asks for the phone number at billing and saves it in the POS.", captured: 4820, color: "#3987e5" },
  { icon: QrCode, title: "QR on tables", text: "“Scan to join our WhatsApp club and get a free drink.”", captured: 1960, color: "#199e70" },
  { icon: Globe, title: "Online orders", text: "Name, number and address saved automatically with every order.", captured: 3110, color: "#d95926" },
  { icon: MessageCircle, title: "WhatsApp orders", text: "Everyone who messages is added with their order details.", captured: 3290, color: "#008300" },
  { icon: Phone, title: "Phone orders", text: "Call staff log the number, area and order in one simple form.", captured: 1260, color: "#c98500" },
  { icon: Package, title: "Delivery apps", text: "A QR card in every delivery bag invites app customers to join you directly.", captured: 1140, color: "#9085e9" },
];

export default function OrdersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Collect · every touchpoint"
        title="Orders & Collection"
        desc="Walk-in, online, WhatsApp or phone — no customer leaves without a record. Here's where every order and contact comes from."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Panel className="lg:col-span-2" title="Orders by channel" subtitle="Daily, last 30 days">
          <OrdersArea />
        </Panel>
        <Panel title="Channel mix" subtitle="This month">
          <ChannelDonut />
        </Panel>
      </div>

      <div className="mt-6 mb-3 text-sm font-semibold text-white">Collection touchpoints</div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {touchpoints.map((t) => {
          const Icon = t.icon;
          return (
            <div key={t.title} className="glass glass-hover sheen relative overflow-hidden rounded-2xl p-5 transition">
              <div
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/10"
                style={{ background: `${t.color}1f` }}
              >
                <Icon className="h-5 w-5" style={{ color: t.color }} strokeWidth={2} />
              </div>
              <div className="mt-4 text-[15px] font-semibold text-white">{t.title}</div>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{t.text}</p>
              <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3">
                <span className="text-xs text-ink-muted">Contacts captured</span>
                <span className="text-sm font-bold tabular-nums text-white">{formatNum(t.captured)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
