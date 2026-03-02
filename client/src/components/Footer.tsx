import { Link } from "react-router-dom";

const footerLinks = ["Shipping & Returns", "Privacy Policy", "Terms", "Careers"];

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="font-display text-2xl font-semibold text-foreground">
            LUMÉRA
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 LUMÉRA Beauty. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <span className="text-accent">♥</span>
            <span>for your glow</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
