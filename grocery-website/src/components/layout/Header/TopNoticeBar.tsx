import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'ur', label: 'اردو', flag: 'https://flagcdn.com/w40/pk.png' },
  { code: 'ln', label: 'Lingála', flag: 'https://flagcdn.com/w40/cd.png' },
  { code: 'nl', label: 'Nederlands', flag: 'https://flagcdn.com/w40/nl.png' },
  { code: 'fr', label: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
];

export const TopNoticeBar: React.FC = () => {
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
    <div className="top-notice-bar">
      <div className="top-notice-inner">
        <div className="top-notice-left">
          <span className="top-notice-item">
            <i className="fa-solid fa-location-dot" aria-hidden="true" />
            <span>{t('topbar.address')}</span>
          </span>
          <span className="top-notice-sep" aria-hidden="true" />
          <a className="top-notice-item top-notice-link" href={`mailto:${t('topbar.email')}`}>
            <i className="fa-solid fa-envelope" aria-hidden="true" />
            <span>{t('topbar.email')}</span>
          </a>
        </div>

        <div className="top-notice-right">
          <button className="top-social" type="button" aria-label={t('offcanvas.social.facebook')}>
            <i className="fa-brands fa-facebook-f" />
          </button>
          <button className="top-social" type="button" aria-label={t('offcanvas.social.instagram')}>
            <i className="fa-brands fa-instagram" />
          </button>
          <button className="top-social" type="button" aria-label={t('offcanvas.social.tiktok')}>
            <i className="fa-brands fa-tiktok" />
          </button>

          <div className="top-lang" ref={dropdownRef}>
            <button
              className="top-lang-btn"
              type="button"
              onClick={() => setIsLangOpen((v) => !v)}
              aria-label={t('header.language')}
            >
              <img className="top-lang-flag" src={currentLang.flag} alt="" />
              <span className="top-lang-label">{currentLang.label}</span>
              <i className="fa-solid fa-chevron-down top-lang-caret" aria-hidden="true" />
            </button>

            {isLangOpen && (
              <div className="top-lang-menu" role="menu">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    className="top-lang-item"
                    type="button"
                    role="menuitem"
                    onClick={() => changeLanguage(lang.code)}
                  >
                    <img className="top-lang-flag" src={lang.flag} alt="" />
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
