import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ForgotPasswordShell from "../components/auth/ForgotPasswordShell";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <ForgotPasswordShell />

      </main>
      <Footer />
    </div>
  );
}