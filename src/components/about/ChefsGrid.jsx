import Container from "../layout/Container";

/**
 * Figma Chefs section:
 * - Small orange label centered
 * - Serif heading centered (2 lines)
 * - Orange pill button
 * - 6 chef cards in a clean grid
 * - Each card: image (rounded-3xl), name + role, small orange dot at right
 */

const chefs = [
  { name: "Hiroshi Tanaka", role: "Umami Specialist", img: "/assets/chefs/chef1.jpg" },
  { name: "Hiroshi Tanaka", role: "Umami Specialist", img: "/assets/chefs/chef2.jpg" },
  { name: "Hiroshi Tanaka", role: "Umami Specialist", img: "/assets/chefs/chef3.jpg" },
  { name: "Hiroshi Tanaka", role: "Umami Specialist", img: "/assets/chefs/chef4.jpg" },
  { name: "Hiroshi Tanaka", role: "Umami Specialist", img: "/assets/chefs/chef5.jpg" },
  { name: "Hiroshi Tanaka", role: "Umami Specialist", img: "/assets/chefs/chef6.jpg" },
];

function Card({ name, role, img }) {
  return (
    <div className="group">
      <div className="overflow-hidden rounded-3xl bg-gray-100 shadow-soft2 ring-1 ring-line">
        <img
          src={img}
          alt={name}
          className="h-[220px] w-full object-cover sm:h-[240px] lg:h-[250px]"
          loading="lazy"
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-[12px] font-extrabold text-ink">{name}</div>
          <div className="mt-1 text-[10px] text-muted">{role}</div>
        </div>

        {/* Orange dot (matches figma) */}
        <div className="h-4 w-4 rounded-full bg-brand-600 shadow-soft ring-2 ring-brand-600/20" />
      </div>
    </div>
  );
}

export default function ChefsGrid() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[10px] font-extrabold tracking-[0.22em] text-brand-700">
            WE&apos;RE DYNAMIC CREATORS
          </div>

          <h2 className="mt-4 font-display text-[30px] leading-[1.12] sm:text-[42px] sm:leading-[1.12] font-extrabold tracking-tight text-ink">
            Meet the chefs behind
            <br />
            our culinary creations
          </h2>

          <div className="mt-6">
            <a
              href="#menu"
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-2.5 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition"
            >
              View menu
            </a>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {chefs.map((c, idx) => (
            <Card key={`${c.name}-${idx}`} {...c} />
          ))}
        </div>
      </Container>
    </section>
  );
}