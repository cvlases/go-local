import { Heart } from "lucide-react";
import { Restaurant } from "../data/restaurants";
import { restaurantImages } from "../data/images";
import { DIETARY_OPTIONS } from "../config";
import { useState, useEffect } from "react";
import { isRestaurantLiked, toggleLike } from "../utils/likes";
import { DIETARY_ICONS, locationPin, catering as cateringIcon } from "../../assets/icons";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: () => void;
}

const VEGAN_SAGE = "#6a9982";

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

  const dietaryBg = (id: string) =>
    id === "vegan" || id === "vegetarian" ? VEGAN_SAGE : "var(--lime)";

  return (
    <div
      onClick={onClick}
      className="bg-[var(--stone)] border-2 border-[var(--ink)] rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img src={imageUrl} alt={restaurant.name} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 space-y-3 flex flex-col flex-grow">
        {/* Name */}
        <h3 className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
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
            className="px-2 py-1 text-xs rounded-full bg-white border border-[var(--ink)] font-medium flex items-center gap-1"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <img src={locationPin} alt="" className="w-3 h-3" />
            {restaurant.neighborhood}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm italic text-[var(--ink)] line-clamp-2">
          {restaurant.description}
        </p>

        {/* Dietary & Catering Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {restaurant.dietary.map((d) => {
            const option = DIETARY_OPTIONS.find((opt) => opt.id === d);
            return option ? (
              <span
                key={d}
                className="inline-flex items-center gap-1 px-2 py-1 text-[var(--ink)] rounded-full text-xs font-medium"
                style={{ backgroundColor: dietaryBg(d) }}
              >
                <img src={DIETARY_ICONS[d] ?? option.emoji} alt="" className="w-3 h-3" />
                {option.label}
              </span>
            ) : null;
          })}
          {restaurant.catering && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--gold)] text-[var(--ink)] rounded-full text-xs font-medium">
              <img src={cateringIcon} alt="" className="w-3 h-3" />
              Catering
            </span>
          )}
        </div>

        <div className="flex-grow" />

        {/* Bottom Row */}
        <div className="flex items-center justify-between pt-2 border-t-2 border-[var(--ink)]/20">
          <button
            onClick={handleLikeClick}
            className="flex items-center gap-1.5 hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-6 h-6 ${isLiked ? "fill-[#F04D5A] text-[#F04D5A]" : "text-[var(--ink)]"}`}
            />
            <span className="text-sm font-medium text-[var(--ink)]">{localLikes}</span>
          </button>

          <a
            href={restaurant.orderLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 bg-[#bacce7] text-[var(--ink)] font-semibold rounded-lg hover:opacity-80 transition-opacity text-sm"
          >
            Order / Visit
          </a>
        </div>

      </div>
    </div>
  );
}
