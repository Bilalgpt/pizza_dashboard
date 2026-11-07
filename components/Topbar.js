"use client";

import { Search, Bell, Calendar, ChevronDown } from "lucide-react";
import { brand } from "@/lib/data";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-surface-base/60 px-5 py-4 backdrop-blur-xl sm:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-4">
        <div className="lg:hidden">
          <span className="brand-gradient text-lg font-bold">{brand.name}</span>
        </div>

        {/* search */}
        <div className="relative hidden flex-1 md:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            placeholder="Search customers, codes, campaigns…"
            className="h-10 w-full max-w-md rounded-xl border border-white/8 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-ink-muted outline-none transition focus:border-wa-green/40 focus:bg-white/8"
          />
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <button className="flex h-10 items-center gap-2 rounded-xl border border-white/8 bg-white/5 px-3.5 text-sm text-ink-secondary transition hover:border-white/15">
            <Calendar className="h-4 w-4 text-wa-mint" />
            <span className="hidden sm:inline">Last 30 days</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/8 bg-white/5 transition hover:border-white/15">
            <Bell className="h-[18px] w-[18px] text-ink-secondary" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-wa-green ring-2 ring-surface-base" />
          </button>

          <div className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/5 py-1.5 pl-1.5 pr-3">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-wa-green to-wa-teal text-xs font-bold text-black">
              TP
            </div>
            <div className="hidden leading-tight sm:block">
              <div className="text-xs font-semibold text-white">Admin</div>
              <div className="text-[10px] text-ink-muted">{brand.agency}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
