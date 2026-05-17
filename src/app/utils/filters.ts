import { Restaurant } from "../data/restaurants";

export interface Filters {
  search: string;
  cuisine: string[];
  dietary: string[];
  service: string[];
  catering: string[];
  neighborhood: string[];
}

export function filterRestaurants(
  restaurants: Restaurant[],
  filters: Filters
): Restaurant[] {
  return restaurants.filter((restaurant) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.description.toLowerCase().includes(searchTerm) ||
        restaurant.cuisine.some((c) => c.toLowerCase().includes(searchTerm)) ||
        restaurant.neighborhood.toLowerCase().includes(searchTerm);
      if (!matchesSearch) return false;
    }

    // Cuisine filter (OR logic)
    if (filters.cuisine.length > 0) {
      const matchesCuisine = filters.cuisine.some((c) =>
        restaurant.cuisine.includes(c)
      );
      if (!matchesCuisine) return false;
    }

    // Dietary filter (OR logic)
    if (filters.dietary.length > 0) {
      const matchesDietary = filters.dietary.some((d) =>
        restaurant.dietary.includes(d)
      );
      if (!matchesDietary) return false;
    }

    // Service filter (OR logic)
    if (filters.service.length > 0) {
      const matchesService = filters.service.some((s) =>
        restaurant.service.includes(s)
      );
      if (!matchesService) return false;
    }

    // Catering filter
    if (filters.catering.length > 0) {
      if (filters.catering.includes("Catering Available") && !restaurant.catering) {
        return false;
      }
      if (
        filters.catering.includes("Large Groups (10+)") &&
        (!restaurant.cateringCapacity || restaurant.cateringCapacity < 10)
      ) {
        return false;
      }
    }

    // Neighborhood filter (OR logic)
    if (filters.neighborhood.length > 0) {
      if (!filters.neighborhood.includes(restaurant.neighborhood)) {
        return false;
      }
    }

    return true;
  });
}

export function sortRestaurants(
  restaurants: Restaurant[],
  sortBy: "likes" | "newest" | "name" | "neighborhood"
): Restaurant[] {
  const sorted = [...restaurants];

  switch (sortBy) {
    case "likes":
      return sorted.sort((a, b) => b.likes - a.likes);
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
      );
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "neighborhood":
      return sorted.sort((a, b) => a.neighborhood.localeCompare(b.neighborhood));
    default:
      return sorted;
  }
}

export function getRestaurantsByCategory(
  restaurants: Restaurant[],
  category: string
): Restaurant[] {
  return restaurants.filter((r) => r.categories.includes(category));
}
