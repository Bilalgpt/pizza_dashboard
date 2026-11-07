export default function PageHeader({ eyebrow, title, desc, children }) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-wa-green/25 bg-wa-green/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-wa-mint">
            <span className="h-1.5 w-1.5 rounded-full bg-wa-green" />
            {eyebrow}
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-[28px]">
          {title}
        </h1>
        {desc && <p className="mt-1.5 max-w-2xl text-sm text-ink-secondary">{desc}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
