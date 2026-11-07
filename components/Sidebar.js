"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Megaphone,
  Layers,
  BarChart3,
  TrendingUp,
  Gem,
  MessageCircle,
} from "lucide-react";
import { brand } from "@/lib/data";

const nav = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/orders", label: "Orders", icon: ShoppingBag },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/segments", label: "Segments & Flow", icon: Layers },
  { href: "/trends", label: "Trends & Forecast", icon: TrendingUp },
  { href: "/insights", label: "Customer Insights", icon: Gem },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col gap-2 border-r border-white/5 px-4 py-6 lg:flex">
      {/* brand */}
      <div className="mb-6 flex items-center gap-3 px-2">
        <div className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-wa-green to-wa-teal shadow-glow">
          <MessageCircle className="h-5 w-5 text-black/80" strokeWidth={2.4} />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-white">{brand.name}</div>
          <div className="text-[11px] text-ink-muted">Growth Console</div>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                active
                  ? "text-white"
                  : "text-ink-muted hover:text-ink-secondary"
              }`}
            >
              {active && (
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-wa-green/18 to-transparent ring-1 ring-wa-green/30" />
              )}
              <Icon
                className={`relative h-[18px] w-[18px] transition ${
                  active ? "text-wa-green" : "group-hover:text-ink-secondary"
                }`}
                strokeWidth={2}
              />
              <span className="relative font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="glass sheen relative overflow-hidden rounded-2xl p-4">
          <div className="text-[11px] font-medium uppercase tracking-wide text-wa-mint">
            Official WhatsApp API
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
            Opt-in only · one-tap opt-out · your number stays ban-safe.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa-green opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-wa-green" />
            </span>
            <span className="text-xs text-ink-secondary">Connected</span>
          </div>
        </div>
        <div className="mt-3 px-2 text-[11px] text-ink-muted">
          by {brand.agency} · demo
        </div>
      </div>
    </aside>
  );
}
