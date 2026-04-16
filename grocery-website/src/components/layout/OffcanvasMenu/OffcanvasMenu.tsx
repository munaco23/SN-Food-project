import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './OffcanvasMenu.css';
import { getWishlistCount } from '../../../utils/wishlist';
import { getCartCount } from '../../../utils/cart';

type NavItem = {
  key: string;
  path: string;
  children?: { key: string; path: string }[];
};

type OffcanvasMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onCartClick: () => void;
};

const MENU_ITEMS: NavItem[] = [
  { key: 'home', path: '/' },
  { key: 'account', path: '/account' },
  {
    key: 'pages',
    path: '#',
    children: [
      { key: 'company', path: '/company' },
      { key: 'team', path: '/team' },
      { key: 'customers', path: '/customers' },
      { key: 'vendors', path: '/vendors' },
    ]
  },
  { key: 'brands', path: '/brands' },
  { key: 'new_arrivals', path: '/new-arrivals' },
  { key: 'contact', path: '/contact' },
];

export const OffcanvasMenu: React.FC<OffcanvasMenuProps> = ({ isOpen, onClose, onCartClick }) => {
  const { t } = useTranslation();
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(() => getWishlistCount());
  const [cartCount, setCartCount] = useState(() => getCartCount());

  const togglePages = () => setIsPagesOpen(!isPagesOpen);

  useEffect(() => {
    if (!isOpen) {
      setIsPagesOpen(false);
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const update = () => setWishlistCount(getWishlistCount());
    update();
    window.addEventListener('wishlist:changed', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('wishlist:changed', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  useEffect(() => {
    const update = () => setCartCount(getCartCount());
    update();
    window.addEventListener('cart:changed', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('cart:changed', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  return (
    <div className={`offcanvas${isOpen ? ' offcanvas--open' : ''}`}>
      <button className="offcanvas-overlay" onClick={onClose} aria-label={t('offcanvas.close_menu')} />

      <aside className="offcanvas-panel" aria-hidden={!isOpen}>
        <div className="offcanvas-rail" aria-hidden="true">
          <button className="rail-close" onClick={onClose} aria-label={t('offcanvas.close')}>
            <i className="fa-solid fa-xmark" />
          </button>

          <div className="rail-icons">
            <button 
              className="rail-icon" 
              aria-label={t('offcanvas.cart')}
              onClick={() => {
                onClose();
                onCartClick();
              }}
            >
              <i className="fa-solid fa-cart-shopping" />
              <span className="rail-badge">{cartCount}</span>
            </button>
            <button className="rail-icon" aria-label={t('offcanvas.swap')}>
              <i className="fa-solid fa-right-left" />
              <span className="rail-badge">0</span>
            </button>
            <Link 
              to="/wishlist" 
              className="rail-icon" 
              aria-label={t('offcanvas.wishlist')}
              onClick={onClose}
              style={{ textDecoration: 'none' }}
            >
              <i className="fa-regular fa-heart" />
              <span className="rail-badge">{wishlistCount}</span>
            </Link>
          </div>

          <div className="rail-bottom">
            <button className="rail-social" aria-label={t('offcanvas.social.facebook')}>
              <i className="fa-brands fa-facebook-f" />
            </button>
            <button className="rail-social" aria-label={t('offcanvas.social.instagram')}>
              <i className="fa-brands fa-instagram" />
            </button>
            <button className="rail-social" aria-label={t('offcanvas.social.tiktok')}>
              <i className="fa-brands fa-tiktok" />
            </button>
          </div>
        </div>

        <div className="offcanvas-content">
          <div className="offcanvas-top">
            <div className="offcanvas-search">
              <input className="offcanvas-search-input" placeholder={t('offcanvas.type_products')} />
              <button className="offcanvas-search-btn" aria-label={t('offcanvas.search')}>
                <i className="fa-solid fa-magnifying-glass" />
              </button>
            </div>
          </div>

          <nav className="offcanvas-nav" aria-label={t('offcanvas.menu')}>
            {MENU_ITEMS.map((item: NavItem) => (
              <div key={item.key} className="offcanvas-nav-group">
                <div className="offcanvas-nav-row">
                  {item.path === '#' ? (
                    <button 
                      className="offcanvas-nav-item" 
                      onClick={item.key === 'pages' ? togglePages : undefined}
                    >
                      {t(`nav.${item.key}`)}
                    </button>
                  ) : (
                    <Link 
                      to={item.path} 
                      className="offcanvas-nav-item" 
                      onClick={onClose}
                      style={{ textDecoration: 'none' }}
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  )}
                  {item.key === 'pages' && (
                    <button 
                      className={`offcanvas-nav-toggle ${isPagesOpen ? 'offcanvas-nav-toggle--open' : ''}`}
                      onClick={togglePages}
                      aria-label={`${isPagesOpen ? t('offcanvas.collapse') : t('offcanvas.expand')} ${t(`nav.${item.key}`)}`}
                    >
                      <i className={`fa-solid ${isPagesOpen ? 'fa-minus' : 'fa-plus'}`} />
                    </button>
                  )}
                </div>
                {item.key === 'pages' && item.children && (
                  <div className={`offcanvas-submenu ${isPagesOpen ? 'offcanvas-submenu--open' : ''}`}>
                    {item.children.map((child: { key: string; path: string }) => (
                      <Link
                        key={child.key}
                        to={child.path}
                        className="offcanvas-submenu-item"
                        onClick={onClose}
                      >
                        {t(`nav.${child.key}`)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="offcanvas-footer">
            <div className="offcanvas-footer-line">262 rue des Bouleaux, 59860</div>
            <div className="offcanvas-footer-line">Bruay-sur-l’Escaut, France</div>
            <div className="offcanvas-footer-line">contact@snfood.fr</div>
            <div className="offcanvas-footer-line">{t('offcanvas.wholesale')}</div>
          </div>
        </div>
      </aside>
    </div>
  );
};
