import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
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
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="container px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
          <span className="text-accent font-medium text-sm tracking-widest uppercase mb-3 block">
            Our Collection
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Discover our most-loved beauty essentials, curated for your glow.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.name}
              {...product}
              delay={index * 150 + 200}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 animate-fade-up opacity-0" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-foreground font-medium hover:text-accent transition-colors group"
          >
            View All Products
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
