import { Heart } from "lucide-react";
import { Restaurant } from "../data/restaurants";
import { restaurantImages } from "../data/images";
import { DIETARY_OPTIONS } from "../config";
import { useState, useEffect } from "react";
import { isRestaurantLiked, toggleLike } from "../utils/likes";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: () => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(restaurant.likes);

  useEffect(() => {
    setIsLiked(isRestaurantLiked(restaurant.id));
  }, [restaurant.id]);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikedState = toggleLike(restaurant.id);
    setIsLiked(newLikedState);
    setLocalLikes(prev => newLikedState ? prev + 1 : prev - 1);
  };

  const imageUrl = restaurantImages[restaurant.image] || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600";

  return (
    <div
      onClick={onClick}
      className="bg-[var(--stone)] border-2 border-[var(--ink)] rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 space-y-3 flex flex-col flex-grow">
        {/* Name */}
        <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          {restaurant.name}
        </h3>

        {/* Cuisine & Neighborhood */}
        <div className="flex flex-wrap gap-2">
          {restaurant.cuisine.map((c) => (
            <span
              key={c}
              className="px-2 py-1 text-xs rounded-full bg-[var(--sky)] text-white font-medium"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {c}
            </span>
          ))}
          <span
            className="px-2 py-1 text-xs rounded-full bg-white border border-[var(--ink)] font-medium"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            📍 {restaurant.neighborhood}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm italic text-[var(--muted)] line-clamp-2">
          {restaurant.description}
        </p>

        {/* Dietary & Catering Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {restaurant.dietary.length > 0 && (
            <div className="flex gap-1">
              {restaurant.dietary.map((d) => {
                const option = DIETARY_OPTIONS.find((opt) => opt.id === d);
                return option ? (
                  <span key={d} className="text-base" title={option.label}>
                    {option.emoji}
                  </span>
                ) : null;
              })}
            </div>
          )}
          {restaurant.catering && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--gold)] rounded-full text-xs font-bold">
              🎉 Catering
            </span>
          )}
        </div>

        {/* Spacer to push bottom content down */}
        <div className="flex-grow" />

        {/* Bottom Row */}
        <div className="flex items-center justify-between pt-2 border-t-2 border-[var(--ink)]/20">
          <button
            onClick={handleLikeClick}
            className="flex items-center gap-1 hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? "fill-[var(--coral)] text-[var(--coral)]" : "text-[var(--ink)]"
              }`}
            />
            <span className="text-sm font-bold text-[var(--ink)]">{localLikes}</span>
          </button>

          <a
            href={restaurant.orderLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 bg-[var(--coral)] text-white font-bold rounded-lg hover:bg-[var(--coral)]/90 transition-colors text-sm"
          >
            Order / Visit
          </a>
        </div>

        {/* Attribution */}
        <p className="text-xs text-[var(--muted)] font-medium" style={{ fontFamily: "var(--font-mono)" }}>
          Submitted by community
        </p>
      </div>
    </div>
  );
}