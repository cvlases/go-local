import { Link, useLocation } from "react-router";
import { Menu, X, Instagram } from "lucide-react";
import { SITE_CONFIG } from "../config";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/directory", label: "Directory" },
    { to: "/map", label: "Map" },
    { to: "/submit", label: "Contribute" },
    { to: "/social", label: "Social" },
    { to: "/partners", label: "Partners" },
    { to: "/mission", label: "Mission" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 border-b-2 border-[var(--ink)] transition-all ${
        scrolled ? "bg-[var(--cream)]/95 backdrop-blur-sm shadow-md" : "bg-[var(--cream)]"
      }`}
    >
      <div className="w-full px-3 sm:px-5 lg:px-8">
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
                className={`text-sm font-medium hover:text-[var(--ink)] transition-colors ${
                  location.pathname === link.to
                    ? "text-[var(--ink)] border-b-2 border-[var(--sec-blue)] pb-1"
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
              className="text-[var(--ink)] hover:text-[var(--ink)] transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>

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
                    ? "bg-[var(--coral)] text-[var(--ink)]"
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