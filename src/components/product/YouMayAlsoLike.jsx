import { Link } from "react-router-dom";
import Container from "../layout/Container";

/**
 * Figma: small row of 4 products under the text blocks
 */

function Badge({ children }) {
  return (
    <span className="absolute left-3 top-3 rounded-full bg-brand-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-soft">
      {children}
    </span>
  );
}

function SmallCard({ item }) {
  return (
    <Link
      to={`/product/${item.id}`}
      className="group relative overflow-hidden rounded-2xl border border-line bg-white shadow-soft2 hover:shadow-soft transition"
    >
      <div className="aspect-[4/3] bg-gray-100">
        <img
          src={item.img}
          alt={item.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <Badge>New</Badge>

      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="text-[12px] font-extrabold text-ink group-hover:text-brand-700 transition">
            {item.name}
          </div>
          <div className="text-[12px] font-extrabold text-ink">{item.price}</div>
        </div>
      </div>
    </Link>
  );
}

export default function YouMayAlsoLike({ items }) {
  return (
    <section className="pb-12">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((x) => (
            <SmallCard key={x.id} item={x} />
          ))}
        </div>
      </Container>
    </section>
  );
}