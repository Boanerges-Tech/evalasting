import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../components/home/Hero";
import FeaturedRow from "../components/home/FeaturedRow";
import AboutSplit from "../components/home/AboutSplit";
import MenuGrid from "../components/home/MenuGrid";
import WhyChoose from "../components/home/WhyChoose";
import StatsBand from "../components/home/StatsBand";
import Gallery from "../components/home/Gallery";
import HowToOrder from "../components/home/HowToOrder";
import Testimonials from "../components/home/Testimonials";
import Blog from "../components/home/Blog";
import FAQ from "../components/home/FAQ";
import CTA from "../components/home/CTA";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <AboutSplit />
        <MenuGrid />
        <WhyChoose />
        <StatsBand />
        <Gallery />
        <HowToOrder />
        <Testimonials />
        <Blog />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}