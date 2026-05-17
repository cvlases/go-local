import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { star } from "../../assets/icons";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { restaurants, Restaurant } from "../data/restaurants";
import { RestaurantCard } from "../components/restaurant-card";
import { RestaurantDetailModal } from "../components/restaurant-detail-modal";
import { CategoryRow } from "../components/category-row";
import { FilterPanel } from "../components/filter-panel";
import { filterRestaurants, sortRestaurants, getRestaurantsByCategory, Filters } from "../utils/filters";
import { CUISINE_TYPES, DIETARY_OPTIONS, SERVICE_OPTIONS, CATERING_OPTIONS, NEIGHBORHOODS } from "../config";
import { motion, AnimatePresence } from "motion/react";

export function DirectoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const [filters, setFilters] = useState<Filters>({
    search: searchParams.get("search") || "",
    cuisine: searchParams.getAll("cuisine"),
    dietary: searchParams.getAll("dietary"),
    service: searchParams.getAll("service"),
    catering: searchParams.getAll("catering"),
    neighborhood: searchParams.getAll("neighborhood"),
  });

  const [sortBy, setSortBy] = useState<"likes" | "newest" | "name" | "neighborhood">("likes");

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    filters.cuisine.forEach(c => params.append("cuisine", c));
    filters.dietary.forEach(d => params.append("dietary", d));
    filters.service.forEach(s => params.append("service", s));
    filters.catering.forEach(c => params.append("catering", c));
    filters.neighborhood.forEach(n => params.append("neighborhood", n));
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const filteredRestaurants = filterRestaurants(restaurants, filters);
  const sortedRestaurants = sortRestaurants(filteredRestaurants, sortBy);

  const communityFavorites = getRestaurantsByCategory(restaurants, "community-favorites");
  const newAdditions = getRestaurantsByCategory(restaurants, "new-additions");
  const plantBased = getRestaurantsByCategory(restaurants, "plant-based");
  const cateringRestaurants = restaurants.filter(r => r.catering);

  const toggleFilter = (category: keyof Filters, value: string) => {
    setFilters(prev => {
      const current = prev[category] as string[];
      const newValue = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [category]: newValue };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      cuisine: [],
      dietary: [],
      service: [],
      catering: [],
      neighborhood: [],
    });
  };

  const hasActiveFilters = filters.search || filters.cuisine.length > 0 || filters.dietary.length > 0 || 
    filters.service.length > 0 || filters.catering.length > 0 || filters.neighborhood.length > 0;

  const showCategoryRows = !hasActiveFilters;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink)]" />
          <input
            type="text"
            placeholder="Search restaurants, cuisines, neighborhoods..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="w-full pl-12 pr-4 py-4 border-2 border-[var(--ink)] rounded-xl bg-white text-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar - Desktop */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-20">
            <h3 
              className="text-lg font-bold uppercase tracking-wide mb-4" 
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Filters
            </h3>
            <FilterPanel
              filters={filters}
              onFilterChange={toggleFilter}
              onClearAll={clearAllFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </aside>

        {/* Mobile Filters Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--stone)] border-2 border-[var(--ink)] rounded-xl font-medium"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="px-2 py-0.5 bg-[var(--coral)] text-[var(--ink)] text-xs rounded-full">
                {filters.cuisine.length + filters.dietary.length + filters.service.length + 
                 filters.catering.length + filters.neighborhood.length}
              </span>
            )}
          </button>

          {/* Mobile Filter Modal */}
          <AnimatePresence>
            {showMobileFilters && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-40"
                  onClick={() => setShowMobileFilters(false)}
                />
                
                {/* Filter Panel */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[var(--cream)] z-50 overflow-y-auto p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 
                      className="text-xl font-bold uppercase tracking-wide" 
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Filters
                    </h3>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="p-2 hover:bg-[var(--stone)] rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <FilterPanel
                    filters={filters}
                    onFilterChange={toggleFilter}
                    onClearAll={clearAllFilters}
                    hasActiveFilters={hasActiveFilters}
                  />

                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full mt-6 px-6 py-3 bg-[var(--ink)] text-white rounded-xl font-medium hover:bg-[var(--ink)]/90 transition-colors"
                  >
                    Apply Filters
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Main Content */}
        <main className="lg:col-span-3">
          {/* Results Count & Sort */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-[var(--ink)]" style={{ fontFamily: "var(--font-mono)" }}>
              Showing {sortedRestaurants.length} of {restaurants.length} restaurants
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border-2 border-[var(--ink)] rounded-lg text-sm bg-white"
            >
              <option value="likes">Most Liked</option>
              <option value="newest">Newest</option>
              <option value="name">A-Z</option>
              <option value="neighborhood">By Neighborhood</option>
            </select>
          </div>

          {/* Catering Spotlight */}
          {showCategoryRows && (
            <div className="my-12 bg-[var(--gold)] border-2 border-[var(--ink)] rounded-xl p-6">
              <h2
                className="text-2xl font-semibold uppercase tracking-wide mb-2 flex items-center gap-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <img src={star} alt="" className="w-7 h-7" />
                PLANNING SOMETHING BIG?
              </h2>
              <p className="text-lg mb-6">
                These restaurants are ready for your event, party, or group order.
              </p>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {cateringRestaurants.slice(0, 4).map((restaurant) => (
                  <div key={restaurant.id} className="flex-shrink-0 w-80">
                    <RestaurantCard
                      restaurant={restaurant}
                      onClick={() => setSelectedRestaurant(restaurant)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Rows */}
          {showCategoryRows && (
            <div className="mb-12 space-y-8">
              <CategoryRow
                title="Community Favorites"
                emoji="🏆"
                restaurants={communityFavorites}
                onRestaurantClick={setSelectedRestaurant}
              />
              <CategoryRow
                title="New to GoLocal"
                emoji="✨"
                restaurants={newAdditions}
                onRestaurantClick={setSelectedRestaurant}
              />
              <CategoryRow
                title="Plant-Based & Vegan-Friendly"
                emoji="🌱"
                restaurants={plantBased}
                onRestaurantClick={setSelectedRestaurant}
              />
            </div>
          )}

          {/* Full Directory Grid */}
          <div>
            <h2
              className="text-2xl font-bold uppercase tracking-wide mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              All Restaurants
            </h2>
            
            {sortedRestaurants.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-[var(--ink)]">
                  No restaurants found matching your filters.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 px-6 py-3 bg-[var(--coral)] text-[var(--ink)] rounded-lg hover:bg-[var(--coral)]/80"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <AnimatePresence>
                  {sortedRestaurants.map((restaurant) => (
                    <motion.div
                      key={restaurant.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <RestaurantCard
                        restaurant={restaurant}
                        onClick={() => setSelectedRestaurant(restaurant)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </main>
      </div>

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