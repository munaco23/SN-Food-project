import { API_BASE_URL } from './api';
import { getCurrentUser } from './auth';

type CurrencyInfo = {
  code: string | null;
  symbol: string;
  position: 'before' | 'after';
  digits: number;
};

export type CartItem = {
  productTemplateId: string;
  name: string;
  code?: string;
  price?: number | null;
  quantity: number;
  image?: string | null;
};

type CartState = {
  currency: CurrencyInfo | null;
  items: CartItem[];
  total: number;
};

function keyForUser(userId: string | number) {
  return `cart:${userId}`;
}

function safeParse(raw: string | null): CartState {
  if (!raw) return { currency: null, items: [], total: 0 };
  try {
    const parsed = JSON.parse(raw);
    const items = Array.isArray(parsed?.items) ? (parsed.items as CartItem[]) : [];
    const currency = parsed?.currency ?? null;
    const total = typeof parsed?.total === 'number' ? parsed.total : 0;
    return { currency, items, total };
  } catch {
    return { currency: null, items: [], total: 0 };
  }
}

export function getCartState(): CartState {
  const user = getCurrentUser();
  if (!user?.id) return { currency: null, items: [], total: 0 };
  const raw = localStorage.getItem(keyForUser(user.id));
  return safeParse(raw);
}

function token() {
  try {
    const t = localStorage.getItem('token');
    return t ? String(t) : null;
  } catch {
    return null;
  }
}

function ensureAuthHeaders() {
  const t = token();
  if (!t) {
    const err = new Error('Unauthorized');
    (err as any).status = 401;
    throw err;
  }
  return {
    Authorization: `Bearer ${t}`,
    'Content-Type': 'application/json'
  };
}

function setCartCache(next: CartState) {
  const user = getCurrentUser();
  if (!user?.id) return;
  localStorage.setItem(keyForUser(user.id), JSON.stringify(next));
  window.dispatchEvent(new Event('cart:changed'));
}

function normalizeFromApi(payload: any): CartState {
  const currency = payload?.currency ?? null;
  const cart = payload?.cart ?? null;
  const itemsRaw = Array.isArray(cart?.items) ? cart.items : [];
  const items: CartItem[] = itemsRaw
    .filter((x: any) => x?.productTemplateId)
    .map((x: any) => ({
      productTemplateId: String(x.productTemplateId),
      name: x.name || '',
      code: x.code || '',
      image: x.image || null,
      price: typeof x.price === 'number' ? x.price : null,
      quantity: typeof x.quantity === 'number' ? x.quantity : Number(x.quantity) || 0
    }));

  const total = typeof cart?.total === 'number' ? cart.total : 0;
  return { currency, items, total };
}

