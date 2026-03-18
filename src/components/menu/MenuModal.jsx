import { useState } from "react";
import { useCart } from "../../context/useCart";

export default function MenuModal({ item, onClose }) {
  const { addToCart } = useCart();

  const [qty, setQty] = useState(1);
  const [addons, setAddons] = useState([]);

  if (!item) return null;

  const toggleAddon = (name) => {
    setAddons((prev) =>
      prev.includes(name)
        ? prev.filter((a) => a !== name)
        : [...prev, name]
    );
  };

  const addonOptions = [
    { name: "Extra Jollof Rice + Spicy Fish", price: 12 },
    { name: "Full Tray Jollof Rice + 10pcs Fish", price: 30 },
    { name: "Egg", price: 5 },
    { name: "Salmon", price: 7 },
  ];

  const total =
    (item.price || 0) * qty +
    addons.reduce((acc, a) => {
      const found = addonOptions.find((x) => x.name === a);
      return acc + (found?.price || 0);
    }, 0);

  return (
    <div className="fixed inset-0 z-[200] bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="bg-gray-100 flex items-center justify-center p-6">
          <img
            src={item.img}
            alt={item.name}
            className="w-full max-w-[320px] object-contain"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="p-6 overflow-y-auto max-h-[90vh]">

          <button
            onClick={onClose}
            className="mb-3 text-sm text-muted hover:underline"
          >
            Close
          </button>

          <h2 className="text-xl font-extrabold text-ink">
            {item.name}
          </h2>

          <p className="mt-2 text-sm text-muted">
            A hearty half tray of smoky, authentic jollof rice with premium toppings.
          </p>

          {/* PRICE */}
          <div className="mt-4 text-sm">
            <div>Subtotal: ${item.price}</div>
            <div>Tax (5%): ${(item.price * 0.05).toFixed(2)}</div>
            <div className="font-bold mt-1">Total: ${total.toFixed(2)}</div>
          </div>

          {/* QUANTITY */}
          <div className="mt-5">
            <div className="text-sm font-semibold mb-2">Quantity</div>
            <div className="flex items-center gap-3">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          {/* ADDONS */}
          <div className="mt-6">
            <div className="text-sm font-semibold mb-2">
              Add Nutrition (Optional)
            </div>

            <div className="space-y-2">
              {addonOptions.map((a) => (
                <label
                  key={a.name}
                  className="flex justify-between items-center border p-2 rounded cursor-pointer"
                >
                  <span>{a.name}</span>
                  <input
                    type="checkbox"
                    checked={addons.includes(a.name)}
                    onChange={() => toggleAddon(a.name)}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* SPICE BAR */}
          <div className="mt-6">
            <div className="text-sm mb-1">Pepper Tolerance</div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-[60%] bg-green-400"></div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              addToCart({ ...item, quantity: qty, addons });
              onClose();
            }}
            className="mt-6 w-full bg-brand-600 text-white py-3 rounded-xl font-bold"
          >
            Add to Cart • ${total.toFixed(2)}
          </button>

        </div>
      </div>
    </div>
  );
}