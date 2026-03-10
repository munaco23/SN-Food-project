import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../../utils/api';

type Category = {
  id: string;
  name: string;
  parentId: string | null;
};

const CATEGORY_ICONS: Record<string, string> = {
  'Beverage': 'fa-solid fa-mug-saucer',
  'Desserts': 'fa-solid fa-ice-cream',
  'Drinks': 'fa-solid fa-bottle-water',
  'Meat': 'fa-solid fa-fish-fins',
  'Fruits': 'fa-solid fa-apple-whole',
  'Vegetables': 'fa-solid fa-carrot',
  'Default': 'fa-solid fa-layer-group'
};

const getIconForCategory = (name: string) => {
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (name.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return CATEGORY_ICONS.Default;
};

const NAV_ITEMS = [
  { key: 'home', path: '/' },
  {
    key: 'pages',
    path: '#',
    children: [
      { key: 'company', path: '/company' },
      { key: 'team', path: '/team' },
      { key: 'customers', path: '/customers' },
      { key: 'vendors', path: '/vendors' },
    ],
  },
  { key: 'catalogs', path: '/catalogs' },
  { key: 'brands', path: '/brands' },
  { key: 'events', path: '/events' },
  { key: 'new_arrivals', path: '/new-arrivals' },
  { key: 'contact', path: '/contact' },
];

export const CategoryBar: React.FC = () => {
  const { t } = useTranslation();
  const navScrollRef = useRef<HTMLDivElement>(null);
  const allCatsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAllCatsOpen, setIsAllCatsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cacheKey = 'odoo-categories';
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < 30 * 60 * 1000) { // 30 min cache
            setCategories(data);
            setLoading(false);
          }
        }

    const res = await fetch(`${API_BASE_URL}/api/products/categories`);
    const data = await res.json();
    if (data.ok) {
      // Clear old cache and set new one
      localStorage.removeItem('odoo-categories');
      setCategories(data.categories);
      localStorage.setItem('odoo-categories', JSON.stringify({
        data: data.categories,
        timestamp: Date.now()
      }));
    }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (allCatsRef.current && !allCatsRef.current.contains(event.target as Node)) {
        setIsAllCatsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (navScrollRef.current?.offsetLeft || 0));
    setScrollLeft(navScrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (navScrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed
    if (navScrollRef.current) {
      navScrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <nav className="category-bar" aria-label={t('nav.pages')}>
      <div className="category-bar-inner">
        <div
          className={`all-categories-dropdown${isAllCatsOpen ? ' all-categories-dropdown--open' : ''}`}
          ref={allCatsRef}
          onMouseEnter={() => setIsAllCatsOpen(true)}
          onMouseLeave={() => setIsAllCatsOpen(false)}
        >
          <button
            className="all-categories-pill"
            aria-label={t('categorybar.all_categories')}
            type="button"
            onClick={() => setIsAllCatsOpen((v) => !v)}
            aria-haspopup="menu"
          >
            <span className="all-categories-icon" aria-hidden="true">
              <i className="fa-solid fa-bars" />
            </span>
            <span className="all-categories-text">{t('categorybar.all_categories')}</span>
            <span className="all-categories-caret" aria-hidden="true">
              <i className="fa-solid fa-chevron-down" />
            </span>
          </button>

          <div className="all-categories-menu" role="menu" aria-label={t('categorybar.all_categories')}>
            {loading ? (
              <div className="all-categories-loading">Loading...</div>
            ) : categories.length === 0 ? (
              <div className="all-categories-empty">No categories found</div>
            ) : (
              categories.map((c) => (
                <Link 
                  key={c.id} 
                  to={`/shop?category=${c.id}`} 
                  className="all-categories-item" 
                  role="menuitem"
                  onClick={() => setIsAllCatsOpen(false)}
                >
                  <i className={`all-categories-item-icon ${getIconForCategory(c.name)}`} aria-hidden="true" />
                  <span className="all-categories-item-label">{c.name}</span>
                </Link>
              ))
            )}
          </div>
        </div>

        <div
          className="category-nav"
          ref={navScrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {NAV_ITEMS.map((item) => {
            if (item.path === '#' && item.key === 'pages' && item.children) {
              return (
                <div key={item.key} className="category-nav-item category-nav-item--dropdown">
                  <button
                    className="category-nav-link"
                    type="button"
                    aria-label={t(`nav.${item.key}`)}
                    aria-haspopup="menu"
                  >
                    <span>{t(`nav.${item.key}`)}</span>
                    <i className="fa-solid fa-chevron-down category-nav-caret" aria-hidden="true" />
                  </button>

                  <div className="category-nav-menu" role="menu">
                    {item.children.map((child) => (
                      <Link
                        key={child.key}
                        to={child.path}
                        className="category-nav-menu-item"
                        role="menuitem"
                      >
                        {t(`nav.${child.key}`)}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.key}
                to={item.path}
                className="category-nav-item category-nav-link"
                style={{ textDecoration: 'none' }}
              >
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}
        </div>

        <div className="category-promo" aria-label={t('categorybar.weekly_discount')}>
          <i className="fa-solid fa-tag category-promo-icon" aria-hidden="true" />
          <span className="category-promo-text">{t('categorybar.weekly_discount')}</span>
        </div>
      </div>
    </nav>
  );
};
