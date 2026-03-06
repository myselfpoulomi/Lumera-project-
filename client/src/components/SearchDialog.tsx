import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useProducts } from "@/api/products";
import type { Product } from "@/api/products";
import defaultProductImage from "@/assets/product-serum.jpg";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: products = [], isLoading, error } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return products.filter(
      (product: Product) =>
        product.name.toLowerCase().includes(query) ||
        product.categoryType?.toLowerCase().includes(query) ||
        (product.description?.toLowerCase().includes(query) ?? false)
    );
  }, [products, searchQuery]);

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
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Failed to load products</p>
            </div>
          ) : searchQuery.trim() === "" ? (
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
                Found {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "result" : "results"}
              </p>
              <div className="grid grid-cols-1 gap-4">
                {filteredProducts.map((product: Product) => (
                  <Link
                    key={product.id}
                    to="/shop"
                    onClick={() => onOpenChange(false)}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={product.img ?? defaultProductImage}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground group-hover:text-accent transition-colors truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {product.categoryType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-accent">
                        ₹{product.price}
                      </p>
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
