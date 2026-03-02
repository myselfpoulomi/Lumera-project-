import { Instagram } from "lucide-react";
import insta1 from "@/assets/insta-1.jpg";
import insta2 from "@/assets/insta-2.jpg";
import insta3 from "@/assets/insta-3.jpg";
import insta4 from "@/assets/insta-4.jpg";

const instagramImages = [insta1, insta2, insta3, insta4];

const SocialProof = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
          <span className="text-accent font-medium text-sm tracking-widest uppercase mb-3 block">
            #LumeraGlow
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Join the Glow
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Follow us on Instagram and share your radiant moments.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 animate-fade-up opacity-0" style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>
          <div className="flex items-center gap-3 px-6 py-3 bg-card rounded-full shadow-soft">
            <span className="text-2xl">⭐</span>
            <span className="font-semibold text-foreground">4.9/5</span>
            <span className="text-muted-foreground text-sm">from 20k+ reviews</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-card rounded-full shadow-soft">
            <Instagram className="w-5 h-5 text-accent" />
            <span className="font-semibold text-foreground">125K</span>
            <span className="text-muted-foreground text-sm">followers</span>
          </div>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
          {instagramImages.map((image, index) => (
            <div
              key={index}
              className="aspect-square rounded-xl overflow-hidden relative group cursor-pointer"
            >
              <img 
                src={image} 
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-foreground/30 backdrop-blur-sm">
                <Instagram className="w-8 h-8 text-background" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
