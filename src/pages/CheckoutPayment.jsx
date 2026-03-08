import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CTA from "../components/home/CTA";
import CheckoutStepTwo from "../components/checkout/CheckoutStepTwo";

export default function CheckoutPayment() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <CheckoutStepTwo />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}