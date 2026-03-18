import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [hydrated, setHydrated] = useState(false); // 👈 important

  // LOAD CART
  useEffect(() => {
    fetch("https://evaalasting.othniel-phantasy.com.ng/api/cart/get.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.cart) setCart(data.cart);
        setHydrated(true); // ✅ mark as loaded
      })
      .catch(() => setHydrated(true));
  }, []);

  // SAVE CART (only AFTER load)
  useEffect(() => {
    if (!hydrated) return;

    fetch("https://evaalasting.othniel-phantasy.com.ng/api/cart/save.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });
  }, [cart, hydrated]);

  const addToCart = (item) => {
  setCart((prev) => {
    const existingIndex = prev.findIndex(
      (p) =>
        p.id === item.id &&
        JSON.stringify(p.addons) === JSON.stringify(item.addons) &&
        p.spice === item.spice
    );

    if (existingIndex !== -1) {
      // ✅ UPDATE (replace quantity)
      return prev.map((p, i) =>
        i === existingIndex
          ? { ...p, quantity: p.quantity + item.quantity }
          : p
      );
    }

    return [...prev, item];
  });
};

const removeFromCart = (index) => {
  setCart((prev) => prev.filter((_, i) => i !== index));
};

const updateQuantity = (index, qty) => {
  if (qty < 1) return;
  setCart((prev) =>
    prev.map((item, i) =>
      i === index ? { ...item, quantity: qty } : item
    )
  );
};

  return (
    <CartContext.Provider
  value={{
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
  }}
>
      {children}
    </CartContext.Provider>
  );
}