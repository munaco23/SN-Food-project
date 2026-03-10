import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './ProductsOfWeek.css';
import ProductImg1 from '../../../Images/hero1.jpg';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../../utils/auth';
import { isInWishlist, toggleWishlist } from '../../../utils/wishlist';
import { addToCart } from '../../../utils/cart';
import { API_BASE_URL } from '../../../utils/api';
import { ProductQuickView } from './ProductQuickView';

type Product = {
  id: string;
  name: string;
  variant: string;
  code: string;
  brand: string;
  tag: string;
  imageSrc: string;
  price?: number | null;
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

type CachedValue<T> = {
  ts: number;
  data: T;
};

export const ProductsOfWeek: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const PRODUCTS_TTL_MS = 10 * 60 * 1000;
  const [products, setProducts] = useState<Product[]>([]);
  const [currency, setCurrency] = useState<CurrencyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [, forceRerender] = useState(0);

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
  const featuredCacheKey = () => `pow:featured:v1`;

  useEffect(() => {
    const onChanged = () => forceRerender((v) => v + 1);
    window.addEventListener('wishlist:changed', onChanged);
    return () => window.removeEventListener('wishlist:changed', onChanged);
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const cached = readCache<{ products: Product[]; currency: CurrencyInfo | null }>(featuredCacheKey());
        if (cached && isFresh(cached.ts, PRODUCTS_TTL_MS) && Array.isArray(cached.data?.products) && cached.data.products.length) {
          setProducts(cached.data.products);
          if (cached.data.currency) setCurrency(cached.data.currency);
          setLoading(false);
        }

        const response = await fetch(`${API_BASE_URL}/api/products/featured`);
        const data = await response.json();
        if (data.ok) {
          setProducts(data.products);
          setCurrency(data.currency || null);
          writeCache(featuredCacheKey(), { ts: Date.now(), data: { products: data.products, currency: data.currency || null } } satisfies CachedValue<{ products: Product[]; currency: CurrencyInfo | null }>);
        } else {
          setError(data.message || 'Failed to fetch products');
        }
      } catch (err) {
        setError('Failed to connect to backend');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollerRef.current) return;
    isDragging.current = true;
    scrollerRef.current.classList.add('dragging');
    startX.current = e.pageX - scrollerRef.current.offsetLeft;
    scrollLeftStart.current = scrollerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    scrollerRef.current?.classList.remove('dragging');
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    scrollerRef.current?.classList.remove('dragging');
  };

  const scrollByCards = (direction: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;

    // Scroll exactly one card at a time (300px includes card width + gap)
    const cardWidth = 300;
    el.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
  };

  const handleQuickView = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  if (loading) {
    return (
      <section className="pow" aria-label={t('extra_sections.pow_title')}>
        <div className="pow-header">
          <h2 className="pow-title">{t('extra_sections.pow_title')}</h2>
        </div>
        <div className="pow-scroller" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <article key={i} className="pow-card pow-skel">
              <div className="pow-imageWrap">
                <div className="pow-skel-img" />
                <div className="pow-actions-sidebar">
                  <div className="pow-action-btn pow-skel-btn" />
                  <div className="pow-action-btn pow-skel-btn" />
                  <div className="pow-action-btn pow-skel-btn" />
                  <div className="pow-action-btn pow-skel-btn" />
                </div>
              </div>
              <div className="pow-body">
                <div className="pow-skel-line pow-skel-line--lg" />
                <div className="pow-skel-line pow-skel-line--md" />
                <div className="pow-skel-line pow-skel-line--sm" />
                <div className="pow-skel-line pow-skel-line--sm" />
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pow" aria-label={t('extra_sections.pow_title')}>
        <div className="pow-header">
          <h2 className="pow-title">{t('extra_sections.pow_title')}</h2>
        </div>
        <div className="pow-error">{error}</div>
      </section>
    );
  }

  return (
    <section className="pow" aria-label={t('extra_sections.pow_title')}>
      <div className="pow-header">
        <h2 className="pow-title">{t('extra_sections.pow_title')}</h2>
        <div className="pow-nav-buttons">
          <button className="pow-nav-btn" type="button" aria-label={t('slider.prev')} onClick={() => scrollByCards('left')}>
            <i className="fa-solid fa-chevron-left" />
          </button>
          <button className="pow-nav-btn" type="button" aria-label={t('slider.next')} onClick={() => scrollByCards('right')}>
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      </div>

      <div 
        className="pow-scroller" 
        ref={scrollerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {products.map((p) => (
          <article 
            key={p.id} 
            className="pow-card"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              // Only navigate if we didn't click an action button
              if (!(e.target as HTMLElement).closest('.pow-action-btn')) {
                navigate(`/product/${p.id}`);
              }
            }}
          >
            <div className="pow-imageWrap">
              <img className="pow-image" src={p.imageSrc || ProductImg1} alt={p.name} draggable="false" />
              
              <div className="pow-actions-sidebar">
                <button
                  className="pow-action-btn"
                  aria-label="Add to wishlist"
                  onClick={() => {
                    const user = getCurrentUser();
                    if (!user?.id) {
                      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
                      return;
                    }

                    toggleWishlist({
                      id: p.id,
                      name: p.name,
                      code: p.code,
                      brand: p.brand,
                      category: p.tag,
                      image: p.imageSrc
                    });
                  }}
                >
                  <i className={isInWishlist(p.id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
                </button>
                <button
                  className="pow-action-btn"
                  aria-label="Add to cart"
                  onClick={async () => {
                    const user = getCurrentUser();
                    if (!user?.id) {
                      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
                      return;
                    }

                    try {
                      await addToCart(String(p.id), 1);
                      window.dispatchEvent(new Event('cart:open'));
                    } catch (e) {
                      const status = (e as any)?.status;
                      if (status === 401) {
                        navigate(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
                        return;
                      }
                      console.error(e);
                    }
                  }}
                >
                  <i className="fa-solid fa-bag-shopping" />
                </button>
                <button className="pow-action-btn" aria-label="Compare">
                  <i className="fa-solid fa-right-left" />
                </button>
                <button 
                  className="pow-action-btn" 
                  aria-label="Quick view"
                  onClick={(e) => handleQuickView(e, p)}
                >
                  <i className="fa-solid fa-magnifying-glass" />
                </button>
              </div>
            </div>

            <div className="pow-body">
              <div className="pow-price">{formatPrice(p.price, currency)}</div>
              <div className="pow-name">{p.name}</div>
              <div className="pow-variant">{p.variant}</div>
              <div className="pow-code">{p.code}</div>
              <div className="pow-brand">{p.brand}</div>
              <div className="pow-tag">{p.tag}</div>
            </div>
          </article>
        ))}
      </div>

      <div className="pow-dots" aria-hidden="true">
        {products.slice(0, 3).map((_, i) => (
          <span key={i} className={`pow-dot ${i === 0 ? 'pow-dot--active' : ''}`} />
        ))}
      </div>

      <ProductQuickView 
        product={selectedProduct}
        currency={currency}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </section>
  );
};
