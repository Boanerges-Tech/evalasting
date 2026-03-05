import Container from "../layout/Container";

/**
 * Figma target:
 * - Small orange label centered on top
 * - Big serif heading (2 lines)
 * - Left: 2 columns of 3 feature bullets (icon + title + small text)
 * - Right: rounded image card (tall-ish) with chef photo
 *
 * Put image here:
 * public/assets/why/chef.jpg
 * and it will load from: /assets/why/chef.jpg
 */

const FEATURES = [
  {
    title: "Fresh Ingredients",
    text: "Only the freshest ingredients are used in our dishes daily",
    icon: "🥕",
  },
  {
    title: "Creative Plating",
    text: "Every meal is beautifully plated, showcasing our culinary art",
    icon: "🍽️",
  },
  {
    title: "Artisan Recipes",
    text: "Each dish is made with our unique, handcrafted artisan recipes",
    icon: "📜",
  },
  {
    title: "Locally Sourced",
    text: "We work with local farmers to bring the best ingredients",
    icon: "🌿",
  },
  {
    title: "Sustainable Practices",
    text: "We focus on reducing food waste while supporting sustainability",
    icon: "♻️",
  },
  {
    title: "Exceptional Service",
    text: "Delivering personalized service for an unforgettable dining experience",
    icon: "✨",
  },
];

function FeatureItem({ icon, title, text }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 h-9 w-9 shrink-0 rounded-full bg-brand-600/15 ring-1 ring-brand-600/25 grid place-items-center">
        <span className="text-[13px]">{icon}</span>
      </div>

      <div>
        <div className="text-[13px] font-extrabold text-ink">{title}</div>
        <div className="mt-1 text-[12px] leading-relaxed text-muted max-w-[240px]">
          {text}
        </div>
      </div>
    </div>
  );
}

export default function WhyChoose() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        {/* Top heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-[11px] font-extrabold tracking-[0.18em] text-brand-700">
            DISCOVER WHAT MAKES US SPECIAL
          </div>

          <h2 className="mt-3 font-display text-[28px] leading-[1.12] sm:text-[40px] sm:leading-[1.12] font-extrabold tracking-tight text-ink">
            Why choose Evaalasting Arm for
            <br className="hidden sm:block" />
            your dining expertise
          </h2>
        </div>

        {/* Content: features + image */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          {/* Left: 2 columns feature list */}
          <div className="grid gap-y-8 gap-x-10 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <FeatureItem
                key={f.title}
                icon={f.icon}
                title={f.title}
                text={f.text}
              />
            ))}
          </div>

          {/* Right: image */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-soft ring-1 ring-line bg-gray-100">
              <img
                src="/assets/why/chef.jpg"
                alt="Chef"
                className="h-[360px] w-full object-cover sm:h-[420px] lg:h-[460px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}