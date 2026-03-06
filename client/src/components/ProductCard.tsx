import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  price: string;
  tag?: string;
  image: string;
  delay?: number;
  productId?: string;
  onAddToCart?: (productId: string) => void;
}

const ProductCard = ({
  name,
  price,
  tag,
  image,
  delay = 0,
  productId,
  onAddToCart,
}: ProductCardProps) => {
  return (
    <div 
      className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 animate-fade-up opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Tag */}
      {tag && (
        <span className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-semibold bg-accent text-accent-foreground rounded-full">
          {tag}
        </span>
      )}

      {/* Wishlist Button */}
      <button 
        className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
        aria-label="Add to wishlist"
      >
        <Heart className="w-4 h-4" />
      </button>

      {/* Image Container */}
      <div className="relative aspect-[1/1] overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            variant="glossy"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              if (productId && onAddToCart) onAddToCart(productId);
            }}
            disabled={!productId || !onAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="font-display text-lg font-medium text-card-foreground mb-1 group-hover:text-accent transition-colors">
          {name}
        </h3>
        <p className="text-base font-semibold text-muted-foreground">
          {price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
