import { Link } from "react-router";
import { motion } from "motion/react";
import { SITE_CONFIG } from "../config";
import { restaurants } from "../data/restaurants";
import { getRestaurantsByCategory } from "../utils/filters";
import { CategoryRow } from "../components/category-row";
import { useState } from "react";
import { RestaurantDetailModal } from "../components/restaurant-detail-modal";
import { Restaurant } from "../data/restaurants";
import { star, community, newIcon, pizza, asian, mexican, cafeBakery, healthy, takeout, catering, locationPin, lateNight, brunch } from "../../assets/icons";

export function LandingPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const featuredRestaurants = getRestaurantsByCategory(restaurants, "community-favorites").slice(0, 6);
  const cateringRestaurants = getRestaurantsByCategory(restaurants, "great-for-catering").slice(0, 6);
  const newAdditions = getRestaurantsByCategory(restaurants, "new-additions");

  const categories = [
    { icon: pizza, label: "Pizza" },
    { icon: asian, label: "Noodles" },
    { icon: mexican, label: "Tacos" },
    { icon: cafeBakery, label: "Café" },
    { icon: healthy, label: "Vegan" },
    { icon: takeout, label: "Takeout" },
    { icon: catering, label: "Catering" },
    { icon: locationPin, label: "Southside" },
    { icon: lateNight, label: "Open Late" },
    { icon: brunch, label: "Brunch" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[var(--cream)] relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231C1C1C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1
              className="text-5xl md:text-7xl font-bold text-[var(--ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {SITE_CONFIG.tagline}
            </h1>
            <p className="text-xl md:text-2xl text-[var(--ink)] max-w-3xl mx-auto">
              {SITE_CONFIG.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/directory"
                className="px-8 py-4 bg-[var(--coral)] text-[var(--ink)] rounded-lg font-semibold hover:bg-[var(--coral)]/80 transition-colors text-lg"
              >
                Browse the Directory
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Animated Category Ticker */}
        <div className="border-y-2 border-[var(--ink)] bg-[var(--gold)] py-3 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 whitespace-nowrap"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {[...categories, ...categories, ...categories].map((cat, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-lg font-medium">
                <img src={cat.icon} alt="" className="w-5 h-5 inline-block" />
                {cat.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[var(--stone)] border-b-2 border-[var(--ink)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div
                className="text-5xl font-bold text-[var(--ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {restaurants.length}
              </div>
              <div
                className="text-sm uppercase tracking-wide text-[var(--ink)] mt-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Restaurants
              </div>
            </div>
            <div>
              <div
                className="text-5xl font-bold text-[var(--ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                12
              </div>
              <div
                className="text-sm uppercase tracking-wide text-[var(--ink)] mt-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Neighborhoods
              </div>
            </div>
            <div>
              <div
                className="text-5xl font-bold text-[var(--ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                100%
              </div>
              <div
                className="text-sm uppercase tracking-wide text-[var(--ink)] mt-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Human Curated
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Category Previews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CategoryRow
          title="Community Favorites"
          icon={community}
          restaurants={featuredRestaurants}
          onRestaurantClick={setSelectedRestaurant}
        />
        <CategoryRow
          title="Planning Something Big?"
          icon={star}
          restaurants={cateringRestaurants}
          onRestaurantClick={setSelectedRestaurant}
        />
        {newAdditions.length > 0 && (
          <CategoryRow
            title="New to GoLocal"
            icon={newIcon}
            restaurants={newAdditions}
            onRestaurantClick={setSelectedRestaurant}
          />
        )}
        <div className="text-center mt-8">
          <Link
            to="/directory"
            className="inline-flex items-center gap-2 text-lg text-[var(--ink)] hover:underline font-medium"
          >
            See all restaurants →
          </Link>
        </div>
      </section>

      {/* Why GoLocal Strip */}
      <section className="bg-[var(--sky)] border-y-2 border-[var(--ink)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-3">
              <div className="text-5xl">🙋</div>
              <p className="text-lg text-white font-medium">
                Recommended by your neighbors, not an algorithm
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="text-5xl">📋</div>
              <p className="text-lg text-white font-medium">
                A living directory — always growing, always community-updated
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="text-5xl">🚫</div>
              <p className="text-lg text-white font-medium">
                No ads. No promoted placements. Ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Detail Modal */}
      {selectedRestaurant && (
        <RestaurantDetailModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </div>
  );
}
