import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";
import { restaurants } from "../data/restaurants";
import { CUISINE_TYPES, NEIGHBORHOODS } from "../config";
import locationPinSrc from "../../assets/icons/location-pin.png";

const customIcon = icon({
  iconUrl: locationPinSrc,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -34],
});

export function MapPage() {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);
  const [showCateringOnly, setShowCateringOnly] = useState(false);

  const filteredRestaurants = restaurants.filter(r => {
    if (!r.lat || !r.lng) return false;
    if (selectedCuisines.length > 0 && !selectedCuisines.some(c => r.cuisine.includes(c))) return false;
    if (selectedNeighborhoods.length > 0 && !selectedNeighborhoods.includes(r.neighborhood)) return false;
    if (showCateringOnly && !r.catering) return false;
    return true;
  });

  const toggleFilter = (type: "cuisine" | "neighborhood", value: string) => {
    if (type === "cuisine") {
      setSelectedCuisines(prev => prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]);
    } else {
      setSelectedNeighborhoods(prev => prev.includes(value) ? prev.filter(n => n !== value) : [...prev, value]);
    }
  };

  const clearFilters = () => {
    setSelectedCuisines([]);
    setSelectedNeighborhoods([]);
    setShowCateringOnly(false);
  };

  const hasActiveFilters = selectedCuisines.length > 0 || selectedNeighborhoods.length > 0 || showCateringOnly;
  const pittsburghCenter: [number, number] = [40.4406, -79.9959];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1
          className="text-4xl font-bold mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Restaurant Map
        </h1>
        <p className="text-lg text-[var(--ink)]">
          Explore Pittsburgh's local restaurants by location
        </p>
      </div>

      {/* Map */}
      <div className="border-2 border-[var(--ink)] rounded-xl overflow-hidden shadow-lg mb-8 golocal-map" style={{ height: "560px" }}>
        <MapContainer
          center={pittsburghCenter}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          {filteredRestaurants.map(restaurant =>
            restaurant.lat && restaurant.lng ? (
              <Marker
                key={restaurant.id}
                position={[restaurant.lat, restaurant.lng]}
                icon={customIcon}
              >
                <Popup maxWidth={260}>
                  <div className="p-1">
                    <h3 className="font-bold text-base mb-1" style={{ fontFamily: "var(--font-display)" }}>
                      {restaurant.name}
                    </h3>
                    <p className="text-sm mb-0.5">{restaurant.cuisine.join(", ")}</p>
                    <p className="text-sm mb-2">{restaurant.neighborhood}</p>
                    {restaurant.address && (
                      <p className="text-xs text-gray-500 mb-2">{restaurant.address}</p>
                    )}
                    {restaurant.catering && (
                      <span className="inline-block px-2 py-0.5 bg-[var(--gold)] text-xs rounded-full mb-2 font-medium">
                        Catering Available
                      </span>
                    )}
                    <br />
                    <a
                      href={restaurant.orderLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1 px-4 py-1.5 bg-[#bacce7] text-[var(--ink)] text-sm rounded-lg font-medium hover:opacity-80 transition-opacity"
                    >
                      Visit Website →
                    </a>
                  </div>
                </Popup>
              </Marker>
            ) : null
          )}
        </MapContainer>
      </div>

      {/* Filters */}
      <div className="p-6 bg-white border-2 border-[var(--ink)] rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-medium" style={{ fontFamily: "var(--font-mono)" }}>
            Showing <span className="font-bold text-base">{filteredRestaurants.length}</span> of {restaurants.filter(r => r.lat && r.lng).length} restaurants
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm bg-[var(--stone)] border-2 border-[var(--ink)] rounded-lg font-medium hover:bg-[var(--ink)] hover:text-white transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="space-y-5">
          {/* Catering Toggle */}
          <label className="flex items-center gap-3 cursor-pointer w-fit">
            <input
              type="checkbox"
              checked={showCateringOnly}
              onChange={(e) => setShowCateringOnly(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-[var(--ink)] accent-[var(--sky)]"
            />
            <span className="text-sm font-medium">Catering-available only</span>
          </label>

          {/* Cuisine Filters */}
          <div>
            <h3
              className="text-xs uppercase tracking-wide text-[var(--ink)] mb-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Cuisine
            </h3>
            <div className="flex flex-wrap gap-2">
              {CUISINE_TYPES.map(cuisine => (
                <button
                  key={cuisine}
                  onClick={() => toggleFilter("cuisine", cuisine)}
                  className={`px-3 py-1.5 text-sm rounded-full border-2 transition-colors ${
                    selectedCuisines.includes(cuisine)
                      ? "bg-[var(--sky)] border-[var(--sky)] text-white"
                      : "bg-white border-[var(--ink)]/30 hover:border-[var(--ink)] hover:bg-[var(--stone)]"
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
              className="text-xs uppercase tracking-wide text-[var(--ink)] mb-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Neighborhood
            </h3>
            <div className="flex flex-wrap gap-2">
              {NEIGHBORHOODS.filter(n => n !== "Other").map(neighborhood => (
                <button
                  key={neighborhood}
                  onClick={() => toggleFilter("neighborhood", neighborhood)}
                  className={`px-3 py-1.5 text-sm rounded-full border-2 transition-colors ${
                    selectedNeighborhoods.includes(neighborhood)
                      ? "bg-[var(--ink)] border-[var(--ink)] text-white"
                      : "bg-white border-[var(--ink)]/30 hover:border-[var(--ink)] hover:bg-[var(--stone)]"
                  }`}
                >
                  {neighborhood}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
