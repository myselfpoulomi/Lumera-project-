import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import productSerum from "@/assets/product-serum.jpg";
import productLipstick from "@/assets/product-lipstick.jpg";
import productFoundation from "@/assets/product-foundation.jpg";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock products for search
const allProducts = [
  { id: "1", name: "HydraGlow Serum", category: "Skincare", image: productSerum, price: "$48" },
  { id: "2", name: "Velvet Matte Lipstick", category: "Makeup", image: productLipstick, price: "$26" },
  { id: "3", name: "Radiance Foundation", category: "Makeup", image: productFoundation, price: "$39" },
  { id: "4", name: "Glow Essence Toner", category: "Skincare", image: productSerum, price: "$32" },
  { id: "5", name: "Satin Finish Blush", category: "Makeup", image: productLipstick, price: "$24" },
  { id: "6", name: "Perfect Coverage Concealer", category: "Makeup", image: productFoundation, price: "$28" },
  { id: "7", name: "Vitamin C Brightening Serum", category: "Skincare", image: productSerum, price: "$52" },
  { id: "8", name: "Bold Red Lipstick", category: "Makeup", image: productLipstick, price: "$26" },
  { id: "9", name: "Natural Finish Foundation", category: "Makeup", image: productFoundation, price: "$39" },
];

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(allProducts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col p-0">
        <DialogDescription className="sr-only">
          Search for products
        </DialogDescription>
        
        {/* Search Input */}
        <div className="p-6 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {searchQuery.trim() === "" ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Start typing to search for products</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-2">No products found</p>
              <p className="text-sm text-muted-foreground">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Found {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"}
              </p>
              <div className="grid grid-cols-1 gap-4">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to="/shop"
                    onClick={() => onOpenChange(false)}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground group-hover:text-accent transition-colors truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-accent">{product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* View All Link */}
        {searchQuery.trim() !== "" && filteredProducts.length > 0 && (
          <div className="p-6 border-t border-border">
            <Link
              to="/shop"
              onClick={() => onOpenChange(false)}
              className="block text-center text-accent hover:underline font-medium"
            >
              View all products →
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
