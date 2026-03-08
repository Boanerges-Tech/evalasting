import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CTA from "../components/home/CTA";
import ReservationForm from "../components/reservation/ReservationForm";

export default function Reservations() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <ReservationForm />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}