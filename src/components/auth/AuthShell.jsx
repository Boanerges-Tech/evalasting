import Container from "../layout/Container";

export default function AuthShell({ label, title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      {/* soft background blobs */}
      <div className="pointer-events-none absolute -left-44 top-16 h-[520px] w-[520px] rounded-full bg-brand-600/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-260px] top-24 h-[560px] w-[560px] rounded-full bg-amber-200/20 blur-3xl" />

      <Container>
        <div className="mx-auto max-w-[520px]">
          <div className="rounded-3xl bg-white p-6 shadow-soft2 ring-1 ring-line sm:p-8">
            <div className="text-center">
              <div className="text-[10px] font-extrabold tracking-[0.22em] text-brand-700">
                {label}
              </div>

              <h1 className="mt-4 font-display text-[32px] leading-[1.1] sm:text-[42px] sm:leading-[1.02] font-extrabold tracking-tight text-ink">
                {title}
              </h1>

              <p className="mx-auto mt-3 max-w-[380px] text-[13px] leading-relaxed text-muted">
                {subtitle}
              </p>
            </div>

            <div className="mt-8">{children}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}