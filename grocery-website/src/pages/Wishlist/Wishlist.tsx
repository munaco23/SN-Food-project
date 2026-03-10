import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Wishlist.css';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import Logo from '../../Images/Logo.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { getWishlist, setWishlist, WishlistItem, isInWishlist, toggleWishlist } from '../../utils/wishlist';
import { addToCart } from '../../utils/cart';
import { getCurrentUser } from '../../utils/auth';
import { ProductQuickView } from '../../components/sections/ProductsOfWeek/ProductQuickView';

export const Wishlist: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [items, setItems] = useState<WishlistItem[]>(() => getWishlist());
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    const onChanged = () => setItems(getWishlist());
    window.addEventListener('wishlist:changed', onChanged);
    return () => window.removeEventListener('wishlist:changed', onChanged);
  }, []);

  const handleQuickView = (e: React.FormEvent, item: WishlistItem) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct({
      id: item.id,
      name: item.name,
      variant: item.variant || '',
      code: item.code,
      brand: item.brand || 'SN Food',
      tag: item.category,
      imageSrc: item.image,
      price: item.price
    });
    setIsQuickViewOpen(true);
  };

  const handleAddToCart = async (e: React.FormEvent, item: WishlistItem) => {
    e.preventDefault();
    e.stopPropagation();
    const user = getCurrentUser();
    if (!user?.id) {
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    try {
      await addToCart(String(item.id), 1);
      window.dispatchEvent(new Event('cart:open'));
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const count = items.length;
  const hasItems = count > 0;

  const displayItems = useMemo(
    () =>
      items.map((x) => ({
        ...x,
        image: x.image || Logo
      })),
    [items]
  );

  return (
    <div className="wishlist-page">
      <Header />
      <main className="wishlist-main">
        <div className="wishlist-container">
          <div className="wishlist-header">
            <h1 className="wishlist-title">{t('wishlist_page.title')}</h1>
            <p className="wishlist-count">{t('wishlist_page.item_count', { count })}</p>
          </div>

          {hasItems ? (
            <div className="wishlist-grid">
              {displayItems.map((item) => (
                <article 
                  key={item.id} 
                  className="wishlist-card"
                  onClick={() => navigate(`/product/${item.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="wishlist-card-img">
                    <img src={item.image} alt={item.name} draggable="false" />
                    
                    <div className="wishlist-actions-sidebar">
                      <button
                        className="wishlist-action-btn"
                        aria-label="Remove from wishlist"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(item);
                        }}
                      >
                        <i className="fa-solid fa-heart" />
                      </button>
                      
                      <button
                        className="wishlist-action-btn"
                        aria-label="Add to cart"
                        onClick={(e) => handleAddToCart(e, item)}
                      >
                        <i className="fa-solid fa-bag-shopping" />
                      </button>

                      <button className="wishlist-action-btn" aria-label="Compare" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                        <i className="fa-solid fa-right-left" />
                      </button>

                      <button 
                        className="wishlist-action-btn" 
                        aria-label="Quick view"
                        onClick={(e) => handleQuickView(e, item)}
                      >
                        <i className="fa-solid fa-magnifying-glass" />
                      </button>
                    </div>
                  </div>

                  <div className="wishlist-card-info">
                    <div className="wishlist-price">
                      {item.price ? `${item.price.toFixed(2)} €` : ''}
                    </div>
                    <h3 className="item-name">{item.name}</h3>
                    <div className="item-variant">{item.variant || ''}</div>
                    <p className="item-code">{t('wishlist_page.code_prefix')} {item.code || ''}</p>
                    <div className="item-brand">{item.brand || 'SN Food'}</div>
                    <div className="item-tag">{item.category}</div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-wishlist">
              <i className="fa-regular fa-heart empty-icon" />
              <h2>{t('wishlist_page.empty.title')}</h2>
              <p>{t('wishlist_page.empty.text')}</p>
              <Link to="/shop" className="shop-now-btn">{t('wishlist_page.empty.cta')}</Link>
            </div>
          )}
        </div>
      </main>
      <Footer />

      <ProductQuickView 
        product={selectedProduct}
        currency={{ symbol: '€', position: 'after', digits: 2, code: 'EUR' }}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
};
