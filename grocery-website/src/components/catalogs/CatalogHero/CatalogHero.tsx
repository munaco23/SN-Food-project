import React from 'react';
import { useTranslation } from 'react-i18next';
import './CatalogHero.css';
import hero2 from '../../../Images/hero2.jpg';

export const CatalogHero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="cat-hero">
      <div className="cat-hero-bg">
        <img src={hero2} alt="Ethnic food background" />
        <div className="cat-hero-overlay" />
      </div>
      <div className="cat-hero-inner">
        <h1 className="cat-hero-title">{t('catalogs_page.hero_title')}</h1>
        <p className="cat-hero-text">
          {t('catalogs_page.hero_text')}
        </p>
      </div>
    </section>
  );
};
