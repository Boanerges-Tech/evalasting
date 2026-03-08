import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AuthSignUp from "../components/auth/AuthSignUp";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <AuthSignUp />
      </main>
      <Footer />
    </div>
  );
}