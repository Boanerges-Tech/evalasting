import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-[36px] font-extrabold text-ink">Order Confirmed</h1>
            <p className="mt-4 text-muted">
              Your order has been placed successfully.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}