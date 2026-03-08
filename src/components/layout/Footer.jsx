import Container from "./Container";

/**
 * Figma Footer target:
 * - 3 columns on desktop:
 *   1) Brand + short description + social circles row
 *   2) Menu links
 *   3) CMS Pages links + Contact info (icons)
 * - Minimal, clean, lots of whitespace
 */

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Book a table", href: "#book" },
  { label: "Gallery", href: "#gallery" },
  { label: "Privacy Policy", href: "#" },
];

const cmsLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Chef", href: "#chef" },
  { label: "Blog", href: "#blog" },
];

function SocialIcon({ label }) {
  const baseClass = "h-4 w-4";

  switch (label) {
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={baseClass} aria-hidden="true">
          <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6H16.8V4.8c-.3 0-1.2-.1-2.4-.1-2.4 0-4 1.5-4 4.2V11H7.8v3h2.6v8h3.1z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={baseClass} aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "X":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={baseClass} aria-hidden="true">
          <path d="M18.9 3H21l-6.5 7.4L22 21h-5.9l-4.6-6-5.2 6H4.2l7-8L2 3h6l4.2 5.5L18.9 3zm-1 16.3h1.2L7.4 4.6H6.1l11.8 14.7z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={baseClass} aria-hidden="true">
          <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30.4 30.4 0 0 0 2 12a30.4 30.4 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2A30.4 30.4 0 0 0 22 12a30.4 30.4 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
        </svg>
      );
    default:
      return <span className="text-[10px] font-bold">{label[0]}</span>;
  }
}

function SocialDot({ href, label }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="h-8 w-8 rounded-full border border-line bg-white shadow-soft2 hover:bg-gray-50 transition inline-flex items-center justify-center text-ink/70 hover:text-ink"
    >
      <SocialIcon label={label} />
    </a>
  );
}

function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-[12px] text-muted hover:text-ink transition"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container>
        <div className="py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="text-[14px] font-extrabold text-ink">
              Evaalasting Arm
            </div>

            <p className="mt-4 text-[12px] leading-relaxed text-muted max-w-[260px]">
              A restaurant readily available
              <br />
              to serve your needs regardless.
            </p>

            <div className="mt-6">
              <div className="text-[12px] font-semibold text-ink/70">
                Follow us
              </div>

              <div className="mt-3 flex items-center gap-3">
                <SocialDot href="#" label="Facebook" />
                <SocialDot href="#" label="Instagram" />
                <SocialDot href="#" label="X" />
                <SocialDot href="#" label="YouTube" />
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="lg:justify-self-center">
            <div className="text-[12px] font-extrabold text-ink">Menu</div>

            <div className="mt-4 grid gap-2.5">
              {menuLinks.map((l) => (
                <FooterLink key={l.label} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </div>
          </div>

          {/* CMS Pages + Contact */}
          <div className="lg:justify-self-end">
            <div className="text-[12px] font-extrabold text-ink">CMS Pages</div>

            <div className="mt-4 grid gap-2.5">
              {cmsLinks.map((l) => (
                <FooterLink key={l.label} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </div>

            <div className="mt-7 grid gap-3">
              <div className="flex items-center gap-3 text-[12px] text-muted">
                <span className="h-2 w-2 rounded-full bg-brand-600" />
                <span>support@evaalasting-arm.com</span>
              </div>

              <div className="flex items-center gap-3 text-[12px] text-muted">
                <span className="h-2 w-2 rounded-full bg-brand-600" />
                <span>+123 456 789</span>
              </div>

              <div className="flex items-center gap-3 text-[12px] text-muted">
                <span className="h-2 w-2 rounded-full bg-brand-600" />
                <span>Los Angeles</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-line py-6 text-center text-[11px] text-muted">
          © {new Date().getFullYear()} Evaalasting Arm. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}