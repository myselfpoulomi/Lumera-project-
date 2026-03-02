import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import productSerum from "@/assets/product-serum.jpg";
import productLipstick from "@/assets/product-lipstick.jpg";
import productFoundation from "@/assets/product-foundation.jpg";

type SkinType = "dry" | "oily" | "combination" | "sensitive" | "normal" | null;

interface Product {
  name: string;
  price: string;
  tag?: string;
  image: string;
  skinTypes: SkinType[];
  category: "skincare" | "makeup";
}

const allProducts: Product[] = [
  {
    name: "HydraGlow Serum",
    price: "$48",
    tag: "Best Seller",
    image: productSerum,
    skinTypes: ["dry", "normal", "sensitive"],
    category: "skincare",
  },
  {
    name: "Velvet Matte Lipstick",
    price: "$26",
    tag: "New",
    image: productLipstick,
    skinTypes: ["dry", "oily", "combination", "normal", "sensitive"],
    category: "makeup",
  },
  {
    name: "Radiance Foundation",
    price: "$39",
    tag: "Award Winner",
    image: productFoundation,
    skinTypes: ["dry", "normal", "sensitive"],
    category: "makeup",
  },
  {
    name: "Glow Essence Toner",
    price: "$32",
    tag: "New",
    image: productSerum,
    skinTypes: ["oily", "combination", "normal"],
    category: "skincare",
  },
  {
    name: "Satin Finish Blush",
    price: "$24",
    image: productLipstick,
    skinTypes: ["dry", "normal", "sensitive"],
    category: "makeup",
  },
  {
    name: "Perfect Coverage Concealer",
    price: "$28",
    tag: "Best Seller",
    image: productFoundation,
    skinTypes: ["oily", "combination", "normal"],
    category: "makeup",
  },
  {
    name: "Vitamin C Brightening Serum",
    price: "$52",
    image: productSerum,
    skinTypes: ["dry", "normal", "sensitive"],
    category: "skincare",
  },
  {
    name: "Bold Red Lipstick",
    price: "$26",
    image: productLipstick,
    skinTypes: ["dry", "oily", "combination", "normal", "sensitive"],
    category: "makeup",
  },
  {
    name: "Natural Finish Foundation",
    price: "$39",
    image: productFoundation,
    skinTypes: ["oily", "combination", "normal"],
    category: "makeup",
  },
  {
    name: "Nourishing Night Cream",
    price: "$45",
    image: productSerum,
    skinTypes: ["dry", "normal", "sensitive"],
    category: "skincare",
  },
  {
    name: "Gentle Cleansing Foam",
    price: "$28",
    image: productSerum,
    skinTypes: ["sensitive", "normal", "dry"],
    category: "skincare",
  },
  {
    name: "Anti-Aging Eye Cream",
    price: "$38",
    tag: "Best Seller",
    image: productSerum,
    skinTypes: ["dry", "normal", "sensitive"],
    category: "skincare",
  },
];

const skinTypes = [
  { id: "dry", label: "Dry", description: "Tight, flaky, or rough texture" },
  { id: "oily", label: "Oily", description: "Shiny, enlarged pores, prone to acne" },
  { id: "combination", label: "Combination", description: "Oily T-zone, dry cheeks" },
  { id: "sensitive", label: "Sensitive", description: "Easily irritated, redness" },
  { id: "normal", label: "Normal", description: "Balanced, few imperfections" },
];

