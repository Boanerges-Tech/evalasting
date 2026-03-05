import { useMemo } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import ProductListingHero from "../components/product/ProductListingHero";
import YouMayAlsoLike from "../components/product/YouMayAlsoLike";

import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import CTA from "../components/home/CTA";

// TEMP product data (later you'll replace with API/PHP)
const PRODUCTS = [
  {
    id: "truffle-fries",
    name: "Truffle fries",
    price: "$25.30",
    desc:
      "Crispy golden fries tossed with truffle oil, parmesan, and a touch of herbs — rich, savory, and addictive.",
    img: "/assets/products/truffle-fries.jpg",
    bullets: [
      {
        title: "Explore ingredients",
        text:
          "We source fresh potatoes, truffle oil, parmesan and herbs to create a deep, aromatic flavor you’ll remember.",
      },
      {
        title: "Perfect for savory cravings",
        text:
          "A satisfying bite with crisp texture and umami-rich seasoning — ideal as a side or a snack.",
      },
    ],
  },
  {
    id: "jollof-special",
    name: "Jollof Special",
    price: "₦3,800",
    desc:
      "Smoky party-style jollof rice with premium spices, served with protein and sides.",
    img: "/assets/products/jollof.jpg",
    bullets: [
      { title: "Explore ingredients", text: "Premium rice, tomatoes, spices, and slow-cooked flavor base." },
      { title: "Perfect for savory cravings", text: "Bold, satisfying, and restaurant-quality every time." },
    ],
  },
  {
    id: "seafood-pasta",
    name: "Seafood Pasta",
    price: "₦6,200",
    desc:
      "Creamy pasta loaded with seafood, herbs, and a silky sauce finish.",
    img: "/assets/products/seafood-pasta.jpg",
    bullets: [
      { title: "Explore ingredients", text: "Fresh seafood, herbs, and sauce cooked to a creamy balance." },
      { title: "Perfect for savory cravings", text: "Rich, comforting, and beautifully plated." },
    ],
  },
];

export default function Product() {
  const { id } = useParams();

  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  }, [id]);

  const alsoLike = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  }, [product.id]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <ProductListingHero product={product} />
        <YouMayAlsoLike items={alsoLike} />

        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}