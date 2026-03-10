import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NAV_ITEMS = [
  { key: 'company', path: '/company' },
  { key: 'team', path: '/team' },
  { key: 'vendors', path: '/vendors' },
  { key: 'customers', path: '/customers' },
  { key: 'events', path: '/events' },
  { key: 'catalogs', path: '/catalogs' },
  { key: 'brands', path: '/brands' },
  { key: 'new_arrivals', path: '/new-arrivals' },
  { key: 'contact', path: '/contact' },
  { key: 'branches', path: '#' },
];

const LANGUAGES = [
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'ur', label: 'اردو', flag: 'https://flagcdn.com/w40/pk.png' },
  { code: 'ln', label: 'Lingála', flag: 'https://flagcdn.com/w40/cd.png' },
  { code: 'nl', label: 'Nederlands', flag: 'https://flagcdn.com/w40/nl.png' },
];

export const BrandBar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const langCode = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0];
  const currentLang = LANGUAGES.find((l) => l.code === langCode) || LANGUAGES[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="brand-bar">
      <div className="brand-bar-left">
        {NAV_ITEMS.map((item) => (
          item.path === '#' ? (
            <button key={item.key} className="brand-bar-item">
              {t(`nav.${item.key}`)}
            </button>
          ) : (
            <Link key={item.key} to={item.path} className="brand-bar-item" style={{ textDecoration: 'none' }}>
              {t(`nav.${item.key}`)}
            </Link>
          )
        ))}
      </div>
      <div className="brand-bar-right">
        <div className="language-container" ref={dropdownRef} style={{ position: 'relative' }}>
          <button 
            className="language-switcher" 
            onClick={() => setIsLangOpen(!isLangOpen)}
            style={{ cursor: 'pointer' }}
          >
            <img src={currentLang.flag} alt="" className="language-flag-img" style={{ width: '20px', borderRadius: '2px' }} />
            <span className="language-label">{currentLang.label}</span>
          </button>
          
          {isLangOpen && (
            <div className="language-dropdown" style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              padding: '8px 0',
              zIndex: 1000,
              minWidth: '140px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  className="lang-option"
                  onClick={() => changeLanguage(lang.code)}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 16px',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: '#1e293b',
                    fontSize: '14px',
                    textAlign: 'left'
                  }}
                >
                  <img src={lang.flag} alt="" style={{ width: '20px', borderRadius: '2px' }} />
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <Link to="/login" className="brand-login-button" style={{ textDecoration: 'none' }}>
          <span className="brand-login-icon" aria-hidden="true">
            <i className="fa-regular fa-user" />
          </span>
          <span className="brand-login-label">{t('header.login_register')}</span>
        </Link>
      </div>
    </div>
  );
};
