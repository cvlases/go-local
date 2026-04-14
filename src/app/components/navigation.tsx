import { Link, useLocation } from "react-router";
import { Heart, Menu, X, Instagram } from "lucide-react";
import { SITE_CONFIG } from "../config";
import { useState, useEffect } from "react";
import { getLikesCount } from "../utils/likes";
import logo from "figma:asset/174870f3450d6730bf564c49a678e570b21fe85c.png";

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateLikesCount = () => setLikesCount(getLikesCount());
    updateLikesCount();
    window.addEventListener("storage", updateLikesCount);
    window.addEventListener("likes-updated", updateLikesCount);
    return () => {
      window.removeEventListener("storage", updateLikesCount);
      window.removeEventListener("likes-updated", updateLikesCount);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/directory", label: "Directory" },
    { to: "/map", label: "Map" },
    { to: "/submit", label: "Submit" },
    { to: "/extras", label: "Extras" },
    { to: "/partners", label: "Partners" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 border-b-2 border-[var(--ink)] transition-all ${
        scrolled ? "bg-[var(--cream)]/95 backdrop-blur-sm shadow-md" : "bg-[var(--cream)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="GoLocal" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium hover:text-[var(--coral)] transition-colors ${
                  location.pathname === link.to
                    ? "text-[var(--coral)] border-b-2 border-[var(--coral)] pb-1"
                    : "text-[var(--ink)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <a
              href={`https://instagram.com/${SITE_CONFIG.instagramHandle.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink)] hover:text-[var(--coral)] transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <Link
              to="/directory?saved=true"
              className="flex items-center gap-2 px-3 py-2 bg-[var(--stone)] border border-[var(--ink)] rounded-lg hover:bg-[var(--ink)] hover:text-white transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Saved</span>
              {likesCount > 0 && (
                <span className="px-2 py-0.5 bg-[var(--coral)] text-white text-xs rounded-full">
                  {likesCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[var(--ink)]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[var(--ink)] bg-[var(--cream)]">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium ${
                  location.pathname === link.to
                    ? "bg-[var(--coral)] text-white"
                    : "bg-[var(--stone)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}