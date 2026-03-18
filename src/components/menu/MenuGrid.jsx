// src/components/menu/MenuGrid.jsx
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Container from "../layout/Container";
import { useCart } from "../../context/useCart";

const [selectedItem, setSelectedItem] = useState(null);

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

function MenuCard({ item, onOpen }) {
  const { addToCart } = useCart();

  return (
    <div className="group block">
      <div
        onClick={() => onOpen(item)}
        className="cursor-pointer relative overflow-hidden rounded-3xl bg-white shadow-soft2 ring-1 ring-line"
      >
        <img
          src={item.img || "/assets/menu/placeholder.jpg"}
          alt={item.name}
          className="h-[175px] w-full object-cover"
        />

        <div className="absolute bottom-3 left-3">
          <span className="bg-ink text-white px-3 py-1 text-xs rounded-full">
            ${item.price}
          </span>
        </div>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <div className="text-[13px] font-extrabold">{item.name}</div>

        <button
          onClick={() => addToCart(item)}
          className="h-8 w-8 rounded-full bg-brand-600 text-white"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function MenuGrid() {
  const [active, setActive] = useState("All");
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://evaalasting.othniel-phantasy.com.ng/api/products.php",
          { credentials: "include" }
        );
        const json = await res.json();
        if (json.ok) {
          setItems(json.products);
          const cats = Array.from(new Set(json.products.map((p) => p.tag || "Other")));
          setCategories(["All", ...cats]);
        } else {
          console.error("Failed to fetch products:", json.message);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    if (active === "All") return items;
    return items.filter((x) => x.tag === active);
  }, [active, items]);

  return (
    <section id="menu" className="py-12 sm:py-16">
      <Container>
        <div className="text-center mx-auto max-w-2xl">
          <div className="text-[12px] font-extrabold tracking-wide text-brand-700">
            TASTY AND BEST FOOD
          </div>
          <h2 className="mt-3 font-display text-[28px] leading-[1.15] sm:text-[34px] sm:leading-[1.15] font-extrabold tracking-tight text-ink">
            Discover the perfect
            <br className="hidden sm:block" />
            meal for every taste
          </h2>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((f) => (
              <FilterPill key={f} active={active === f} onClick={() => setActive(f)}>
                {f}
              </FilterPill>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-[220px] w-full animate-pulse rounded-3xl bg-gray-200"
                />
              ))
            : filtered.map((item) => <MenuCard key={item.id} item={item} />)}
        </div>
      </Container>
    </section>
  );
}