import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/useAuth"

const API = "https://evaalasting.othniel-phantasy.com.ng/api"

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
  )
}

export default function AdminProductsShell() {

  const { logout } = useAuth()

  const [products,setProducts] = useState([])
  const [search,setSearch] = useState("")
  const [searchInput,setSearchInput] = useState("")

  useEffect(() => {

    async function loadProducts(){

      const res = await fetch(`${API}/admin/products.php?search=${search}`,{
        credentials:"include"
      })

      const j = await res.json()

      if(j.ok) setProducts(j.products)

    }

    loadProducts()

  },[search])

  async function remove(id){

    if(!confirm("Delete this product?")) return

    await fetch(`${API}/admin/delete-product.php`,{
      method:"POST",
      credentials:"include",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({id})
    })

    setProducts(prev => prev.filter(p => p.id !== id))
  }

  async function toggle(id,active){

    await fetch(`${API}/admin/toggle-product.php`,{
      method:"POST",
      credentials:"include",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({
        id,
        is_active:active?0:1
      })
    })

    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, is_active: active ? 0 : 1 } : p
      )
    )
  }

  return (

  <div className="mx-auto max-w-[1320px] px-3 sm:px-5">

    <div className="grid gap-4 lg:grid-cols-[240px_1fr]">

      {/* Sidebar */}

      <aside className="rounded-[24px] bg-white p-4 shadow-soft2">

        <div className="flex items-center gap-3 px-2 py-3">
          <div className="text-[30px] font-extrabold text-[#7a114e]">🍴</div>
          <div className="font-display text-[34px] leading-none text-[#7a114e]">
            Evaalasting Arm
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <SidebarLink label="Dashboard" to="/admin"/>
          <SidebarLink label="Order Management" to="/admin/orders"/>
          <SidebarLink label="Customers" to="/admin/customers"/>
          <SidebarLink label="Custom Catering" to="/admin/catering"/>
          <SidebarLink label="Sales Report" to="/admin/reports"/>
          <SidebarLink label="Invoice" to="/admin/invoices"/>
          <SidebarLink label="Add Products" to="/admin/add-product"/>
          <SidebarLink label="Products" to="/admin/products" active/>
          <SidebarLink label="Settings" to="/admin/settings"/>
        </div>

      </aside>

      {/* Main Content */}

      <section className="rounded-[24px] bg-[#f6e9df] p-4 shadow-soft2">

        {/* Top Bar */}

        <div className="rounded-2xl bg-white px-4 py-3 shadow-soft2">

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            <div className="text-[18px] font-semibold text-ink">
              Product Management
            </div>

            <div className="flex items-center gap-3">

              <form
                onSubmit={(e)=>{
                  e.preventDefault()
                  setSearch(searchInput)
                }}
                className="flex h-11 min-w-[220px] flex-1 items-center rounded-full bg-[#d8f0cf] px-4 md:min-w-[320px]"
              >

                <input
                  value={searchInput}
                  onChange={(e)=>setSearchInput(e.target.value)}
                  placeholder="Search products"
                  className="w-full bg-transparent text-[12px] outline-none placeholder:text-[#6e7b6f]"
                />

                <button type="submit" className="text-[#4b6d53]">
                  ⌕
                </button>

              </form>

              <button className="rounded-full bg-white px-3 py-2 shadow-soft2">🔔</button>
              <button className="rounded-full bg-white px-3 py-2 shadow-soft2">⚙</button>

              <button className="grid h-10 w-10 place-items-center rounded-full bg-[#0b4f49] text-[11px] font-bold text-white">
                EA
              </button>

            </div>

          </div>

        </div>

        {/* Products Table */}

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-soft2">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[920px] text-left">

              <thead>

                <tr className="bg-[#d8eacb] text-[11px] text-[#395246]">

                  <th className="rounded-l-xl px-4 py-4 font-semibold">Image</th>
                  <th className="px-4 py-4 font-semibold">Product</th>
                  <th className="px-4 py-4 font-semibold">Category</th>
                  <th className="px-4 py-4 font-semibold">Price</th>
                  <th className="px-4 py-4 font-semibold">Rating</th>
                  <th className="px-4 py-4 font-semibold">Status</th>
                  <th className="rounded-r-xl px-4 py-4 font-semibold">Actions</th>

                </tr>

              </thead>

              <tbody>

                {products.map(p => (

                <tr key={p.id} className="border-b border-[#f0ebe4] text-[12px]">

                  <td className="px-4 py-4">

                    <img
                      src={p.image_path}
                      className="h-12 w-12 rounded-lg object-cover"
                    />

                  </td>

                  <td className="px-4 py-4 font-medium text-ink">
                    {p.name}
                  </td>

                  <td className="px-4 py-4 text-ink">
                    {p.category}
                  </td>

                  <td className="px-4 py-4 text-ink">
                    ${p.price}
                  </td>

                  <td className="px-4 py-4 text-ink">
                    {p.rating}
                  </td>

                  <td className="px-4 py-4">

                    <button
                      onClick={()=>toggle(p.id,p.is_active)}
                      className={`px-3 py-1 rounded-md text-white text-[11px]
                      ${p.is_active ? "bg-[#2f9f45]" : "bg-[#777]"}`}
                    >

                      {p.is_active ? "Active" : "Disabled"}

                    </button>

                  </td>

                  <td className="px-4 py-4 flex gap-2">

                    <button className="rounded-lg bg-[#0b4f49] px-3 py-1 text-white text-[11px]">
                      Edit
                    </button>

                    <button
                      onClick={()=>remove(p.id)}
                      className="rounded-lg bg-[#d44343] px-3 py-1 text-white text-[11px]"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

                ))}

                {products.length === 0 && (

                <tr>

                  <td colSpan="7" className="px-4 py-10 text-center text-[12px] text-muted">
                    No products found.
                  </td>

                </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

        <div className="mt-4 flex justify-end">

          <button
            onClick={logout}
            className="rounded-full bg-[#7a114e] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#650d41]"
          >
            Logout
          </button>

        </div>

      </section>

    </div>

  </div>

  )
}