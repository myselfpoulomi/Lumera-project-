import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import productSerum from "@/assets/product-serum.jpg";
import productLipstick from "@/assets/product-lipstick.jpg";
import productFoundation from "@/assets/product-foundation.jpg";

const collections = [
  {
    name: "Glow Collection",
    description: "Illuminate your natural beauty with our signature glow collection",
    image: productSerum,
    products: 8,
  },
  {
    name: "Matte Essentials",
    description: "Perfect matte finishes for a sophisticated look",
    image: productLipstick,
    products: 6,
  },
  {
    name: "Radiance Set",
    description: "Complete your routine with our award-winning radiance products",
    image: productFoundation,
    products: 5,
  },
  {
    name: "Night Care",
    description: "Restorative nighttime skincare for waking up refreshed",
    image: productSerum,
    products: 7,
  },
  {
    name: "Bold Colors",
    description: "Make a statement with vibrant, long-lasting colors",
    image: productLipstick,
    products: 9,
  },
  {
    name: "Natural Beauty",
    description: "Enhance your features with our natural finish collection",
    image: productFoundation,
    products: 6,
  },
];

const Collections = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container px-4 lg:px-8">
            <div className="text-center animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
              <span className="text-accent font-medium text-sm tracking-widest uppercase mb-3 block">
                Curated Collections
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mb-4">
                Discover Your Perfect Set
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Explore our carefully curated collections, each designed to help you achieve your beauty goals with perfectly matched products.
              </p>
            </div>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-20 lg:py-32">
          <div className="container px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {collections.map((collection, index) => (
                <div
                  key={collection.name}
                  className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 animate-fade-up opacity-0"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
                    
                    {/* Collection Info Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3 className="font-display text-2xl font-semibold text-white mb-2">
                        {collection.name}
                      </h3>
                      <p className="text-white/90 mb-4 text-sm">
                        {collection.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 text-sm">
                          {collection.products} Products
                        </span>
                        <Button variant="glossy" size="sm">
                          Explore
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center animate-fade-up opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Our beauty experts are here to help you create a personalized collection tailored to your needs.
              </p>
              <Button variant="hero" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
