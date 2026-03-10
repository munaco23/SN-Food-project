import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { getCurrentUser } from '../../utils/auth';
import { isInWishlist, toggleWishlist } from '../../utils/wishlist';
import { addToCart } from '../../utils/cart';
import { API_BASE_URL } from '../../utils/api';
import { ProductQuickView } from '../../components/sections/ProductsOfWeek/ProductQuickView';
import './Shop.css';
import ProductImg1 from '../../Images/hero1.jpg';

export const Shop: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currency, setCurrency] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [, forceRerender] = useState(0);

  const categoryId = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const refresh = () => forceRerender(v => v + 1);
    window.addEventListener('wishlist:changed', refresh);
    return () => window.removeEventListener('wishlist:changed', refresh);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `${API_BASE_URL}/api/products/all?limit=50`;
        if (categoryId) url += `&category=${categoryId}`;
        if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.ok) {
          setProducts(data.products);
          if (data.currency) setCurrency(data.currency);
        } else {
          setError(data.message || 'Failed to load products');
        }
      } catch (err) {
        setError('Connection error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, searchQuery]);

  const handleQuickView = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
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

  const formatPrice = (value: number | null | undefined) => {
    if (typeof value !== 'number' || !Number.isFinite(value)) return '';
    const digits = typeof currency?.digits === 'number' ? currency.digits : 2;
    const symbol = currency?.symbol || '$';
    const position = currency?.position || 'after';
    const numberText = value.toFixed(digits);
    return position === 'before' ? `${symbol} ${numberText}` : `${numberText} ${symbol}`;
  };

  return (
    <div className="shop-page">
      <Header />
      <main className="shop-main">
        <div className="shop-container">
          <header className="shop-header">
            <h1 className="shop-title">
              {searchQuery 
                ? `Search results for "${searchQuery}"` 
                : categoryId 
                  ? 'Category Products' 
                  : 'All Products'}
            </h1>
            <p className="shop-count">{products.length} Products found</p>
          </header>

          {loading ? (
            <div className="shop-loading">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : error ? (
            <div className="shop-error">{error}</div>
          ) : products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => (
                <article 
                  key={product.id} 
                  className="product-card"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    if (!(e.target as HTMLElement).closest('.product-action-btn')) {
                      navigate(`/product/${product.id}`);
                    }
                  }}
                >
                  <div className="product-imageWrap">
                    <img className="product-image" src={product.image || ProductImg1} alt={product.name} />
                    
                    <div className="product-actions-sidebar">
                      <button
                        className="product-action-btn"
                        aria-label="Add to wishlist"
                        onClick={() => {
                          const user = getCurrentUser();
                          if (!user?.id) {
                            navigate(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
                            return;
                          }

                          toggleWishlist({
                            id: String(product.id),
                            name: product.name,
                            code: product.code,
                            brand: product.brand,
                            category: product.category,
                            image: product.image,
                            variant: product.variant
                          });
                        }}
                      >
                        <i className={isInWishlist(String(product.id)) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
                      </button>
                      <button
                        className="product-action-btn"
                        aria-label="Add to cart"
                        onClick={async () => {
                          const user = getCurrentUser();
                          if (!user?.id) {
                            navigate(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
                            return;
                          }

                          try {
                            await addToCart(String(product.id), 1);
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
                      <button className="product-action-btn" aria-label="Compare">
                        <i className="fa-solid fa-right-left" />
                      </button>
                      <button 
                        className="product-action-btn" 
                        aria-label="Quick view"
                        onClick={(e) => handleQuickView(e, product)}
                      >
                        <i className="fa-solid fa-magnifying-glass" />
                      </button>
                    </div>
                  </div>

                  <div className="product-body">
                    <div className="product-price">{formatPrice(product.price)}</div>
                    <div className="product-name">{product.name}</div>
                    <div className="product-variant">{product.variant || ''}</div>
                    <div className="product-code">{t('new_arrivals_page.code_prefix')} {product.code}</div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-tag">{product.category}</div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="shop-empty">
              <i className="fa-solid fa-box-open"></i>
              <h2>No products found</h2>
              <p>Try adjusting your search or category filters.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />

      <ProductQuickView 
        product={selectedProduct}
        currency={currency}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
};
