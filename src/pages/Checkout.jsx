import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CTA from "../components/home/CTA";
import CheckoutStepOne from "../components/checkout/CheckoutStepOne";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <CheckoutStepOne />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}