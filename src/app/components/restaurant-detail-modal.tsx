import { X, Heart, ExternalLink, MapPin, Clock, DollarSign } from "lucide-react";
import { Restaurant } from "../data/restaurants";
import { restaurantImages } from "../data/images";
import { DIETARY_OPTIONS } from "../config";
import { useState, useEffect } from "react";
import { isRestaurantLiked, toggleLike } from "../utils/likes";

interface RestaurantDetailModalProps {
  restaurant: Restaurant;
  onClose: () => void;
}

export function RestaurantDetailModal({
  restaurant,
  onClose,
}: RestaurantDetailModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(restaurant.likes);

  useEffect(() => {
    setIsLiked(isRestaurantLiked(restaurant.id));
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [restaurant.id]);

  const handleLikeClick = () => {
    const newLikedState = toggleLike(restaurant.id);
    setIsLiked(newLikedState);
    setLocalLikes((prev) => (newLikedState ? prev + 1 : prev - 1));
    window.dispatchEvent(new Event("likes-updated"));
  };

  const imageUrl =
    restaurantImages[restaurant.image] ||
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
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
          {/* Title & Like */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2
                className="text-3xl font-bold mb-2"
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
            <button
              onClick={handleLikeClick}
              className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
            >
              <Heart
                className={`w-8 h-8 ${
                  isLiked
                    ? "fill-[var(--coral)] text-[var(--coral)]"
                    : "text-[var(--ink)]"
                }`}
              />
              <span className="text-sm font-medium">{localLikes}</span>
            </button>
          </div>

          {/* Info Row */}
          <div className="flex flex-wrap gap-4 text-sm">
            {restaurant.neighborhood && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--coral)]" />
                <span>{restaurant.neighborhood}</span>
              </div>
            )}
            {restaurant.hours && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--coral)]" />
                <span>{restaurant.hours}</span>
              </div>
            )}
            {restaurant.priceRange && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[var(--coral)]" />
                <span>{restaurant.priceRange}</span>
              </div>
            )}
          </div>

          {/* Address */}
          {restaurant.address && (
            <div className="text-sm text-[var(--muted)]">
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
                  className="text-sm font-bold uppercase tracking-wide mb-2"
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
                        className="px-3 py-1 bg-[var(--lime)] text-[var(--ink)] rounded-full text-sm font-medium"
                      >
                        {option.emoji} {option.label}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Catering */}
            {restaurant.catering && (
              <div>
                <h4
                  className="text-sm font-bold uppercase tracking-wide mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Catering
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[var(--gold)] text-[var(--ink)] rounded-full text-sm font-medium">
                    🎉 Catering Available
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
                  className="text-sm font-bold uppercase tracking-wide mb-2"
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <a
              href={restaurant.orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[var(--coral)] text-white rounded-lg hover:bg-[var(--coral)]/90 transition-colors font-medium"
            >
              Order / Visit Website
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Footer */}
          <div className="text-xs text-[var(--muted)] text-center pt-4 border-t border-[var(--ink)]/20">
            <p style={{ fontFamily: "var(--font-mono)" }}>
              Submitted by community · Added {new Date(restaurant.addedDate).toLocaleDateString()}
            </p>
            <a href="#" className="text-[var(--sky)] hover:underline mt-2 inline-block">
              Something wrong? Suggest an edit →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
