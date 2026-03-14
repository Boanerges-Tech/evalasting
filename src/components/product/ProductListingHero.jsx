// src/components/product/ProductListingHero.jsx
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Container from "../layout/Container";
import { useCart } from "../../context/useCart";

export default function ProductListingHero() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Toast state
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (product) return;

    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://evaalasting.othniel-phantasy.com.ng/api/products.php?id=${id}`,
          { credentials: "include" }
        );
        const json = await res.json();

        if (json.ok && json.product) {
          const p = json.product;
          setProduct({
            id: p.id,
            name: p.name,
            img: p.img || p.image_path || "/assets/menu/placeholder.jpg",
            price: parseFloat(p.price) || 0,
            desc: p.desc || p.description || "",
            tag: p.tag || p.category || "Other",
            fav: p.fav || false,
            bullets: p.bullets || [],
          });
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to fetch product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id, product]);

  if (loading) {
    return (
      <Container>
        <div className="text-center py-20 text-muted font-bold">
          Loading product...
        </div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <div className="text-center py-20 text-red-500 font-bold">
          {error || "Product not found"}
        </div>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setToast(`${product.name} added to cart!`);
    setTimeout(() => setToast(""), 2500); // hide after 2.5s
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 pb-10">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 bg-brand-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-slide-in">
          {toast}
        </div>
      )}

      <div className="pointer-events-none absolute -left-44 top-16 h-[520px] w-[520px] rounded-full bg-brand-600/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-260px] top-24 h-[560px] w-[560px] rounded-full bg-amber-200/20 blur-3xl" />

      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left: image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] rounded-full overflow-hidden bg-gray-100 shadow-soft2 ring-1 ring-line">
              <img
                src={product.img}
                alt={product.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: info */}
          <div className="max-w-xl">
            <h1 className="font-display text-[32px] leading-[1.12] sm:text-[48px] sm:leading-[1.05] font-extrabold tracking-tight text-ink">
              {product.name}
            </h1>
            <p className="mt-4 text-[13px] sm:text-[14px] leading-relaxed text-muted max-w-[520px]">
              {product.desc}
            </p>

            {/* Quantity selector */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-[14px] font-semibold">Quantity:</span>
              <div className="flex items-center border rounded">
                <button
                  onClick={decrement}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={increment}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="text-[14px] font-extrabold text-ink">
                ${ (product.price * quantity).toFixed(2) }
              </div>

              <button
                onClick={handleAddToCart}
                className="rounded-full bg-brand-600 px-6 py-2.5 text-[12px] font-extrabold text-white shadow-soft hover:bg-brand-700 transition"
              >
                Add to cart
              </button>

              <button
                onClick={handleBuyNow}
                className="rounded-full bg-amber-500 px-6 py-2.5 text-[12px] font-extrabold text-white shadow-soft hover:bg-amber-600 transition"
              >
                Buy Now
              </button>
            </div>

            <div className="mt-2 text-[12px] font-semibold text-brand-600 uppercase">
              Category: {product.tag}
            </div>
          </div>
        </div>

        {product.bullets && product.bullets.length > 0 && (
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {product.bullets.map((b, idx) => (
              <div key={idx}>
                <div className="text-[12px] font-extrabold text-ink">{b.title}</div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted max-w-[520px]">
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}