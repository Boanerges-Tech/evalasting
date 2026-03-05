import { useMemo, useState } from "react";
import Container from "../layout/Container";

/**
 * Figma-like Menu Section:
 * - Centered serif heading
 * - Small pill filters under heading
 * - Card style: tall image, price bottom-left, small orange circular + button bottom-right
 * - Minimal text (name under image)
 * - Grid: 2 cols mobile, 3 cols md, 4 cols lg
 *
 * Put images in: public/assets/menu/
 * Example names used below: item-1.jpg ... item-12.jpg
 */

const ITEMS = [
  { id: 1, name: "Jollof Rice", price: "$35", tag: "All", img: "/assets/menu/item-1.jpg", fav: true },
  { id: 2, name: "Fried Rice", price: "$40", tag: "Dinner", img: "/assets/menu/item-2.jpg" },
  { id: 3, name: "Chicken Pasta", price: "$55", tag: "Lunch", img: "/assets/menu/item-3.jpg" },
  { id: 4, name: "Curry & Rice", price: "$50", tag: "Appetizer", img: "/assets/menu/item-4.jpg" },
  { id: 5, name: "Saucy Chicken", price: "$45", tag: "Lunch", img: "/assets/menu/item-5.jpg" },
  { id: 6, name: "Grilled Fish", price: "$35", tag: "Dinner", img: "/assets/menu/item-6.jpg" },
  { id: 7, name: "Chicken Salad", price: "$54", tag: "Appetizer", img: "/assets/menu/item-7.jpg" },
  { id: 8, name: "Egg & Salad", price: "$14", tag: "Breakfast", img: "/assets/menu/item-8.jpg" },
  { id: 9, name: "Cheese Pizza", price: "$40", tag: "Dinner", img: "/assets/menu/item-9.jpg" },
  { id: 10, name: "Roasted Potatoes", price: "$35", tag: "Lunch", img: "/assets/menu/item-10.jpg" },
  { id: 11, name: "Rice & Beef", price: "$60", tag: "Dinner", img: "/assets/menu/item-11.jpg" },
  { id: 12, name: "Chicken Burger", price: "$45", tag: "Breakfast", img: "/assets/menu/item-12.jpg" },
];

const FILTERS = ["All", "Breakfast", "Lunch", "Dinner", "Appetizer"];

function FilterPill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-[12px] font-extrabold transition",
        active
          ? "bg-brand-600 text-white shadow-soft"
          : "bg-white text-ink/70 ring-1 ring-line hover:text-ink hover:bg-gray-50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function MenuCard({ item }) {
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-soft2 ring-1 ring-line">
        {/* image */}
        <div className="relative">
          <img
            src={item.img}
            alt={item.name}
            className="h-[175px] w-full object-cover sm:h-[190px] lg:h-[205px]"
            loading="lazy"
          />

          {/* heart / favorite (top-right) */}
          <button
            type="button"
            aria-label="Favorite"
            className="absolute right-3 top-3 h-9 w-9 rounded-full bg-white/90 ring-1 ring-line grid place-items-center shadow-soft2 hover:bg-white"
          >
            <span className="text-[14px]">{item.fav ? "♥" : "♡"}</span>
          </button>
        </div>

        {/* price bottom-left + plus bottom-right */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="rounded-full bg-ink px-3 py-1.5 text-[12px] font-extrabold text-white shadow-soft">
            {item.price}
          </span>
        </div>

        <button
          type="button"
          aria-label="Add"
          className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-brand-600 text-white shadow-soft grid place-items-center hover:bg-brand-700 transition"
        >
          +
        </button>
      </div>

      {/* name under card (minimal) */}
      <div className="mt-3 text-[13px] font-extrabold text-ink text-center sm:text-left">
        {item.name}
      </div>
    </article>
  );
}

export default function MenuGrid() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return ITEMS;
    return ITEMS.filter((x) => x.tag === active);
  }, [active]);

  return (
    <section id="menu" className="py-12 sm:py-16">
      <Container>
        {/* heading */}
        <div className="text-center mx-auto max-w-2xl">
          <div className="text-[12px] font-extrabold tracking-wide text-brand-700">
            TASTY AND BEST FOOD
          </div>

          <h2 className="mt-3 font-display text-[28px] leading-[1.15] sm:text-[34px] sm:leading-[1.15] font-extrabold tracking-tight text-ink">
            Discover the perfect
            <br className="hidden sm:block" />
            meal for every taste
          </h2>

          {/* filters */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {FILTERS.map((f) => (
              <FilterPill key={f} active={active === f} onClick={() => setActive(f)}>
                {f}
              </FilterPill>
            ))}
          </div>
        </div>

        {/* grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}