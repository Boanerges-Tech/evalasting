import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import AboutHero from "../components/about/AboutHero";

// reuse existing home sections
import AboutSplit from "../components/about/AboutSplit";
import MenuGrid from "../components/about/EventsGrid";
import WhyChoose from "../components/home/WhyChoose";
import StatsBand from "../components/home/StatsBand";
import Gallery from "../components/home/Gallery";
import FAQ from "../components/home/FAQ";
import CTA from "../components/home/CTA";
import CraftedNote from "../components/about/CraftedNote";
import EventsGrid from "../components/about/EventsGrid";

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <AboutHero />
        <CraftedNote />
        <AboutSplit />
        <EventsGrid />
        <WhyChoose />
        <StatsBand />
        <Gallery />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}