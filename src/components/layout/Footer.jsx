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
  { label: "Error 404", href: "#" },
];

const cmsLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Chef", href: "#chef" },
  { label: "Blog", href: "#blog" },
];

function SocialDot({ href, label }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="h-8 w-8 rounded-full border border-line bg-white shadow-soft2 hover:bg-gray-50 transition"
    />
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
                <span>testing@gmail.com</span>
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

        {/* Bottom line (optional but clean) */}
        <div className="border-t border-line py-6 text-center text-[11px] text-muted">
          © {new Date().getFullYear()} Evaalasting Arm. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}