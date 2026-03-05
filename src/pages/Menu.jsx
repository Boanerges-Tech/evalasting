import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import MenuHero from "../components/menu/MenuHero";

import MenuGrid from "../components/home/MenuGrid";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import CTA from "../components/home/CTA";

export default function Menu() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <MenuHero />
        <MenuGrid />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}