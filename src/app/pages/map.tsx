import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { restaurants } from "../data/restaurants";
import { CUISINE_TYPES, NEIGHBORHOODS } from "../config";
import { icon } from "leaflet";

// Fix for default marker icons in react-leaflet
const defaultIcon = icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export function MapPage() {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);
  const [showCateringOnly, setShowCateringOnly] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Wait for component to mount before rendering map
    setIsMounted(true);
  }, []);

  const filteredRestaurants = restaurants.filter(r => {
    if (!r.lat || !r.lng) return false;
    
    if (selectedCuisines.length > 0) {
      if (!selectedCuisines.some(c => r.cuisine.includes(c))) return false;
    }
    
    if (selectedNeighborhoods.length > 0) {
      if (!selectedNeighborhoods.includes(r.neighborhood)) return false;
    }
    
    if (showCateringOnly && !r.catering) return false;
    
    return true;
  });

  const toggleFilter = (type: "cuisine" | "neighborhood", value: string) => {
    if (type === "cuisine") {
      setSelectedCuisines(prev =>
        prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
      );
    } else {
      setSelectedNeighborhoods(prev =>
        prev.includes(value) ? prev.filter(n => n !== value) : [...prev, value]
      );
    }
  };

  const clearFilters = () => {
    setSelectedCuisines([]);
    setSelectedNeighborhoods([]);
    setShowCateringOnly(false);
  };

  const hasActiveFilters = selectedCuisines.length > 0 || selectedNeighborhoods.length > 0 || showCateringOnly;

  // Pittsburgh center coordinates
  const pittsburghCenter: [number, number] = [40.4406, -79.9959];

  if (!isMounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-[600px] bg-[var(--stone)] rounded-xl">
          <p className="text-xl text-[var(--muted)]">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1
          className="text-4xl font-bold mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Restaurant Map
        </h1>
        <p className="text-lg text-[var(--muted)]">
          Explore Pittsburgh's local restaurants by location
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 p-6 bg-white border-2 border-[var(--ink)] rounded-xl">
        <div className="space-y-6">
          {/* Catering Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="catering-only"
              checked={showCateringOnly}
              onChange={(e) => setShowCateringOnly(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-[var(--ink)] text-[var(--coral)] focus:ring-[var(--coral)]"
            />
            <label htmlFor="catering-only" className="text-base font-medium cursor-pointer">
              🎉 Show only catering-available restaurants
            </label>
          </div>

          {/* Cuisine Filters */}
          <div>
            <h3
              className="text-sm uppercase tracking-wide text-[var(--muted)] mb-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Filter by Cuisine
            </h3>
            <div className="flex flex-wrap gap-2">
              {CUISINE_TYPES.map(cuisine => (
                <button
                  key={cuisine}
                  onClick={() => toggleFilter("cuisine", cuisine)}
                  className={`px-4 py-2 text-sm rounded-full border-2 transition-all ${
                    selectedCuisines.includes(cuisine)
                      ? "bg-[var(--sky)] border-[var(--sky)] text-white shadow-md"
                      : "bg-white border-[var(--ink)] hover:bg-[var(--stone)] hover:border-[var(--ink)]"
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Neighborhood Filters */}
          <div>
            <h3
              className="text-sm uppercase tracking-wide text-[var(--muted)] mb-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Filter by Neighborhood
            </h3>
            <div className="flex flex-wrap gap-2">
              {NEIGHBORHOODS.slice(0, -1).map(neighborhood => (
                <button
                  key={neighborhood}
                  onClick={() => toggleFilter("neighborhood", neighborhood)}
                  className={`px-4 py-2 text-sm rounded-full border-2 transition-all ${
                    selectedNeighborhoods.includes(neighborhood)
                      ? "bg-[var(--coral)] border-[var(--coral)] text-white shadow-md"
                      : "bg-white border-[var(--ink)] hover:bg-[var(--stone)] hover:border-[var(--ink)]"
                  }`}
                >
                  {neighborhood}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Summary */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--ink)]/20">
            <p className="text-sm font-medium" style={{ fontFamily: "var(--font-mono)" }}>
              Showing <span className="text-[var(--coral)] text-base font-bold">{filteredRestaurants.length}</span> restaurants on map
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-white bg-[var(--coral)] rounded-lg hover:bg-[var(--coral)]/90 font-medium transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="border-2 border-[var(--ink)] rounded-xl overflow-hidden shadow-lg" style={{ height: "600px" }}>
        <MapContainer
          center={pittsburghCenter}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredRestaurants.map(restaurant => (
            restaurant.lat && restaurant.lng && (
              <Marker
                key={restaurant.id}
                position={[restaurant.lat, restaurant.lng]}
                icon={defaultIcon}
              >
                <Popup maxWidth={280}>
                  <div className="p-2">
                    <h3 className="font-bold text-lg mb-1" style={{ fontFamily: "var(--font-display)" }}>
                      {restaurant.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {restaurant.cuisine.join(", ")}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      📍 {restaurant.neighborhood}
                    </p>
                    {restaurant.address && (
                      <p className="text-xs text-gray-500 mb-2">
                        {restaurant.address}
                      </p>
                    )}
                    {restaurant.catering && (
                      <span className="inline-block px-2 py-1 bg-[var(--gold)] text-xs rounded-full mb-2 font-medium">
                        🎉 Catering Available
                      </span>
                    )}
                    <br />
                    <a
                      href={restaurant.orderLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-4 py-2 bg-[var(--coral)] text-white text-sm rounded-lg hover:bg-[var(--coral)]/90 font-medium transition-colors"
                    >
                      Visit Website →
                    </a>
                  </div>
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      </div>

      {/* Legend & Info */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-white border-2 border-[var(--ink)] rounded-xl">
          <h3
            className="text-sm font-bold uppercase tracking-wide mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            How to Use
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-[var(--coral)] font-bold">•</span>
              <span>Click on any marker to see restaurant details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--coral)] font-bold">•</span>
              <span>Zoom and pan to explore different neighborhoods</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--coral)] font-bold">•</span>
              <span>Use filters above to narrow down your search</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--coral)] font-bold">•</span>
              <span>Click "Visit Website" in popups to order directly</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-[var(--gold)] border-2 border-[var(--ink)] rounded-xl">
          <h3
            className="text-sm font-bold uppercase tracking-wide mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Map Stats
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total Restaurants:</span>
              <span className="text-xl font-bold">{restaurants.filter(r => r.lat && r.lng).length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Currently Showing:</span>
              <span className="text-xl font-bold text-[var(--coral)]">{filteredRestaurants.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Catering Options:</span>
              <span className="text-xl font-bold">{restaurants.filter(r => r.catering && r.lat && r.lng).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}