import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './NewArrivalsGrid.css';
import ProductImg1 from '../../../Images/hero1.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../../utils/auth';
import { isInWishlist, toggleWishlist } from '../../../utils/wishlist';
import { addToCart } from '../../../utils/cart';
import { API_BASE_URL } from '../../../utils/api';
import { ProductQuickView } from '../../sections/ProductsOfWeek/ProductQuickView';

type Product = {
  id: string;
  name: string;
  code: string;
  brand: string;
  category: string;
  image: string;
  variant?: string;
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

type Category = {
  id: string;
  name: string;
  count: number;
};

type ProductsMeta = {
  limit: number;
  offset: number;
  returned: number;
  total: number;
  hasMore: boolean;
};

type CachedValue<T> = {
  ts: number;
  data: T;
};

export const NewArrivalsGrid: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const PAGE_SIZE = 24;
  const CATEGORIES_TTL_MS = 24 * 60 * 60 * 1000;
  const PRODUCTS_TTL_MS = 10 * 60 * 1000;
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'name_asc' | 'name_desc'>('default');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [allTotal, setAllTotal] = useState(0);
  const [currency, setCurrency] = useState<CurrencyInfo | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
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

  const categoriesCacheKey = () => `na:categories:v1`;
  const productsCacheKey = (categoryId: string | null) => `na:products:v1:cat=${categoryId ?? 'all'}:limit=${PAGE_SIZE}:offset=0`;

  useEffect(() => {
    const onChanged = () => forceRerender((v) => v + 1);
    window.addEventListener('wishlist:changed', onChanged);
    return () => window.removeEventListener('wishlist:changed', onChanged);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cached = readCache<Category[]>(categoriesCacheKey());
        if (cached && isFresh(cached.ts, CATEGORIES_TTL_MS) && Array.isArray(cached.data)) {
          setCategories(cached.data);
        }
        const catRes = await fetch(`${API_BASE_URL}/api/products/categories`);
        const catData = await catRes.json();
        if (catData.ok) {
          setCategories(catData.categories);
          writeCache(categoriesCacheKey(), { ts: Date.now(), data: catData.categories } satisfies CachedValue<Category[]>);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const fetchProductsPage = async (nextOffset: number, mode: 'replace' | 'append', categoryId: string | null) => {
    const qp = new URLSearchParams({
      limit: String(PAGE_SIZE),
      offset: String(nextOffset)
    });
    if (categoryId) {
      const catObj = categories.find(c => c.id === categoryId);
      if (catObj) {
        qp.set('category', catObj.name);
      } else {
        qp.set('category', categoryId);
      }
    }
    const url = `${API_BASE_URL}/api/products/all?${qp.toString()}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.ok) throw new Error(data.message || 'Failed to fetch products');

    if (data.currency) {
      setCurrency(data.currency);
    }

    const incoming: Product[] = data.products || [];
    setProducts((prev) => (mode === 'append' ? [...prev, ...incoming] : incoming));
    setOffset(nextOffset + incoming.length);
    const meta: ProductsMeta | undefined = data.meta;
    setHasMore(Boolean(meta?.hasMore));
    const nextTotal = Number(meta?.total ?? 0);
    setTotal(nextTotal);
    if (!categoryId) {
      setAllTotal(nextTotal);
    }

    if (nextOffset === 0 && mode === 'replace') {
      writeCache(productsCacheKey(categoryId), {
        ts: Date.now(),
        data: {
          products: incoming,
          currency: data.currency || null,
          meta: {
            limit: Number(meta?.limit ?? PAGE_SIZE),
            offset: 0,
            returned: incoming.length,
            total: nextTotal,
            hasMore: Boolean(meta?.hasMore)
          } satisfies ProductsMeta
        }
      } satisfies CachedValue<{ products: Product[]; currency: CurrencyInfo | null; meta: ProductsMeta }>);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        setError(null);
        setInitialLoading(true);
        setHasMore(true);
        setOffset(0);
        setTotal(0);
        if (!selectedCategoryId) setAllTotal(0);

        const cached = readCache<{ products: Product[]; currency: CurrencyInfo | null; meta: ProductsMeta }>(productsCacheKey(selectedCategoryId));
        if (cached && isFresh(cached.ts, PRODUCTS_TTL_MS) && cached.data?.products) {
          const cachedProducts = cached.data.products;
          const cachedMeta = cached.data.meta;
          if (cached.data.currency) setCurrency(cached.data.currency);
          setProducts(cachedProducts);
          setOffset(cachedProducts.length);
          setHasMore(Boolean(cachedMeta?.hasMore));
          setTotal(Number(cachedMeta?.total ?? 0));
          if (!selectedCategoryId) {
            setAllTotal(Number(cachedMeta?.total ?? 0));
          }
          setInitialLoading(false);
        }

        await fetchProductsPage(0, 'replace', selectedCategoryId);
      } catch (err) {
        setError('Failed to fetch data from server');
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryId]);

  const filteredProducts = products;

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    list.sort((a, b) => {
      if (sortBy === 'default') return 0;
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
    return list;
  }, [filteredProducts, sortBy]);

  const handleQuickView = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    // Map NewArrivals product to QuickView product format
    setSelectedProduct({
      id: product.id,
      name: product.name,
      variant: product.variant || '',
      code: product.code,
      brand: product.brand,
      tag: product.category,
      imageSrc: product.image,
      price: product.price
    });
    setIsQuickViewOpen(true);
  };

  if (error) return <div className="na-error">{error}</div>;

  const skeletonCards = Array.from({ length: PAGE_SIZE });

  return (
    <section className="na-grid-sec">
      <div className="na-top">
        <nav className="na-breadcrumbs" aria-label="Breadcrumb">
          <span>{t('new_arrivals_page.breadcrumb_home')}</span> &gt; <span className="active">{t('new_arrivals_page.breadcrumb_shop')}</span>
        </nav>

        <div className="na-toolbar">
          <div className="na-results">
            {t('new_arrivals_page.showing_results', { from: sortedProducts.length ? 1 : 0, to: sortedProducts.length, total })}
          </div>

          <select
            className="na-sort"
            aria-label={t('new_arrivals_page.sorting_aria')}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="default">{t('new_arrivals_page.sort_default')}</option>
            <option value="name_asc">{t('new_arrivals_page.sort_name_asc')}</option>
            <option value="name_desc">{t('new_arrivals_page.sort_name_desc')}</option>
          </select>
        </div>
      </div>

      <div className="na-catbar" aria-label={t('new_arrivals_page.filter_by_categories')}>
        <button
          type="button"
          className={`na-catpill ${selectedCategoryId === null ? 'active' : ''}`}
          onClick={() => setSelectedCategoryId(null)}
        >
          {t('new_arrivals_page.all_categories')}
          <span className="na-catpill-count">({allTotal})</span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`na-catpill ${selectedCategoryId === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategoryId(cat.id)}
          >
            {cat.name}
            <span className="na-catpill-count">({cat.count})</span>
          </button>
        ))}
      </div>

      <div className="na-container">
        <aside className="na-sidebar">
          <div className="na-sidebar-box">
            <h3 className="na-sidebar-title">
              <i className="fa-solid fa-sliders" /> {t('new_arrivals_page.filter_by_categories')}
            </h3>
            <div className="na-sidebar-list">
              <label className={`na-sidebar-row ${selectedCategoryId === null ? 'active' : ''}`}>
                <input
                  type="checkbox"
                  checked={selectedCategoryId === null}
                  onChange={() => setSelectedCategoryId(null)}
                />
                <span className="na-sidebar-label">{t('new_arrivals_page.all_categories')}</span>
                <span className="na-count">({allTotal})</span>
              </label>

              {(showMoreCategories ? categories : categories.slice(0, 10)).map((cat) => (
                <label key={cat.id} className={`na-sidebar-row ${selectedCategoryId === cat.id ? 'active' : ''}`}>
                  <input
                    type="checkbox"
                    checked={selectedCategoryId === cat.id}
                    onChange={() => setSelectedCategoryId(cat.id)}
                  />
                  <span className="na-sidebar-label">{cat.name}</span>
                  <span className="na-count">({cat.count})</span>
                </label>
              ))}

              {categories.length > 10 && (
                <button
                  className="na-sidebar-more"
                  type="button"
                  onClick={() => setShowMoreCategories((v) => !v)}
                >
                  + {showMoreCategories ? 'Less' : 'More'}
                </button>
              )}
            </div>
          </div>
        </aside>

        <main className="na-main-content">
          <div className="na-grid">
            {initialLoading
              ? skeletonCards.map((_, i) => (
                  <article key={`sk-${i}`} className="na-card na-card--skeleton" aria-hidden="true">
                    <div className="na-imageWrap">
                      <div className="na-skel-box na-skel-img" />
                      <div className="na-actions-sidebar">
                        <div className="na-skel-circle" />
                        <div className="na-skel-circle" />
                        <div className="na-skel-circle" />
                        <div className="na-skel-circle" />
                      </div>
                    </div>
                    <div className="na-body">
                      <div className="na-skel-line na-skel-line--lg" />
                      <div className="na-skel-line na-skel-line--md" />
                      <div className="na-skel-line na-skel-line--sm" />
                      <div className="na-skel-line na-skel-line--sm" />
                      <div className="na-skel-pill" />
                    </div>
                  </article>
                ))
              : sortedProducts.map((prod) => (
                  <article 
                    key={prod.id} 
                    className="na-card"
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      if (!(e.target as HTMLElement).closest('.na-action-btn')) {
                        navigate(`/product/${prod.id}`);
                      }
                    }}
                  >
                    <div className="na-imageWrap">
                      <img className="na-image" src={prod.image || ProductImg1} alt={prod.name} />
                      
                      <div className="na-actions-sidebar">
                        <button
                          className="na-action-btn"
                          aria-label="Add to wishlist"
                          onClick={() => {
                            const user = getCurrentUser();
                            if (!user?.id) {
                              navigate(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
                              return;
                            }

                            toggleWishlist({
                              id: prod.id,
                              name: prod.name,
                              code: prod.code,
                              brand: prod.brand,
                              category: prod.category,
                              image: prod.image,
                              variant: prod.variant
                            });
                          }}
                        >
                          <i className={isInWishlist(prod.id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
                        </button>
                        <button
                          className="na-action-btn"
                          aria-label="Add to cart"
                          onClick={async () => {
                            const user = getCurrentUser();
                            if (!user?.id) {
                              navigate(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
                              return;
                            }

                            try {
                              await addToCart(String(prod.id), 1);
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
                        <button className="na-action-btn" aria-label="Compare">
                          <i className="fa-solid fa-right-left" />
                        </button>
                        <button 
                          className="na-action-btn" 
                          aria-label="Quick view"
                          onClick={(e) => handleQuickView(e, prod)}
                        >
                          <i className="fa-solid fa-magnifying-glass" />
                        </button>
                      </div>
                    </div>

                    <div className="na-body">
                      <div className="na-price">{formatPrice(prod.price, currency)}</div>
                      <div className="na-name">{prod.name}</div>
                      <div className="na-variant">{prod.variant || ''}</div>
                      <div className="na-code">{t('new_arrivals_page.code_prefix')} {prod.code}</div>
                      <div className="na-brand">{prod.brand}</div>
                      <div className="na-tag">{prod.category}</div>
                    </div>
                  </article>
                ))}
          </div>

          {!initialLoading && hasMore && (
            <div className="na-loadmore-wrap">
              <button
                type="button"
                className="na-loadmore"
                disabled={loadingMore}
                onClick={async () => {
                  try {
                    setLoadingMore(true);
                    await fetchProductsPage(offset, 'append', selectedCategoryId);
                  } catch (err) {
                    setError('Failed to fetch data from server');
                    console.error(err);
                  } finally {
                    setLoadingMore(false);
                  }
                }}
              >
                {loadingMore ? '...' : 'Load more'}
              </button>
            </div>
          )}
        </main>
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
