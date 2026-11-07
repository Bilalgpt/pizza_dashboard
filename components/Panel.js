export default function Panel({ title, subtitle, action, className = "", children, pad = true }) {
  return (
    <section className={`glass sheen relative overflow-hidden rounded-3xl ${className}`}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-3 px-6 pt-5">
          <div>
            {title && <h3 className="text-[15px] font-semibold text-white">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-ink-muted">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={pad ? "p-6" : ""}>{children}</div>
    </section>
  );
}
