import Container from "../layout/Container";

/**
 * Figma section:
 * - Small orange label centered: "Let us handle you"
 * - Big serif heading centered
 * - 8 image tiles in a clean grid
 * - Caption under each tile
 */

const events = [
  { title: "Wedding Proposal", img: "/assets/events/wedding.jpg" },
  { title: "Friends Hangout", img: "/assets/events/friends.jpg" },
  { title: "Corporate Events", img: "/assets/events/corporate.jpg" },
  { title: "Anniversary", img: "/assets/events/anniversary.jpg" },
  { title: "Birthday", img: "/assets/events/birthday.jpg" },
  { title: "Dinner", img: "/assets/events/dinner.jpg" },
  { title: "Special Order", img: "/assets/events/special-order.jpg" },
  { title: "Personal Moment", img: "/assets/events/personal.jpg" },
];

function Tile({ title, img }) {
  return (
    <div>
      <div className="overflow-hidden rounded-3xl bg-gray-100 shadow-soft2 ring-1 ring-line">
        <img
          src={img}
          alt={title}
          className="h-[150px] w-full object-cover sm:h-[170px] lg:h-[165px]"
          loading="lazy"
        />
      </div>
      <div className="mt-3 text-[12px] font-semibold text-ink">{title}</div>
    </div>
  );
}

export default function EventsGrid() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[10px] font-extrabold tracking-[0.22em] text-brand-700">
            Let us handle you
          </div>

          <h2 className="mt-4 font-display text-[30px] leading-[1.12] sm:text-[42px] sm:leading-[1.12] font-extrabold tracking-tight text-ink">
            Ready to cater for
            <br />
            your all special events
          </h2>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((e) => (
            <Tile key={e.title} {...e} />
          ))}
        </div>
      </Container>
    </section>
  );
}