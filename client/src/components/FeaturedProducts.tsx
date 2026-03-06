import { useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import ProductCard from "./ProductCard";
import { useProducts } from "@/api/products";
import { useAddToCart } from "@/api/cart";
import type { Product } from "@/api/products";
import defaultProductImage from "@/assets/product-serum.jpg";

const FEATURED_COUNT = 5;

function shuffleAndTake<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

const FeaturedProducts = () => {
  const { data: products, isLoading, error } = useProducts();
  const addToCart = useAddToCart();

  const featuredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return shuffleAndTake(products, Math.min(FEATURED_COUNT, products.length));
  }, [products]);

  const handleAddToCart = (productId: string) => {
    addToCart.mutate(
      { productId },
      {
        onSuccess: () => toast.success("Added to cart"),
        onError: (err) => {
          if (axios.isAxiosError(err) && err.response?.status === 401) {
            toast.error("Please login to add items to cart");
          } else {
            toast.error(err instanceof Error ? err.message : "Failed to add to cart");
          }
        },
      }
    );
  };

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
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
          </div>
        )}
        {error && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Failed to load featured products</p>
          </div>
        )}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {featuredProducts.map((product: Product, index: number) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={`₹${product.price}`}
                tag={product.categoryType}
                image={product.img ?? defaultProductImage}
                delay={index * 150 + 200}
                productId={product.id}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
        {!isLoading && !error && featuredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No products available yet.</p>
          </div>
        )}

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
