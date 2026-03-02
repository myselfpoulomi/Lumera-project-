import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
          <span className="text-accent font-medium text-sm tracking-widest uppercase mb-3 block">
            Exclusive Benefits
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Join the Glow Club
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Exclusive offers, beauty tips, and early access to new launches. Be the first to know.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 rounded-full px-6 bg-background border-border focus:ring-accent"
                required
              />
              <Button type="submit" variant="hero" size="lg">
                Subscribe
              </Button>
            </form>
          ) : (
            <div className="py-4 px-6 bg-accent/10 rounded-full inline-flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span className="text-foreground font-medium">Welcome to the Glow Club!</span>
            </div>
          )}

          <p className="text-muted-foreground text-xs mt-4">
            By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
