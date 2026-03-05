import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../layout/Container";

/**
 * Updated MenuGrid (Product Menu Grid)
 * ✅ Matches the Figma card style you already have
 * ✅ Clicking a product opens the Product Listing page: /product/:id
 * ✅ Uses slug-like ids (safe for URLs)
 *
 * Put images in: public/assets/menu/
 * Example names used below: item-1.jpg ... item-12.jpg
 */

const ITEMS = [
  { id: "jollof-rice", name: "Jollof Rice", price: "$35", tag: "Dinner", img: "/assets/menu/item-1.jpg", fav: true },
  { id: "fried-rice", name: "Fried Rice", price: "$40", tag: "Dinner", img: "/assets/menu/item-2.jpg" },
  { id: "chicken-pasta", name: "Chicken Pasta", price: "$55", tag: "Lunch", img: "/assets/menu/item-3.jpg" },
  { id: "curry-and-rice", name: "Curry & Rice", price: "$50", tag: "Appetizer", img: "/assets/menu/item-4.jpg" },
  { id: "saucy-chicken", name: "Saucy Chicken", price: "$45", tag: "Lunch", img: "/assets/menu/item-5.jpg" },
  { id: "grilled-fish", name: "Grilled Fish", price: "$35", tag: "Dinner", img: "/assets/menu/item-6.jpg" },
  { id: "chicken-salad", name: "Chicken Salad", price: "$54", tag: "Appetizer", img: "/assets/menu/item-7.jpg" },
  { id: "egg-and-salad", name: "Egg & Salad", price: "$14", tag: "Breakfast", img: "/assets/menu/item-8.jpg" },
  { id: "cheese-pizza", name: "Cheese Pizza", price: "$40", tag: "Dinner", img: "/assets/menu/item-9.jpg" },
  { id: "roasted-potatoes", name: "Roasted Potatoes", price: "$35", tag: "Lunch", img: "/assets/menu/item-10.jpg" },
  { id: "rice-and-beef", name: "Rice & Beef", price: "$60", tag: "Dinner", img: "/assets/menu/item-11.jpg" },
  { id: "chicken-burger", name: "Chicken Burger", price: "$45", tag: "Breakfast", img: "/assets/menu/item-12.jpg" },
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

/**
 * A helper to prevent clicks on inner buttons (fav/plus) from triggering navigation.
 * Because the whole card is a <Link>.
 */
function stopLink(e) {
  e.preventDefault();
  e.stopPropagation();
}

function MenuCard({ item }) {
  return (
    <Link to={`/product/${item.id}`} className="group block">
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
            onClick={stopLink}
            className="absolute right-3 top-3 h-9 w-9 rounded-full bg-white/90 ring-1 ring-line grid place-items-center shadow-soft2 hover:bg-white"
            title="Favorite"
          >
            <span className="text-[14px]">{item.fav ? "♥" : "♡"}</span>
          </button>
        </div>

        {/* price bottom-left */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="rounded-full bg-ink px-3 py-1.5 text-[12px] font-extrabold text-white shadow-soft">
            {item.price}
          </span>
        </div>

        {/* plus bottom-right (still navigates by default, but we stop it to behave like add) */}
        <button
          type="button"
          aria-label="Add"
          onClick={stopLink}
          className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-brand-600 text-white shadow-soft grid place-items-center hover:bg-brand-700 transition"
          title="Add to cart"
        >
          +
        </button>
      </div>

      {/* name under card (minimal) */}
      <div className="mt-3 text-[13px] font-extrabold text-ink text-center sm:text-left">
        {item.name}
      </div>
    </Link>
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

// Optional: export ITEMS for Product page reuse later
export { ITEMS };