const FindRoutine = () => {
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSkinTypeSelect = (skinType: SkinType) => {
    setSelectedSkinType(skinType);
    // Store in localStorage
    if (skinType) {
      localStorage.setItem("skinType", skinType);
    }
  };

  const handleFindProducts = () => {
    if (selectedSkinType) {
      setShowResults(true);
    }
  };

  const filteredProducts = selectedSkinType
    ? allProducts.filter((product) => product.skinTypes.includes(selectedSkinType))
    : [];

  const skincareProducts = filteredProducts.filter((p) => p.category === "skincare");
  const makeupProducts = filteredProducts.filter((p) => p.category === "makeup");

  // Load saved skin type on mount
  useEffect(() => {
    const saved = localStorage.getItem("skinType") as SkinType;
    if (saved && skinTypes.some((st) => st.id === saved)) {
      setSelectedSkinType(saved);
      setShowResults(true);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container px-4 lg:px-8">
            <div className="text-center animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
              <span className="text-accent font-medium text-sm tracking-widest uppercase mb-3 block">
                Personalized Routine
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mb-4">
                Find Your Perfect Routine
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Discover skincare and makeup products tailored specifically for your skin type.
              </p>
            </div>
          </div>
        </section>

        {!showResults ? (
          /* Skin Type Selection */
          <section className="py-20 lg:py-32">
            <div className="container px-4 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12 animate-fade-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                  <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
                    What's Your Skin Type?
                  </h2>
                  <p className="text-muted-foreground">
                    Select your skin type to get personalized product recommendations
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {skinTypes.map((skinType, index) => (
                    <button
                      key={skinType.id}
                      onClick={() => handleSkinTypeSelect(skinType.id as SkinType)}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left animate-fade-up opacity-0 ${
                        selectedSkinType === skinType.id
                          ? "border-accent bg-accent/10 shadow-card"
                          : "border-border bg-card hover:border-accent/50 hover:shadow-soft"
                      }`}
                      style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: 'forwards' }}
                    >
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                        {skinType.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {skinType.description}
                      </p>
                    </button>
                  ))}
                </div>

                {selectedSkinType && (
                  <div className="text-center animate-fade-up opacity-0" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
                    <Button variant="hero" size="lg" onClick={handleFindProducts}>
                      Find My Products
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>
        ) : (
          /* Results Section */
          <section className="py-20 lg:py-32">
            <div className="container px-4 lg:px-8">
              {/* Selected Skin Type Banner */}
              <div className="max-w-4xl mx-auto mb-12 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
                <div className="bg-card rounded-2xl p-6 shadow-soft flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Your Skin Type</p>
                    <h2 className="font-display text-2xl font-semibold text-foreground capitalize">
                      {selectedSkinType}
                    </h2>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowResults(false);
                      setSelectedSkinType(null);
                    }}
                  >
                    Change Selection
                  </Button>
                </div>
              </div>

              {/* Skincare Products */}
              {skincareProducts.length > 0 && (
                <div className="max-w-6xl mx-auto mb-16">
                  <div className="mb-8 animate-fade-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                    <h2 className="font-display text-3xl font-semibold text-foreground mb-2">
                      Recommended Skincare
                    </h2>
                    <p className="text-muted-foreground">
                      Products perfect for your {selectedSkinType} skin
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                    {skincareProducts.map((product, index) => (
                      <ProductCard
                        key={`${product.name}-${index}`}
                        name={product.name}
                        price={product.price}
                        tag={product.tag}
                        image={product.image}
                        delay={index * 100 + 300}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Makeup Products */}
              {makeupProducts.length > 0 && (
                <div className="max-w-6xl mx-auto">
                  <div className="mb-8 animate-fade-up opacity-0" style={{ animationDelay: `${400 + skincareProducts.length * 100}ms`, animationFillMode: 'forwards' }}>
                    <h2 className="font-display text-3xl font-semibold text-foreground mb-2">
                      Recommended Makeup
                    </h2>
                    <p className="text-muted-foreground">
                      Makeup that works beautifully with your {selectedSkinType} skin
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                    {makeupProducts.map((product, index) => (
                      <ProductCard
                        key={`${product.name}-${index}`}
                        name={product.name}
                        price={product.price}
                        tag={product.tag}
                        image={product.image}
                        delay={index * 100 + 500 + skincareProducts.length * 100}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-20 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
                  <p className="text-muted-foreground mb-4">
                    No products found for {selectedSkinType} skin type.
                  </p>
                  <Button variant="outline" onClick={() => setShowResults(false)}>
                    Try Another Skin Type
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FindRoutine;
