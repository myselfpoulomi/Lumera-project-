import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import productSerum from "@/assets/product-serum.jpg";

const skincareProducts = [
  {
    name: "HydraGlow Serum",
    price: "$48",
    tag: "Best Seller",
    image: productSerum,
  },
  {
    name: "Glow Essence Toner",
    price: "$32",
    tag: "New",
    image: productSerum,
  },
  {
    name: "Vitamin C Brightening Serum",
    price: "$52",
    tag: "Award Winner",
    image: productSerum,
  },
  {
    name: "Nourishing Night Cream",
    price: "$45",
    image: productSerum,
  },
  {
    name: "Gentle Cleansing Foam",
    price: "$28",
    image: productSerum,
  },
  {
    name: "Anti-Aging Eye Cream",
    price: "$38",
    tag: "Best Seller",
    image: productSerum,
  },
];

const Skincare = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container px-4 lg:px-8">
            <div className="text-center animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
              <span className="text-accent font-medium text-sm tracking-widest uppercase mb-3 block">
                Skincare Collection
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mb-4">
                Radiant Skin Starts Here
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Transform your skincare routine with our premium collection of serums, creams, and treatments designed for every skin type.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center animate-fade-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                <div className="text-3xl mb-3">✨</div>
                <h3 className="font-display text-xl font-semibold mb-2">Clean Ingredients</h3>
                <p className="text-muted-foreground">Formulated with natural, skin-loving ingredients</p>
              </div>
              <div className="text-center animate-fade-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                <div className="text-3xl mb-3">🌿</div>
                <h3 className="font-display text-xl font-semibold mb-2">Dermatologist Tested</h3>
                <p className="text-muted-foreground">Clinically tested and proven effective</p>
              </div>
              <div className="text-center animate-fade-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                <div className="text-3xl mb-3">💧</div>
                <h3 className="font-display text-xl font-semibold mb-2">Hydrating Formula</h3>
                <p className="text-muted-foreground">Deep hydration for all-day comfort</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 lg:py-32">
          <div className="container px-4 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
              {skincareProducts.map((product, index) => (
                <ProductCard
                  key={`${product.name}-${index}`}
                  {...product}
                  delay={index * 100 + 400}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Skincare;
