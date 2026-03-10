import React, { useEffect, useMemo, useState } from 'react';
import './TopRatedSection.css';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../../utils/auth';
import { isInWishlist, toggleWishlist } from '../../../utils/wishlist';
import { API_BASE_URL } from '../../../utils/api';
import { addToCart } from '../../../utils/cart';

type Product = {
  id: string;
  name: string;
  variant: string;
  code: string;
  tag: string;
  imageSrc: string;
  price?: number | null;
  oldPrice?: number | null;
  discount?: string;
};

type CachedValue<T> = {
  ts: number;
  data: T;
};

type CurrencyInfo = {
  code: string | null;
  symbol: string;
  position: 'before' | 'after';
  digits: number;
};

const formatPrice = (value: number | null | undefined, currency?: CurrencyInfo | null) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '';
  const digits = typeof currency?.digits === 'number' ? currency.digits : 2;
  const symbol = currency?.symbol || '$';
  const position = currency?.position || 'after';
  const numberText = value.toFixed(digits);
  return position === 'before' ? `${symbol} ${numberText}` : `${numberText} ${symbol}`;
};

export const TopRatedSection: React.FC = () => {
  const navigate = useNavigate();
  const [, forceRerender] = useState(0);
  const PRODUCTS_TTL_MS = 10 * 60 * 1000;
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [bestSelling, setBestSelling] = useState<Product[]>([]);
  const [currency, setCurrency] = useState<CurrencyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onChanged = () => forceRerender((v) => v + 1);
    window.addEventListener('wishlist:changed', onChanged);
    return () => window.removeEventListener('wishlist:changed', onChanged);
  }, []);

  const readCache = <T,>(key: string): CachedValue<T> | null => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const writeCache = (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  };

  const isFresh = (ts: number, ttlMs: number) => Date.now() - ts <= ttlMs;
  const topCacheKey = () => `top-products:v1`;
  const bestCacheKey = () => `best-selling:v1`;

  useEffect(() => {
    const load = async () => {
      try {
        setError(null);
        setLoading(true);

        const cachedTop = readCache<{ products: Product[]; currency: CurrencyInfo | null }>(topCacheKey());
        const cachedBest = readCache<{ products: Product[]; currency: CurrencyInfo | null }>(bestCacheKey());
        let usedCache = false;

        if (cachedTop && isFresh(cachedTop.ts, PRODUCTS_TTL_MS) && Array.isArray(cachedTop.data?.products) && cachedTop.data.products.length) {
          setTopProducts(cachedTop.data.products);
          if (cachedTop.data.currency) setCurrency(cachedTop.data.currency);
          usedCache = true;
        }
        if (cachedBest && isFresh(cachedBest.ts, PRODUCTS_TTL_MS) && Array.isArray(cachedBest.data?.products) && cachedBest.data.products.length) {
          setBestSelling(cachedBest.data.products);
          if (cachedBest.data.currency) setCurrency(cachedBest.data.currency);
          usedCache = true;
        }
        if (usedCache) setLoading(false);

        const [topRes, bestRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/products/top?limit=8`),
          fetch(`${API_BASE_URL}/api/products/best-selling?limit=4`)
        ]);
        const [topData, bestData] = await Promise.all([topRes.json(), bestRes.json()]);
        if (!topData.ok) throw new Error(topData.message || 'Failed to fetch top products');
        if (!bestData.ok) throw new Error(bestData.message || 'Failed to fetch best selling products');

        const nextCurrency: CurrencyInfo | null = topData.currency || bestData.currency || null;
        if (nextCurrency) setCurrency(nextCurrency);

        const mappedTop: Product[] = (topData.products || []).map((p: any) => ({
          id: String(p.id),
          name: p.name || '',
          variant: p.variant || '',
          code: p.code || '',
          tag: p.category || p.tag || '',
          imageSrc: p.imageSrc || p.image || '',
          price: p.price ?? null
        }));

        const mappedBest: Product[] = (bestData.products || []).map((p: any) => ({
          id: String(p.id),
          name: p.name || '',
          variant: p.variant || '',
          code: p.code || '',
          tag: p.category || p.tag || '',
          imageSrc: p.imageSrc || p.image || '',
          price: p.price ?? null
        }));

        setTopProducts(mappedTop);
        setBestSelling(mappedBest);

        writeCache(topCacheKey(), { ts: Date.now(), data: { products: mappedTop, currency: nextCurrency } } satisfies CachedValue<{ products: Product[]; currency: CurrencyInfo | null }>);
        writeCache(bestCacheKey(), { ts: Date.now(), data: { products: mappedBest, currency: nextCurrency } } satisfies CachedValue<{ products: Product[]; currency: CurrencyInfo | null }>);
      } catch (e) {
        setError('Failed to fetch data from server');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const topRatedProducts = useMemo(() => topProducts, [topProducts]);
  const bestSellingProducts = useMemo(() => bestSelling, [bestSelling]);

  return (
    <section className="top-rated-section">
      <div className="top-rated-container">
        <div className="top-rated-left">
          <div className="section-header">
            <h2 className="section-title">Top Products</h2>
            <button className="see-more-btn">See More &gt;</button>
          </div>
          <div className="products-grid">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <article key={i} className="tr-card tr-skel" aria-hidden="true">
                    <div className="tr-image-wrap">
                      <div className="tr-tag tr-skel-line tr-skel-line--sm" />
                      <div className="tr-skel-img" />
                      <div className="tr-actions-sidebar">
                        <div className="tr-action-btn tr-skel-btn" />
                        <div className="tr-action-btn tr-skel-btn" />
                        <div className="tr-action-btn tr-skel-btn" />
                        <div className="tr-action-btn tr-skel-btn" />
                      </div>
                    </div>
                    <div className="tr-body">
                      <div className="tr-price-row">
                        <span className="tr-current-price tr-skel-line tr-skel-line--md" />
                      </div>
                      <h3 className="tr-name tr-skel-line tr-skel-line--lg" />
                    </div>
                  </article>
                ))
              : topRatedProducts.map((p) => (
              <article
                key={p.id}
                className="tr-card"
                onClick={(e) => {
                  if (!(e.target as HTMLElement).closest('.tr-action-btn')) {
                    navigate(`/product/${p.id}`);
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="tr-image-wrap">
                  <div className="tr-tag">{p.tag}</div>
                  <img src={p.imageSrc} alt={p.name} className="tr-image" />
                  <div className="tr-actions-sidebar">
                    <button
                      className="tr-action-btn"
                      aria-label="Add to wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        const user = getCurrentUser();
                        if (!user?.id) {
                          navigate(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
                          return;
                        }

                        toggleWishlist({
                          id: p.id,
                          name: p.name,
                          code: p.code,
                          brand: 'SN Food',
                          category: p.tag,
                          image: p.imageSrc,
                          variant: p.variant
                        });
                      }}
                    >
                      <i className={isInWishlist(p.id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
                    </button>
                    <button
                      className="tr-action-btn"
                      aria-label="Add to cart"
                      onClick={async (e) => {
                        e.stopPropagation();
                        const user = getCurrentUser();
                        if (!user?.id) {
                          navigate(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
                          return;
                        }
                        try {
                          await addToCart(p.id, 1);
                          window.dispatchEvent(new Event('cart:open'));
                        } catch (err) {
                          console.error('Failed to add to cart:', err);
                        }
                      }}
                    >
                      <i className="fa-solid fa-bag-shopping" />
                    </button>
                    <button className="tr-action-btn" aria-label="Compare" onClick={(e) => e.stopPropagation()}>
                      <i className="fa-solid fa-right-left" />
                    </button>
                    <button className="tr-action-btn" aria-label="Quick view" onClick={(e) => e.stopPropagation()}>
                      <i className="fa-solid fa-magnifying-glass" />
                    </button>
                  </div>
                </div>
                <div className="tr-body">
                  <div className="tr-price-row">
                    <span className="tr-current-price">{formatPrice(p.price, currency)}</span>
                    {p.oldPrice && <span className="tr-old-price">{formatPrice(p.oldPrice, currency)}</span>}
                    {p.discount && <span className="tr-discount-badge">{p.discount}</span>}
                  </div>
                  <h3 className="tr-name">{p.name}</h3>
                </div>
              </article>
            ))}

            {!loading && error && (
              <div className="tr-error" role="alert">{error}</div>
            )}
          </div>
        </div>

        <aside className="top-rated-right">
          <div className="sidebar-header">
            <h2 className="sidebar-title">Best Selling</h2>
          </div>
          <div className="best-selling-list">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bs-item bs-skel" aria-hidden="true">
                    <div className="bs-image-wrap">
                      <div className="bs-skel-img" />
                    </div>
                    <div className="bs-content">
                      <div className="bs-skel-line bs-skel-line--lg" />
                      <div className="bs-skel-line bs-skel-line--sm" />
                    </div>
                  </div>
                ))
              : bestSellingProducts.map((p) => (
              <div
                key={p.id}
                className="bs-item"
                onClick={() => navigate(`/product/${p.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="bs-image-wrap">
                  <img src={p.imageSrc} alt={p.name} className="bs-image" />
                </div>
                <div className="bs-content">
                  <h4 className="bs-name">{p.name}</h4>
                  <div className="bs-price-row">
                    <span className="bs-current-price">{formatPrice(p.price, currency)}</span>
                    {p.oldPrice && <span className="bs-old-price">{formatPrice(p.oldPrice, currency)}</span>}
                  </div>
                  <div className="bs-actions">
                    <button
                      className="bs-action-btn"
                      type="button"
                      aria-label="Add to wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        const user = getCurrentUser();
                        if (!user?.id) {
                          navigate(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
                          return;
                        }

                        toggleWishlist({
                          id: p.id,
                          name: p.name,
                          code: p.code,
                          brand: 'SN Food',
                          category: p.tag,
                          image: p.imageSrc,
                          variant: p.variant
                        });
                      }}
                    >
                      <i className={isInWishlist(p.id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
                    </button>
                    <button
                      className="bs-action-btn"
                      type="button"
                      aria-label="Add to cart"
                      onClick={async (e) => {
                        e.stopPropagation();
                        const user = getCurrentUser();
                        if (!user?.id) {
                          navigate(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
                          return;
                        }
                        try {
                          await addToCart(p.id, 1);
                          window.dispatchEvent(new Event('cart:open'));
                        } catch (err) {
                          console.error('Failed to add to cart:', err);
                        }
                      }}
                    >
                      <i className="fa-solid fa-bag-shopping" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};
