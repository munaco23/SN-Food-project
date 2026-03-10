import React from 'react';
import { useTranslation } from 'react-i18next';
import './BrandsHero.css';
import hero2 from '../../../Images/hero2.jpg';

export const BrandsHero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="brands-hero">
      <div className="brands-hero-bg">
        <img src={hero2} alt="Fresh produce background" />
        <div className="brands-hero-overlay" />
      </div>
      <div className="brands-hero-inner">
        <h1 className="brands-hero-title">{t('brands_page.hero_title')}</h1>
        <p className="brands-hero-text">
          {t('brands_page.hero_text')}
        </p>
      </div>
    </section>
  );
};
