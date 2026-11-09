"use client";

import { Sparkles, Clapperboard, Clock, Layers3, Wand2, Share2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import Motion3D from "@/components/Motion3D";
import { aiAds, adStats } from "@/lib/data";

const STAT_ICONS = { creatives: Clapperboard, cost: Wand2, turnaround: Clock, formats: Share2 };

function AdVideo({ ad }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/40">
      <div className="relative w-full" style={{ aspectRatio: ad.ratio || "16 / 9" }}>
        <video
          className="h-full w-full object-cover"
          src={ad.src}
          poster={ad.poster}
          controls
          preload="none"
          playsInline
        />
        <span className="pointer-events-none absolute right-2.5 top-2.5 rounded-md bg-black/65 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-white/90 backdrop-blur">
          {ad.duration}
        </span>
      </div>
    </div>
  );
}

function AdMeta({ ad }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-wa-green/12 px-2.5 py-0.5 text-[11px] font-semibold text-wa-mint">
          {ad.product}
        </span>
      </div>
      <h3 className="mt-2 text-base font-semibold text-white">{ad.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-secondary">{ad.desc}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {ad.tags.map((t) => (
          <span
            key={t}
            className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-ink-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </>
  );
}

export default function AdsPage() {
  const featured = aiAds.find((a) => a.featured) || aiAds[0];
  const rest = aiAds.filter((a) => a.key !== featured.key);

  return (
    <>
      <PageHeader
        eyebrow="AI Ads Studio"
        title="Ad creative, generated in-house"
        desc="A growing library of AI-generated video ads for Pizza Max — ready to broadcast on WhatsApp Status, Reels and paid placements. No studio, no crew, same-day turnaround."
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-wa-green/25 bg-wa-green/10 px-3 py-1.5 text-xs font-semibold text-wa-mint">
          <Sparkles className="h-3.5 w-3.5" /> {aiAds.length} creatives live
        </span>
      </PageHeader>

      {/* stat row */}
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {adStats.map((s, i) => {
          const Icon = STAT_ICONS[s.key] || Layers3;
          return (
            <Motion3D key={s.key} delay={i * 0.06} maxTilt={7} className="glass sheen relative overflow-hidden rounded-2xl p-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-wa-green/10">
                <Icon className="h-5 w-5 text-wa-mint" strokeWidth={2} />
              </div>
              <div className="mt-4 text-[22px] font-bold leading-none text-white">{s.value}</div>
              <div className="mt-1.5 text-sm text-ink-secondary">{s.label}</div>
              <div className="text-[11px] text-ink-muted">{s.sub}</div>
            </Motion3D>
          );
        })}
      </div>

      {/* featured creative */}
      <Panel
        title="Featured creative"
        subtitle="The hero spot for the latest product push"
        action={
          <span className="flex items-center gap-1.5 rounded-full bg-wa-green/12 px-2.5 py-1 text-xs font-semibold text-wa-mint">
            <Sparkles className="h-3.5 w-3.5" /> New
          </span>
        }
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <AdVideo ad={featured} />
          </div>
          <div className="flex flex-col justify-center lg:col-span-2">
            <AdMeta ad={featured} />
          </div>
        </div>
      </Panel>

      {/* gallery */}
      <div className="mt-6 mb-2 flex items-center gap-2 px-1">
        <Clapperboard className="h-4 w-4 text-wa-mint" />
        <h2 className="text-sm font-semibold text-white">Creative library</h2>
        <span className="text-xs text-ink-muted">· {rest.length} more</span>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {rest.map((ad, i) => (
          <Motion3D
            key={ad.key}
            delay={i * 0.08}
            className="glass sheen relative overflow-hidden rounded-2xl p-3"
          >
            <AdVideo ad={ad} />
            <div className="p-3 pt-4">
              <AdMeta ad={ad} />
            </div>
          </Motion3D>
        ))}
      </div>
    </>
  );
}
