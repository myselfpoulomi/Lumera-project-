import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import productSerum from "@/assets/product-serum.jpg";
import productLipstick from "@/assets/product-lipstick.jpg";
import productFoundation from "@/assets/product-foundation.jpg";

const wishlistItems = [
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
    image: productSerum,
  },
];

const Wishlist = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container px-4 lg:px-8">
            <div className="text-center animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart className="w-8 h-8 text-accent" />
                <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground">
                  My Wishlist
                </h1>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Save your favorite products for later. Add items to your wishlist and come back anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Wishlist Items */}
        <section className="py-20 lg:py-32">
          <div className="container px-4 lg:px-8">
            {wishlistItems.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-8 animate-fade-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                  <p className="text-muted-foreground">
                    {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
                  </p>
                  <Button variant="outline" size="sm" className="text-muted-foreground">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                  {wishlistItems.map((item, index) => (
                    <div key={`${item.name}-${index}`} className="relative group">
                      <ProductCard
                        {...item}
                        delay={index * 100 + 200}
                      />
                      <button
                        className="absolute top-4 right-4 z-20 p-2 bg-background/90 backdrop-blur-sm rounded-full opacity-100 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300"
                        aria-label="Remove from wishlist"
                      >
                        <Heart className="w-4 h-4 fill-accent text-accent" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12 animate-fade-up opacity-0" style={{ animationDelay: `${600 + wishlistItems.length * 100}ms`, animationFillMode: 'forwards' }}>
                  <Link to="/shop">
                    <Button variant="hero" size="lg">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-20 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  Your wishlist is empty
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Start adding products you love to your wishlist. They'll be saved here for you to come back to later.
                </p>
                <Link to="/shop">
                  <Button variant="hero" size="lg">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
