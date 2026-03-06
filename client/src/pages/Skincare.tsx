import axios from "axios";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProductsByCategory } from "@/api/products";
import { useAddToCart } from "@/api/cart";
import defaultProductImage from "@/assets/product-serum.jpg";

const Skincare = () => {
  const { data: products, isLoading, error } = useProductsByCategory("SKINCARE");
  const addToCart = useAddToCart();

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
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
              </div>
            )}
            {error && (
              <div className="text-center py-20">
                <p className="text-destructive font-medium">Failed to load skincare products</p>
                <p className="text-muted-foreground text-sm mt-1">{error.message}</p>
              </div>
            )}
            {!isLoading && !error && products && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    price={`₹${product.price}`}
                    tag={product.categoryType}
                    image={product.img ?? defaultProductImage}
                    delay={index * 100 + 400}
                    productId={product.id}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
            {!isLoading && !error && products?.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No skincare products available yet.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Skincare;
