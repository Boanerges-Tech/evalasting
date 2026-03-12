import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const API_BASE = "https://evaalasting.othniel-phantasy.com.ng/api";

function SidebarLink({ label, to = "#", active = false }) {
  return (
    <Link
      to={to}
      className={[
        "flex items-center gap-3 rounded-lg px-3 py-2 text-[12px] font-medium transition",
        active
          ? "bg-[#7a114e] text-white"
          : "text-[#5f5b57] hover:bg-[#f3ece4]",
      ].join(" ")}
    >
      <span className="grid h-5 w-5 place-items-center rounded-md bg-black/5 text-[10px]">
        ◫
      </span>
      <span>{label}</span>
    </Link>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={[
        "h-11 w-full rounded-xl border border-[#eadfd2] bg-[#faf7f2] px-4 text-[12px] text-ink outline-none placeholder:text-[#8f8880]",
        className,
      ].join(" ")}
    />
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className="w-full rounded-xl border border-[#eadfd2] bg-[#faf7f2] px-4 py-3 text-[12px] text-ink outline-none placeholder:text-[#8f8880]"
    />
  );
}

function Select(props) {
  return (
    <select
      {...props}
      className="h-11 w-full rounded-xl border border-[#eadfd2] bg-[#faf7f2] px-4 text-[12px] text-ink outline-none"
    >
      {props.children}
    </select>
  );
}

export default function AdminAddProductShell() {
  const { logout } = useAuth();

  const [form, setForm] = useState({
    name: "",
    category: "Main Course",
    price: "",
    description: "",
    rating: "4.5",
    is_featured: true,
    is_active: true,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  function updateField(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setError("");

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("category", form.category);
      fd.append("price", form.price);
      fd.append("description", form.description);
      fd.append("rating", form.rating);
      fd.append("is_featured", form.is_featured ? "1" : "0");
      fd.append("is_active", form.is_active ? "1" : "0");
      if (image) fd.append("image", image);

      const res = await fetch(`${API_BASE}/admin/add-product.php`, {
        method: "POST",
        credentials: "include",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to add product.");
      }

      setMsg(data.message || "Product added successfully.");
      setForm({
        name: "",
        category: "Main Course",
        price: "",
        description: "",
        rating: "4.5",
        is_featured: true,
        is_active: true,
      });
      setImage(null);
      setPreview("");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1320px] px-3 sm:px-5">
      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-[24px] bg-white p-4 shadow-soft2">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="text-[30px] font-extrabold text-[#7a114e]">🍴</div>
            <div className="font-display text-[34px] leading-none text-[#7a114e]">
              Evaalasting Arm
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <SidebarLink label="Dashboard" to="/admin" />
            <SidebarLink label="Order Management" to="/admin/orders" />
            <SidebarLink label="Customers" to="/admin/customers" />
            <SidebarLink label="Custom Catering" to="/admin/catering" />
            <SidebarLink label="Sales Report" to="/admin/reports" />
            <SidebarLink label="Invoice" to="/admin/invoices" />
            <SidebarLink label="Add Products" to="/admin/add-product" active />
            <SidebarLink label="Products" to="/admin/products" />
            <SidebarLink label="Settings" to="/admin/settings" />
          </div>
        </aside>

        <section className="rounded-[24px] bg-[#f6e9df] p-4 shadow-soft2">
          <div className="rounded-2xl bg-white px-4 py-3 shadow-soft2">
            <div className="flex items-center justify-between gap-4">
              <div className="text-[18px] font-semibold text-ink">
                Add Product
              </div>

              <button
                onClick={logout}
                className="rounded-full bg-[#7a114e] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#650d41]"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-white p-5 shadow-soft2">
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[12px] font-semibold text-ink">
                    Product Name
                  </label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    placeholder="e.g. Grilled Herb Chicken"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[12px] font-semibold text-ink">
                    Category
                  </label>
                  <Select
                    name="category"
                    value={form.category}
                    onChange={updateField}
                  >
                    <option>Main Course</option>
                    <option>Dessert</option>
                    <option>Appetizer</option>
                    <option>Salad</option>
                    <option>Soup</option>
                    <option>Drinks</option>
                  </Select>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[12px] font-semibold text-ink">
                    Price
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    value={form.price}
                    onChange={updateField}
                    placeholder="29.99"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[12px] font-semibold text-ink">
                    Rating
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="rating"
                    value={form.rating}
                    onChange={updateField}
                    placeholder="4.5"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[12px] font-semibold text-ink">
                  Description
                </label>
                <Textarea
                  rows="5"
                  name="description"
                  value={form.description}
                  onChange={updateField}
                  placeholder="Write product description..."
                />
              </div>

              <div>
                <label className="mb-2 block text-[12px] font-semibold text-ink">
                  Product Image
                </label>
                <Input type="file" accept="image/*" onChange={handleImage} />
                {preview ? (
                  <div className="mt-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-40 w-40 rounded-2xl object-cover border border-[#eadfd2]"
                    />
                  </div>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 text-[12px] text-ink">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={form.is_featured}
                    onChange={updateField}
                    className="accent-[#7a114e]"
                  />
                  <span>Featured Product</span>
                </label>

                <label className="flex items-center gap-2 text-[12px] text-ink">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={form.is_active}
                    onChange={updateField}
                    className="accent-[#7a114e]"
                  />
                  <span>Active</span>
                </label>
              </div>

              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
                  {error}
                </div>
              ) : null}

              {msg ? (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[12px] text-green-700">
                  {msg}
                </div>
              ) : null}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-[#0b4f49] px-6 py-3 text-[13px] font-semibold text-white hover:bg-[#083d39] disabled:opacity-70"
                >
                  {loading ? "Saving..." : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}