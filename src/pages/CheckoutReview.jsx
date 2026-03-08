import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CTA from "../components/home/CTA";
import CheckoutStepThree from "../components/checkout/CheckoutStepThree";

export default function CheckoutReview() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <CheckoutStepThree />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}