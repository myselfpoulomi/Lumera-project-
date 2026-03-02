import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import productSerum from "@/assets/product-serum.jpg";
import productLipstick from "@/assets/product-lipstick.jpg";
import productFoundation from "@/assets/product-foundation.jpg";

const products = [
  {
    name: "HydraGlow Serum",
    price: "$48",
    tag: "Best Seller",
    image: productSerum,
  },
  {
    name: "Velvet Matte Lipstick",
    price: "$26",
    tag: "New",
    image: productLipstick,
  },
  {
    name: "Radiance Foundation",
    price: "$39",
    tag: "Award Winner",
    image: productFoundation,
  },
  {
    name: "Glow Essence Toner",
    price: "$32",
    tag: "New",
    image: productSerum,
  },
  {
    name: "Satin Finish Blush",
    price: "$24",
    image: productLipstick,
  },
  {
    name: "Perfect Coverage Concealer",
    price: "$28",
    tag: "Best Seller",
    image: productFoundation,
  },
  {
    name: "Vitamin C Brightening Serum",
    price: "$52",
    image: productSerum,
  },
  {
    name: "Bold Red Lipstick",
    price: "$26",
    image: productLipstick,
  },
  {
    name: "Natural Finish Foundation",
    price: "$39",
    image: productFoundation,
  },
];

const Shop = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container px-4 lg:px-8">
            <div className="text-center animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
              <span className="text-accent font-medium text-sm tracking-widest uppercase mb-3 block">
                Shop All
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mb-4">
                Discover Your Beauty
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Explore our complete collection of premium beauty products, carefully curated for every skin type and style.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 lg:py-32">
          <div className="container px-4 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
              {products.map((product, index) => (
                <ProductCard
                  key={`${product.name}-${index}`}
                  {...product}
                  delay={index * 100}
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

export default Shop;
