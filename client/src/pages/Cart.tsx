import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import defaultProductImage from "@/assets/product-serum.jpg";
import { useAuth } from "@/contexts/AuthContext";
import {
  useCart,
  useUpdateCartItem,
  useRemoveCartItem,
  type CartItem,
} from "@/api/cart";

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const { data, isLoading, error } = useCart(isAuthenticated);
  const updateQuantity = useUpdateCartItem();
  const removeItem = useRemoveCartItem();
  const [promoCode, setPromoCode] = useState("");

  const cartItems: CartItem[] = data?.items ?? [];

  const handleUpdateQuantity = (item: CartItem, change: number) => {
    const newQty = Math.max(1, item.quantity + change);
    updateQuantity.mutate({ itemId: item.id, quantity: newQty });
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem.mutate(itemId);
  };

  const getPrice = (item: CartItem): number => {
    const p = item.product.price;
    return typeof p === "string" ? parseFloat(p) : Number(p);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + getPrice(item) * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 lg:pt-24">
          <section className="py-20 lg:py-32">
            <div className="container px-4 lg:px-8 text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                Login to view your cart
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Please sign in to add items to your cart and proceed to checkout.
              </p>
              <Link to="/login">
                <Button variant="hero" size="lg">
                  Login
                </Button>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 lg:pt-24 flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 lg:pt-24">
          <section className="py-20 lg:py-32">
            <div className="container px-4 lg:px-8 text-center">
              <p className="text-destructive font-medium mb-4">
                Failed to load cart
              </p>
              <p className="text-muted-foreground text-sm">{error.message}</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container px-4 lg:px-8">
            <div className="text-center animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <ShoppingBag className="w-8 h-8 text-accent" />
                <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground">
                  Shopping Cart
                </h1>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Review your items and proceed to checkout when ready.
              </p>
            </div>
          </div>
        </section>

        {/* Cart Content */}
        <section className="py-20 lg:py-32">
          <div className="container px-4 lg:px-8">
            {cartItems.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="animate-fade-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                    <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                      Cart Items ({cartItems.length})
                    </h2>
                  </div>

                  {cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-card rounded-2xl p-6 shadow-soft animate-fade-up opacity-0"
                      style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: 'forwards' }}
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Product Image */}
                        <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.product.img ?? defaultProductImage}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                              {item.product.name}
                            </h3>
                            <p className="text-lg font-semibold text-accent">
                              ₹{getPrice(item).toFixed(2)}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 border border-border rounded-lg">
                              <button
                                onClick={() => handleUpdateQuantity(item, -1)}
                                disabled={updateQuantity.isPending}
                                className="p-2 hover:bg-muted transition-colors disabled:opacity-50"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleUpdateQuantity(item, 1)}
                                disabled={updateQuantity.isPending}
                                className="p-2 hover:bg-muted transition-colors disabled:opacity-50"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              disabled={removeItem.isPending}
                              className="p-2 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="mt-4 pt-4 border-t border-border flex justify-end">
                        <p className="text-lg font-semibold text-foreground">
                          ₹{(getPrice(item) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-card rounded-2xl p-6 shadow-soft sticky top-24 animate-fade-up opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                    <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                      Order Summary
                    </h2>

                    {/* Promo Code */}
                    <div className="mb-6">
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Promo Code
                      </label>
                      <div className="flex gap-2">
                        <Input
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter code"
                          className="flex-1"
                        />
                        <Button variant="outline" size="sm">
                          Apply
                        </Button>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Price Breakdown */}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Tax</span>
                        <span>₹{tax.toFixed(2)}</span>
                      </div>
                      {subtotal < 100 && (
                        <p className="text-sm text-muted-foreground">
                          Add ₹{(100 - subtotal).toFixed(2)} more for free shipping
                        </p>
                      )}
                    </div>

                    <Separator className="my-6" />

                    {/* Total */}
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-display text-xl font-semibold text-foreground">
                        Total
                      </span>
                      <span className="font-display text-2xl font-semibold text-accent">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>

                    {/* Checkout Button */}
                    <Button variant="hero" className="w-full mb-4" size="lg">
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <Link to="/shop" className="w-full">
                      <Button variant="outline" className="w-full" size="lg">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  Your cart is empty
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Looks like you haven&apos;t added anything to your cart yet. Start shopping to fill it up!
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

export default Cart;