export async function refreshCart() {
  const user = getCurrentUser();
  if (!user?.id) {
    const err = new Error('Unauthorized');
    (err as any).status = 401;
    throw err;
  }

  const res = await fetch(`${API_BASE_URL}/api/cart`, {
    method: 'GET',
    headers: ensureAuthHeaders()
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.ok) {
    const err = new Error(data?.message || 'Failed to fetch cart');
    (err as any).status = res.status;
    throw err;
  }
  const next = normalizeFromApi(data);
  setCartCache(next);
  return next;
}

export async function addToCart(item: any, quantity = 1) {
  const user = getCurrentUser();
  if (!user?.id) {
    const err = new Error('Unauthorized');
    (err as any).status = 401;
    throw err;
  }

  // Handle both string ID and product object
  const productTemplateId = typeof item === 'string' ? item : String(item.id || item.productTemplateId);
  const itemData = typeof item === 'string' ? null : item;

  // Optimistic UI Update
  const state = getCartState();
  const existingIdx = state.items.findIndex(it => it.productTemplateId === productTemplateId);
  let nextItems = [...state.items];

  if (existingIdx > -1) {
    nextItems[existingIdx] = { ...nextItems[existingIdx], quantity: nextItems[existingIdx].quantity + quantity };
  } else if (itemData) {
    const newItem: CartItem = {
      productTemplateId,
      name: itemData.name || 'Loading...',
      code: itemData.code || '',
      price: typeof itemData.price === 'number' ? itemData.price : (itemData.list_price || null),
      image: itemData.image || itemData.imageSrc || itemData.image_128 || null,
      quantity: quantity
    };
    nextItems.unshift(newItem);
  }

  const nextTotal = nextItems.reduce((sum, it) => sum + (typeof it.price === 'number' ? it.price * it.quantity : 0), 0);
  const optimisticState = { ...state, items: nextItems, total: nextTotal };

  // Lock UI state
  localStorage.setItem(keyForUser(user.id), JSON.stringify(optimisticState));
  window.dispatchEvent(new Event('cart:changed'));

  const res = await fetch(`${API_BASE_URL}/api/cart/add`, {
    method: 'POST',
    headers: ensureAuthHeaders(),
    body: JSON.stringify({ productTemplateId, quantity })
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.ok) {
    const err = new Error(data?.message || 'Failed to add to cart');
    (err as any).status = res.status;
    throw err;
  }
  const next = normalizeFromApi(data);
  setCartCache(next);
  return next;
}

let isUpdating = false;

export async function updateCartQuantity(productTemplateId: string, delta: number) {
  if (isUpdating) return getCartState();
  
  const user = getCurrentUser();
  if (!user?.id) {
    const err = new Error('Unauthorized');
    (err as any).status = 401;
    throw err;
  }

  const state = getCartState();
  const item = state.items.find(it => it.productTemplateId === productTemplateId);
  if (!item) return state;

  const newQuantity = Math.max(1, item.quantity + delta);
  if (newQuantity === item.quantity) return state;

  try {
    isUpdating = true;
    const result = await addToCart(productTemplateId, delta);
    return result;
  } finally {
    isUpdating = false;
  }
}

export async function removeFromCart(productTemplateId: string) {
  const user = getCurrentUser();
  if (!user?.id) {
    const err = new Error('Unauthorized');
    (err as any).status = 401;
    throw err;
  }

  // Optimistic UI Update
  const state = getCartState();
  const nextItems = state.items.filter(item => item.productTemplateId !== productTemplateId);
  setCartCache({ ...state, items: nextItems });

  const res = await fetch(`${API_BASE_URL}/api/cart/remove`, {
    method: 'POST',
    headers: ensureAuthHeaders(),
    body: JSON.stringify({ productTemplateId })
  });
  console.log('Remove response status:', res.status);
  const data = await res.json().catch(() => null);
  console.log('Remove response data:', data);
  if (!res.ok || !data?.ok) {
    // Rollback cache on failure
    refreshCart(); 
    const err = new Error(data?.message || 'Failed to remove from cart');
    (err as any).status = res.status;
    throw err;
  }
  const next = normalizeFromApi(data);
  setCartCache(next);
  return next;
}

export async function emptyCart() {
  const user = getCurrentUser();
  if (!user?.id) {
    const err = new Error('Unauthorized');
    (err as any).status = 401;
    throw err;
  }

  const res = await fetch(`${API_BASE_URL}/api/cart/empty`, {
    method: 'POST',
    headers: ensureAuthHeaders(),
    body: JSON.stringify({})
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.ok) {
    const err = new Error(data?.message || 'Failed to empty cart');
    (err as any).status = res.status;
    throw err;
  }
  const next = normalizeFromApi(data);
  setCartCache(next);
  return next;
}

export function getCartCount() {
  const state = getCartState();
  return state.items.reduce((sum, it) => sum + (Number(it.quantity) || 0), 0);
}

export function getCartTotal() {
  const state = getCartState();
  return typeof state.total === 'number' && Number.isFinite(state.total)
    ? state.total
    : state.items.reduce((sum, it) => sum + (typeof it.price === 'number' ? it.price * (Number(it.quantity) || 0) : 0), 0);
}

export function getCartCurrency() {
  return getCartState().currency;
}
