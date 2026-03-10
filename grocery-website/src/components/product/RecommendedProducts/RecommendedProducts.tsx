import React, { useRef, useState, useEffect } from 'react';
import './RecommendedProducts.css';
import ProductImg1 from '../../../Images/hero1.jpg';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../../utils/auth';
import { isInWishlist, toggleWishlist } from '../../../utils/wishlist';
import { addToCart } from '../../../utils/cart';
import { API_BASE_URL } from '../../../utils/api';
import { ProductQuickView } from '../../sections/ProductsOfWeek/ProductQuickView';

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

interface RecommendedProductsProps {
  categoryId?: string;
  currentProductId?: string;
}

export const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ categoryId, currentProductId }) => {
  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [currency, setCurrency] = useState<CurrencyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [, forceRerender] = useState(0);

  useEffect(() => {
    const onChanged = () => forceRerender((v) => v + 1);
    window.addEventListener('wishlist:changed', onChanged);
    return () => window.removeEventListener('wishlist:changed', onChanged);
  }, []);

  useEffect(() => {
    const fetchRecommended = async () => {
      if (!categoryId) return;
      setLoading(true);
      try {
        // Fetch all products for the category
        const url = `${API_BASE_URL}/api/products/all?category=${encodeURIComponent(categoryId)}&limit=12`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.ok) {
          // Filter out current product if provided
          let filtered = data.products || [];
          if (currentProductId) {
            filtered = filtered.filter((p: any) => String(p.id) !== String(currentProductId));
          }
          // Map backend 'image' to 'imageSrc' which the component expects
          const mappedProducts = filtered.map((p: any) => ({
            ...p,
            imageSrc: p.image // Backend returns 'image', component uses 'imageSrc'
          }));
          setProducts(mappedProducts);
          setCurrency(data.currency || null);
        } else {
          setError(data.message || 'Failed to fetch recommendations');
        }
      } catch (err) {
        setError('Failed to connect to backend');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommended();
  }, [categoryId, currentProductId]);

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
      <section className="rp-pow" aria-label="Recommended products">
        <div className="rp-pow-header">
          <h2 className="rp-pow-title">Recommended products</h2>
        </div>
        <div className="rp-pow-scroller" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <article key={i} className="rp-pow-card rp-pow-skel">
              <div className="rp-pow-imageWrap">
                <div className="rp-pow-skel-img" />
                <div className="rp-pow-actions-sidebar">
                  <div className="rp-pow-action-btn rp-pow-skel-btn" />
                  <div className="rp-pow-action-btn rp-pow-skel-btn" />
                  <div className="rp-pow-action-btn rp-pow-skel-btn" />
                  <div className="rp-pow-action-btn rp-pow-skel-btn" />
                </div>
              </div>
              <div className="rp-pow-body">
                <div className="rp-pow-skel-line rp-pow-skel-line--lg" />
                <div className="rp-pow-skel-line rp-pow-skel-line--md" />
                <div className="rp-pow-skel-line rp-pow-skel-line--sm" />
                <div className="rp-pow-skel-line rp-pow-skel-line--sm" />
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (error || products.length === 0) {
    return null; // Don't show if empty or error
  }

  return (
    <section className="rp-pow" aria-label="Recommended products">
      <div className="rp-pow-header">
        <h2 className="rp-pow-title">Recommended products</h2>
        <div className="rp-pow-nav-buttons">
          <button className="rp-pow-nav-btn" type="button" aria-label="Previous" onClick={() => scrollByCards('left')}>
            <i className="fa-solid fa-chevron-left" />
          </button>
          <button className="rp-pow-nav-btn" type="button" aria-label="Next" onClick={() => scrollByCards('right')}>
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      </div>

      <div 
        className="rp-pow-scroller" 
        ref={scrollerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {products.map((p) => (
          <article 
            key={p.id} 
            className="rp-pow-card"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              if (!(e.target as HTMLElement).closest('.rp-pow-action-btn')) {
                navigate(`/product/${p.id}`);
              }
            }}
          >
            <div className="rp-pow-imageWrap">
              <img className="rp-pow-image" src={p.imageSrc || ProductImg1} alt={p.name} draggable="false" />
              
              <div className="rp-pow-actions-sidebar">
                <button
                  className="rp-pow-action-btn"
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
                  className="rp-pow-action-btn"
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
                <button className="rp-pow-action-btn" aria-label="Compare">
                  <i className="fa-solid fa-right-left" />
                </button>
                <button 
                  className="rp-pow-action-btn" 
                  aria-label="Quick view"
                  onClick={(e) => handleQuickView(e, p)}
                >
                  <i className="fa-solid fa-magnifying-glass" />
                </button>
              </div>
            </div>

            <div className="rp-pow-body">
              <div className="rp-pow-price">{formatPrice(p.price, currency)}</div>
              <div className="rp-pow-name">{p.name}</div>
              <div className="rp-pow-variant">{p.variant}</div>
              <div className="rp-pow-code">{p.code}</div>
              <div className="rp-pow-brand">{p.brand}</div>
              <div className="rp-pow-tag">{p.tag}</div>
            </div>
          </article>
        ))}
      </div>

      <div className="rp-pow-dots" aria-hidden="true">
        {products.slice(0, 3).map((_, i) => (
          <span key={i} className={`rp-pow-dot ${i === 0 ? 'rp-pow-dot--active' : ''}`} />
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
