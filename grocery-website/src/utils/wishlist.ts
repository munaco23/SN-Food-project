import { getCurrentUser } from './auth';

export type WishlistItem = {
  id: string;
  name: string;
  code?: string;
  brand?: string;
  category?: string;
  image?: string | null;
  variant?: string;
  price?: number | null;
};

function keyForUser(userId: string | number) {
  return `wishlist:${userId}`;
}

export function getWishlist(): WishlistItem[] {
  const user = getCurrentUser();
  if (!user?.id) return [];

  try {
    const raw = localStorage.getItem(keyForUser(user.id));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as WishlistItem[]) : [];
  } catch {
    return [];
  }
}

export function setWishlist(items: WishlistItem[]) {
  const user = getCurrentUser();
  if (!user?.id) return;
  localStorage.setItem(keyForUser(user.id), JSON.stringify(items));
  window.dispatchEvent(new Event('wishlist:changed'));
}

export function isInWishlist(productId: string) {
  const list = getWishlist();
  return list.some((x) => x.id === productId);
}

export function toggleWishlist(item: WishlistItem) {
  const list = getWishlist();
  const exists = list.some((x) => x.id === item.id);
  const next = exists ? list.filter((x) => x.id !== item.id) : [item, ...list];
  setWishlist(next);
  return { added: !exists, items: next };
}

export function getWishlistCount() {
  return getWishlist().length;
}
