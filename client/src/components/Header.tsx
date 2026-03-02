import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import SearchDialog from "./SearchDialog";

const navLinks = ["Shop", "Skincare", "Makeup", "Collections", "About", "Contact"];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="font-display text-2xl lg:text-3xl font-semibold tracking-wide text-foreground">
            LUMÉRA
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {link}
              </Link>
            ))}
          </nav>

          {/* Icons & CTA */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors" 
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link to="/wishlist" className="p-2 text-muted-foreground hover:text-foreground transition-colors hidden sm:block" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="p-2 text-muted-foreground hover:text-foreground transition-colors relative" aria-label="Cart">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-semibold rounded-full flex items-center justify-center">
                2
              </span>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="sm" className="hidden lg:flex ml-2">
                Signup
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-foreground" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border/50 animate-fade-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase()}`}
                  className="py-3 px-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link}
                </Link>
              ))}
              <Link to="/signup" className="mt-4 w-full">
                <Button variant="hero" className="w-full">
                  Signup
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

export default Header;
