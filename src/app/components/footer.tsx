import { Link } from "react-router";
import { Instagram, Heart } from "lucide-react";
import { SITE_CONFIG } from "../config";

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Tagline */}
          <div>
            <h3
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {SITE_CONFIG.orgName}
            </h3>
            <p className="text-sm text-white">
              Found by neighbors, not an algorithm.
            </p>
            <p className="text-sm text-white mt-2">{SITE_CONFIG.city}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-bold mb-4 text-sm uppercase tracking-wide"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Quick Links
            </h4>
            <div className="space-y-2">
              <Link
                to="/directory"
                className="block text-sm text-white hover:text-[var(--lime)] transition-colors"
              >
                Browse Directory
              </Link>
              <Link
                to="/map"
                className="block text-sm text-white hover:text-[var(--lime)] transition-colors"
              >
                Map View
              </Link>
              <Link
                to="/submit"
                className="block text-sm text-white hover:text-[var(--lime)] transition-colors"
              >
                Submit Restaurant
              </Link>
              <Link
                to="/extras"
                className="block text-sm text-white hover:text-[var(--lime)] transition-colors"
              >
                Extras & Zines
              </Link>
              <Link
                to="/partners"
                className="block text-sm text-white hover:text-[var(--lime)] transition-colors"
              >
                Community Partners
              </Link>
            </div>
          </div>

          {/* Instagram */}
          <div>
            <h4
              className="font-bold mb-4 text-sm uppercase tracking-wide"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Follow Us
            </h4>
            <a
              href={`https://instagram.com/${SITE_CONFIG.instagramHandle.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white hover:text-[var(--lime)] transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>{SITE_CONFIG.instagramHandle}</span>
            </a>
            <p className="text-sm text-white mt-4">
              Get GoLocal updates — new restaurants, events, and zines.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white">
              Made with <Heart className="inline w-4 h-4 fill-[var(--lime)] text-[var(--lime)]" /> by the GoLocal community · {SITE_CONFIG.city}
            </p>
            <Link
              to="/partners"
              className="text-sm text-white hover:text-[var(--lime)] transition-colors"
            >
              Want this for your organization? Use our template →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}