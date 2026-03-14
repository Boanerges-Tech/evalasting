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

export default function AdminSettingsShell() {

  const { logout } = useAuth()

  const [data, setData] = useState({
    site_name: "",
    email: "",
    phone: "",
    delivery_fee: "",
    restaurant_hours: "",

    stripe_public_key: "",
    stripe_secret_key: "",
    stripe_enabled: 0,

    paystack_public_key: "",
    paystack_secret_key: "",
    paystack_enabled: 0,

    manual_enabled: 0,
    manual_payment_instructions: ""
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function loadSettings() {

      try {

        const res = await fetch(`${API}/admin/settings.php`, {
          credentials: "include"
        })

        const text = await res.text()

        let json

        try {
          json = JSON.parse(text)
        } catch {
          console.error("Invalid JSON:", text)
          alert("Server returned invalid response.")
          return
        }

        if (res.ok && json.ok) {
          setData(prev => ({ ...prev, ...json.settings }))
        }

      } catch (err) {
        console.error(err)
      }

      setLoading(false)

    }

    loadSettings()

  }, [])

  async function save() {

    try {

      const res = await fetch(`${API}/admin/update-settings.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const text = await res.text()

      let json

      try {
        json = JSON.parse(text)
      } catch {
        console.error("Invalid JSON:", text)
        alert("Server error")
        return
      }

      alert(json.message || "Settings updated")

    } catch (err) {
      console.error(err)
      alert("Failed to save settings")
    }

  }

  function update(field, value) {
    setData(prev => ({ ...prev, [field]: value }))
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
<SidebarLink label="Products" to="/admin/products"/>
<SidebarLink label="Settings" to="/admin/settings" active/>
</div>

</aside>

{/* Main */}

<section className="rounded-[24px] bg-[#f6e9df] p-4 shadow-soft2">

{/* Header */}

<div className="rounded-2xl bg-white px-4 py-3 shadow-soft2 flex justify-between">
<div className="text-[18px] font-semibold text-ink">
Admin Settings
</div>
</div>

{/* Form */}

<div className="mt-4 rounded-2xl bg-white p-6 shadow-soft2">

{loading ? (
<div className="text-[12px] text-muted">
Loading settings...
</div>
) : (

<div className="grid gap-8 max-w-[700px]">

{/* GENERAL SETTINGS */}

<div>

<div className="font-semibold text-[14px] mb-3">
General Settings
</div>

<div className="grid gap-4">

<input
placeholder="Site Name"
value={data.site_name}
onChange={e=>update("site_name",e.target.value)}
className="border border-[#eadfd2] p-3 rounded-lg text-[12px]"
/>

<input
placeholder="Email"
value={data.email}
onChange={e=>update("email",e.target.value)}
className="border border-[#eadfd2] p-3 rounded-lg text-[12px]"
/>

<input
placeholder="Phone"
value={data.phone}
onChange={e=>update("phone",e.target.value)}
className="border border-[#eadfd2] p-3 rounded-lg text-[12px]"
/>

<input
placeholder="Delivery Fee"
value={data.delivery_fee}
onChange={e=>update("delivery_fee",e.target.value)}
className="border border-[#eadfd2] p-3 rounded-lg text-[12px]"
/>

<input
placeholder="Restaurant Hours"
value={data.restaurant_hours}
onChange={e=>update("restaurant_hours",e.target.value)}
className="border border-[#eadfd2] p-3 rounded-lg text-[12px]"
/>

</div>

</div>

{/* STRIPE */}

<div>

<div className="font-semibold text-[14px] mb-3">
Stripe Payment Gateway
</div>

<label className="flex gap-2 text-[12px] mb-3">
<input
type="checkbox"
checked={data.stripe_enabled==1}
onChange={e=>update("stripe_enabled",e.target.checked?1:0)}
/>
Enable Stripe
</label>

<input
placeholder="Stripe Public Key"
value={data.stripe_public_key}
onChange={e=>update("stripe_public_key",e.target.value)}
className="border border-[#eadfd2] p-3 rounded-lg text-[12px] w-full mb-3"
/>

<input
placeholder="Stripe Secret Key"
value={data.stripe_secret_key}
onChange={e=>update("stripe_secret_key",e.target.value)}
className="border border-[#eadfd2] p-3 rounded-lg text-[12px] w-full"
/>

</div>

{/* PAYSTACK */}

<div>

<div className="font-semibold text-[14px] mb-3">
Paystack Payment Gateway
</div>

<label className="flex gap-2 text-[12px] mb-3">
<input
type="checkbox"
checked={data.paystack_enabled==1}
onChange={e=>update("paystack_enabled",e.target.checked?1:0)}
/>
Enable Paystack
</label>

<input
placeholder="Paystack Public Key"
value={data.paystack_public_key}
onChange={e=>update("paystack_public_key",e.target.value)}
className="border border-[#eadfd2] p-3 rounded-lg text-[12px] w-full mb-3"
/>

<input
placeholder="Paystack Secret Key"
value={data.paystack_secret_key}
onChange={e=>update("paystack_secret_key",e.target.value)}
className="border border-[#eadfd2] p-3 rounded-lg text-[12px] w-full"
/>

</div>

{/* MANUAL PAYMENT */}

<div>

<div className="font-semibold text-[14px] mb-3">
Manual Payment (Bank Transfer / Cash)
</div>

<label className="flex gap-2 text-[12px] mb-3">
<input
type="checkbox"
checked={data.manual_enabled==1}
onChange={e=>update("manual_enabled",e.target.checked?1:0)}
/>
Enable Manual Payment
</label>

<textarea
placeholder="Payment Instructions (Bank details etc)"
value={data.manual_payment_instructions}
onChange={e=>update("manual_payment_instructions",e.target.value)}
className="border border-[#eadfd2] p-3 rounded-lg text-[12px] w-full"
/>

</div>

<button
onClick={save}
className="rounded-xl bg-[#0b4f49] py-3 text-[12px] font-semibold text-white hover:bg-[#083c37]"
>
Save Settings
</button>

</div>

)}

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