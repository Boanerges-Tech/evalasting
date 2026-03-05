import { useState } from "react";
import Container from "./Container";

const links = [
  { href: "#", label: "Home" },
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Review" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-line">
      <Container className="h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-ink grid place-items-center">
            <span className="text-white font-black text-sm">EA</span>
          </div>
          <div className="font-extrabold tracking-tight text-ink">
            Evaalasting Arm
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-ink/70">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-ink transition">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden sm:inline-flex rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink/80 hover:bg-gray-50"
          >
            Sign in
          </a>
          <a
            href="#"
            className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700 transition"
          >
            Reservations
          </a>

          {/* Mobile menu */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden h-10 w-10 rounded-xl border border-line grid place-items-center hover:bg-gray-50"
            aria-label="Open menu"
          >
            <span className="text-xl leading-none">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </Container>

      {/* Mobile dropdown */}
      {open && (
        <div className="lg:hidden border-t border-line bg-white">
          <Container className="py-4 grid gap-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700 transition"
              >
                {l.label}
              </a>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}