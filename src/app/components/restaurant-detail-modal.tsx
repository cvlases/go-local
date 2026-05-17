import { X, ExternalLink, Clock } from "lucide-react";
import { Restaurant } from "../data/restaurants";
import { restaurantImages } from "../data/images";
import { DIETARY_OPTIONS } from "../config";
import { DIETARY_ICONS, locationPin, catering as cateringIcon, heart } from "../../assets/icons";
import phdcLogo from "../../assets/partners/PHDC-logo.png";

const VEGAN_SAGE = "#6a9982";

interface RestaurantDetailModalProps {
  restaurant: Restaurant;
  onClose: () => void;
}

export function RestaurantDetailModal({
  restaurant,
  onClose,
}: RestaurantDetailModalProps) {
  const imageUrl =
    restaurantImages[restaurant.image] ||
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-[var(--cream)] border-2 border-[var(--ink)] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64 md:h-80">
          <img
            src={imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title & Like Count */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2
                className="text-3xl font-semibold mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {restaurant.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {restaurant.cuisine.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1 text-sm rounded-full bg-[var(--sky)] text-white"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <img src={heart} alt="likes" className="w-7 h-7 opacity-70" />
              <span className="text-sm font-medium">{restaurant.likes}</span>
            </div>
          </div>

          {/* Info Row */}
          <div className="flex flex-wrap gap-4 text-sm">
            {restaurant.neighborhood && (
              <div className="flex items-center gap-2">
                <img src={locationPin} alt="" className="w-4 h-4" />
                <span>{restaurant.neighborhood}</span>
              </div>
            )}
            {restaurant.hours && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--ink)]" />
                <span>{restaurant.hours}</span>
              </div>
            )}
          </div>

          {/* Address */}
          {restaurant.address && (
            <div className="text-sm text-[var(--ink)]">
              {restaurant.address}
            </div>
          )}

          {/* Description */}
          <div className="py-4 border-y border-[var(--ink)]/20">
            <p className="text-lg italic">{restaurant.description}</p>
          </div>

          {/* Badges */}
          <div className="space-y-3">
            {/* Dietary */}
            {restaurant.dietary.length > 0 && (
              <div>
                <h4
                  className="text-sm font-semibold uppercase tracking-wide mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Dietary Options
                </h4>
                <div className="flex flex-wrap gap-2">
                  {restaurant.dietary.map((d) => {
                    const option = DIETARY_OPTIONS.find((opt) => opt.id === d);
                    return option ? (
                      <span
                        key={d}
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-[var(--ink)] rounded-full text-sm font-medium"
                        style={{ backgroundColor: (d === "vegan" || d === "vegetarian") ? VEGAN_SAGE : "var(--lime)" }}
                      >
                        <img src={DIETARY_ICONS[d] ?? option.emoji} alt="" className="w-4 h-4" />
                        {option.label}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* PHDC Incubated */}
            {restaurant.phdcIncubated && (
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium text-white" style={{ backgroundColor: "#9161a3" }}>
                    <img src={phdcLogo} alt="" className="w-4 h-4 brightness-0 invert" />
                    PHDC Incubated Business
                  </span>
                </div>
              </div>
            )}

            {/* Catering */}
            {restaurant.catering && (
              <div>
                <h4
                  className="text-sm font-semibold uppercase tracking-wide mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Catering
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--gold)] text-[var(--ink)] rounded-full text-sm font-medium">
                    <img src={cateringIcon} alt="" className="w-4 h-4" />
                    Catering Available
                  </span>
                  {restaurant.cateringCapacity && (
                    <span className="px-3 py-1 bg-[var(--stone)] border border-[var(--ink)] rounded-full text-sm">
                      Capacity: {restaurant.cateringCapacity}+ people
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Service */}
            {restaurant.service.length > 0 && (
              <div>
                <h4
                  className="text-sm font-semibold uppercase tracking-wide mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Service
                </h4>
                <div className="flex flex-wrap gap-2">
                  {restaurant.service.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 bg-[var(--stone)] border border-[var(--ink)] rounded-full text-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <a
              href={restaurant.orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#bacce7] text-[var(--ink)] rounded-lg hover:opacity-80 transition-opacity font-semibold"
            >
              Order / Visit Website
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Footer */}
          <div className="text-xs text-[var(--ink)] text-center pt-4 border-t border-[var(--ink)]/20">
            <p style={{ fontFamily: "var(--font-mono)" }}>
              Submitted by community · Added {new Date(restaurant.addedDate).toLocaleDateString()}
            </p>
            <a href="#" className="text-[var(--ink)] hover:underline mt-2 inline-block">
              Something wrong? Suggest an edit →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
