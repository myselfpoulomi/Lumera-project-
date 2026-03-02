import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Luxurious skincare products" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block text-accent font-medium text-sm tracking-widest uppercase mb-4 animate-fade-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            Premium Clean Beauty
          </span>
          
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-foreground mb-6 animate-fade-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Reveal Your{" "}
            <span className="italic text-foreground/90">Natural</span>{" "}
            Glow
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 animate-fade-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            Clean beauty essentials designed to nourish, protect, and enhance your skin with science-backed formulas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <Link to="/shop">
              <Button variant="hero" size="xl">
                Explore Collection
              </Button>
            </Link>
            <Link to="/find-routine">
              <Button variant="heroOutline" size="xl">
                Find Your Routine
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-14 animate-fade-up opacity-0" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
            <div>
              <p className="font-display text-3xl font-semibold text-foreground">20K+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="font-display text-3xl font-semibold text-foreground">4.9</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="w-px bg-border hidden sm:block" />
            <div className="hidden sm:block">
              <p className="font-display text-3xl font-semibold text-foreground">100%</p>
              <p className="text-sm text-muted-foreground">Clean Ingredients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
