import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const values = [
  {
    title: "Clean Beauty",
    description: "We believe in clean, safe ingredients that are good for you and the planet.",
    icon: "🌿",
  },
  {
    title: "Innovation",
    description: "Constantly pushing boundaries to bring you the latest in beauty technology.",
    icon: "✨",
  },
  {
    title: "Sustainability",
    description: "Committed to eco-friendly practices and sustainable packaging solutions.",
    icon: "🌍",
  },
  {
    title: "Inclusivity",
    description: "Beauty is for everyone. We create products for all skin types and tones.",
    icon: "💫",
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container px-4 lg:px-8">
            <div className="text-center animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
              <span className="text-accent font-medium text-sm tracking-widest uppercase mb-3 block">
                Our Story
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mb-4">
                About LUMÉRA
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Born from a passion for beauty and a commitment to excellence, we're here to illuminate your natural radiance.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 lg:py-32">
          <div className="container px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg dark:prose-invert mx-auto">
                <div className="animate-fade-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                  <h2 className="font-display text-3xl font-semibold text-foreground mb-6">
                    Our Journey
                  </h2>
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                    LUMÉRA was founded with a simple yet powerful vision: to create beauty products that enhance your natural glow while respecting your skin and the environment. What started as a small passion project has grown into a trusted brand loved by beauty enthusiasts worldwide.
                  </p>
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                    We believe that beauty should be accessible, sustainable, and empowering. Every product we create is carefully formulated with clean ingredients, tested for effectiveness, and designed to make you feel confident in your own skin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 lg:px-8">
            <div className="text-center mb-16 animate-fade-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="text-center animate-fade-up opacity-0"
                  style={{ animationDelay: `${300 + index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 lg:py-32">
          <div className="container px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center animate-fade-up opacity-0" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                To empower individuals to express their unique beauty through high-quality, sustainable products that celebrate diversity and promote self-confidence. We're not just selling beauty products—we're building a community that believes in the power of self-care and authentic expression.
              </p>
              <Button variant="hero" size="lg">
                Shop Our Products
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
