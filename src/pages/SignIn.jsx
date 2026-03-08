import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AuthSignIn from "../components/auth/AuthSignIn";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <AuthSignIn />
      </main>
      <Footer />
    </div>
  );
}