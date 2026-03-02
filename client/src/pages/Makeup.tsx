import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import productLipstick from "@/assets/product-lipstick.jpg";
import productFoundation from "@/assets/product-foundation.jpg";

const makeupProducts = [
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
    name: "Bold Red Lipstick",
    price: "$26",
    image: productLipstick,
  },
  {
    name: "Natural Finish Foundation",
    price: "$39",
    image: productFoundation,
  },
  {
    name: "Glossy Lip Gloss Set",
    price: "$32",
    tag: "New",
    image: productLipstick,
  },
  {
    name: "Matte Eyeshadow Palette",
    price: "$45",
    image: productFoundation,
  },
  {
    name: "Long-Lasting Mascara",
    price: "$22",
    tag: "Best Seller",
    image: productLipstick,
  },
];

const Makeup = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container px-4 lg:px-8">
            <div className="text-center animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
              <span className="text-accent font-medium text-sm tracking-widest uppercase mb-3 block">
                Makeup Collection
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mb-4">
                Express Your Style
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Discover our vibrant collection of makeup essentials, from flawless foundations to bold lip colors that make you shine.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center animate-fade-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                <div className="text-3xl mb-3">💄</div>
                <h3 className="font-display text-xl font-semibold mb-2">Long-Lasting</h3>
                <p className="text-muted-foreground">Stay flawless all day with our long-wear formulas</p>
              </div>
              <div className="text-center animate-fade-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-display text-xl font-semibold mb-2">Vibrant Colors</h3>
                <p className="text-muted-foreground">Rich, pigmented shades for every occasion</p>
              </div>
              <div className="text-center animate-fade-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                <div className="text-3xl mb-3">✨</div>
                <h3 className="font-display text-xl font-semibold mb-2">Cruelty-Free</h3>
                <p className="text-muted-foreground">Ethically made, never tested on animals</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 lg:py-32">
          <div className="container px-4 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
              {makeupProducts.map((product, index) => (
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

export default Makeup;
