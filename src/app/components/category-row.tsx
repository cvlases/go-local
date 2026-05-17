import { ChevronLeft, ChevronRight } from "lucide-react";
import { Restaurant } from "../data/restaurants";
import { RestaurantCard } from "./restaurant-card";
import { useRef } from "react";

interface CategoryRowProps {
  title: string;
  emoji?: string;
  icon?: string;
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
}

export function CategoryRow({
  title,
  emoji,
  icon,
  restaurants,
  onRestaurantClick,
}: CategoryRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 400;
    const newScrollLeft =
      scrollContainerRef.current.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);
    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  if (restaurants.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-xl font-bold uppercase tracking-wide"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {icon && <img src={icon} alt="" className="w-6 h-6 mr-2 inline-block" />}
          {!icon && emoji && <span className="mr-2">{emoji}</span>}
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 bg-[var(--stone)] border border-[var(--ink)] rounded-full hover:bg-[var(--ink)] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 bg-[var(--stone)] border border-[var(--ink)] rounded-full hover:bg-[var(--ink)] hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="flex-shrink-0 w-80">
            <RestaurantCard
              restaurant={restaurant}
              onClick={() => onRestaurantClick(restaurant)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
