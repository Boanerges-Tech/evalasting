import { useState } from "react";

const API = "https://evaalasting.othniel-phantasy.com.ng/api";

export default function ForgotPassword(){

const [email,setEmail]=useState("");
const [loading,setLoading]=useState(false);
const [msg,setMsg]=useState("");

async function submit(e){
e.preventDefault();

setLoading(true);

try{

const res = await fetch(`${API}/auth/forgot-password.php`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({email})
});

const j = await res.json();

setMsg(j.message);

} catch (err) {
  console.error(err); // This "uses" the variable and clears the error
  setMsg("Something went wrong");
}

setLoading(false);
}

return(

<div className="min-h-screen flex items-center justify-center bg-[#f7f7f7] px-4">

<div className="bg-white p-6 rounded-2xl w-full max-w-md shadow">

<h2 className="text-2xl font-bold mb-2">
Forgot your password?
</h2>

<p className="text-sm text-gray-500 mb-4">
Enter your email to receive reset link
</p>

<form onSubmit={submit} className="space-y-4">

<input
type="email"
placeholder="Email address"
value={email}
onChange={e=>setEmail(e.target.value)}
required
className="w-full border p-3 rounded"
/>

<button
disabled={loading}
className="w-full bg-orange-500 text-white py-3 rounded"
>

{loading ? "Sending..." : "Send reset link"}

</button>

</form>

{msg && (
<p className="mt-4 text-sm text-center text-green-600">
{msg}
</p>
)}

</div>

</div>

)
}