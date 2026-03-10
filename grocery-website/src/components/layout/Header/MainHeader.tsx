import React, { useEffect, useState } from 'react';
import LogoImage from '../../../Images/Logo.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getWishlistCount } from '../../../utils/wishlist';
import { getCartCount } from '../../../utils/cart';
import { getCurrentUser } from '../../../utils/auth';

type MainHeaderProps = {
  onMenuClick: () => void;
  onCartClick: () => void;
};

export const MainHeader: React.FC<MainHeaderProps> = ({ onMenuClick, onCartClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [wishlistCount, setWishlistCount] = useState(() => getWishlistCount());
  const [cartCount, setCartCount] = useState(() => getCartCount());
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(() => getCurrentUser());

  useEffect(() => {
    const update = () => {
      setWishlistCount(getWishlistCount());
      setUser(getCurrentUser());
    };
    update();
    window.addEventListener('wishlist:changed', update);
    window.addEventListener('auth:changed', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('wishlist:changed', update);
      window.removeEventListener('auth:changed', update);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="main-header">
      <Link to="/" className="main-header-left" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="logo-image-wrapper">
          <img src={LogoImage} alt="SN Food logo" className="logo-image" />
        </div>
        <div className="logo-text-block">
          <div className="logo-title">SN FOOD</div>
          <div className="logo-subtitle">{t('header.logo_subtitle')}</div>
        </div>
      </Link>

      <div className="main-header-center">
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            placeholder={t('header.search_placeholder')}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button type="submit" className="search-button">{t('header.search_button')}</button>
        </form>
      </div>

      <div className="main-header-right">
        <div className="header-actions">
          {user ? (
            <Link to="/account" className="account-action" style={{ textDecoration: 'none', color: 'inherit' }}>
              <button className="icon-button icon-button--bordered" aria-label={t('header.accounts')}>
                <i className="fa-regular fa-user icon-svg" />
              </button>
              <span className="account-label">{t('header.accounts')}</span>
            </Link>
          ) : (
            <Link to="/login" className="account-action" style={{ textDecoration: 'none', color: 'inherit' }}>
              <button className="icon-button icon-button--bordered" aria-label="Login">
                <i className="fa-solid fa-right-to-bracket icon-svg" />
              </button>
              <span className="account-label">Login / Signup</span>
            </Link>
          )}

          <span className="actions-divider" aria-hidden="true" />

          <button className="icon-button header-compare-action" aria-label="Switch">
            <i className="fa-solid fa-right-left icon-svg" />
            <span className="icon-badge">0</span>
          </button>

          <Link to="/wishlist" className="icon-button" aria-label="Wishlist" style={{ textDecoration: 'none' }}>
            <i className="fa-regular fa-heart icon-svg" />
            <span className="icon-badge">{wishlistCount}</span>
          </Link>

          <button className="icon-button" aria-label="Cart" onClick={onCartClick}>
            <i className="fa-solid fa-bag-shopping icon-svg" />
            <span className="icon-badge">{cartCount}</span>
          </button>

          <button className="menu-button" aria-label="Menu" onClick={onMenuClick}>
            <i className="fa-solid fa-bars menu-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};
