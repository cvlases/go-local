// Like system utilities using localStorage

const LIKES_KEY = "golocal_likes";

export function getLikedRestaurants(): string[] {
  try {
    const likes = localStorage.getItem(LIKES_KEY);
    return likes ? JSON.parse(likes) : [];
  } catch {
    return [];
  }
}

export function isRestaurantLiked(restaurantId: string): boolean {
  const likes = getLikedRestaurants();
  return likes.includes(restaurantId);
}

export function toggleLike(restaurantId: string): boolean {
  const likes = getLikedRestaurants();
  const index = likes.indexOf(restaurantId);
  
  if (index > -1) {
    likes.splice(index, 1);
    localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
    return false;
  } else {
    likes.push(restaurantId);
    localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
    return true;
  }
}

export function getLikesCount(): number {
  return getLikedRestaurants().length;
}
