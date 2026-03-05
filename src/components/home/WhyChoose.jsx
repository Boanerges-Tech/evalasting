import Container from "../layout/Container";

/**
 * Pixel-tight WhyChoose section (Figma-style)
 * Image path: public/assets/why/chef.jpg  -> /assets/why/chef.jpg
 */

const FEATURES = [
  {
    title: "Fresh Ingredients",
    text: "Only the freshest ingredients are used in our dishes daily",
    icon: "🥕",
  },
  {
    title: "Creative Plating",
    text: "Every meal is beautifully plated,\nshowcasing our culinary art",
    icon: "🍽️",
  },
  {
    title: "Artisan Recipes",
    text: "Each dish is made with our unique,\nhandcrafted artisan recipes",
    icon: "📜",
  },
  {
    title: "Locally Sourced",
    text: "We work with local farmers\nto bring the best ingredients",
    icon: "🌿",
  },
  {
    title: "Sustainable Practices",
    text: "We focus on reducing food waste\nwhile supporting sustainability",
    icon: "♻️",
  },
  {
    title: "Exceptional Service",
    text: "Delivering personalized service for\nan unforgettable dining experience",
    icon: "✨",
  },
];

function FeatureItem({ icon, title, text }) {
  return (
    <div className="flex items-start gap-3">
      {/* icon circle */}
      <div className="mt-0.5 h-8 w-8 shrink-0 rounded-full bg-brand-600/15 ring-1 ring-brand-600/20 grid place-items-center">
        <span className="text-[12px] leading-none">{icon}</span>
      </div>

      <div>
        <div className="text-[13px] font-extrabold text-ink">{title}</div>
        <div className="mt-1 text-[11.5px] leading-[1.45] text-muted whitespace-pre-line">
          {text}
        </div>
      </div>
    </div>
  );
}

export default function WhyChoose() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[10px] font-extrabold tracking-[0.22em] text-brand-700">
            DISCOVER WHAT MAKES US SPECIAL
          </div>

          <h2 className="mt-4 font-display text-[30px] leading-[1.12] sm:text-[44px] sm:leading-[1.12] font-extrabold tracking-tight text-ink">
            Why choose Evaalasting Arm for
            <br />
            your dining expertise
          </h2>
        </div>

        {/* Row: features left, image right */}
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_420px] md:items-center">
          {/* Left: 2 columns list */}
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <FeatureItem
                key={f.title}
                icon={f.icon}
                title={f.title}
                text={f.text}
              />
            ))}
          </div>

          {/* Right image */}
          <div className="lg:justify-self-end">
            <div className="overflow-hidden rounded-[22px] shadow-soft ring-1 ring-line bg-gray-100">
              <img
                src="/assets/why/chef.jpg"
                alt="Chef holding a plate"
                className="h-[300px] w-full object-cover sm:h-[340px] lg:h-[360px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}