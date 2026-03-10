import React from 'react';
import { useTranslation } from 'react-i18next';
import './VendorHero.css';
import hero2 from '../../../Images/hero2.jpg';

export const VendorHero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="vendor-hero">
      <div className="vendor-hero-bg">
        <img src={hero2} alt="Logistics background" />
        <div className="vendor-hero-overlay" />
      </div>
      <div className="vendor-hero-inner">
        <h1 className="vendor-hero-title">{t('vendors.hero.title')}</h1>
        <p className="vendor-hero-text">
          {t('vendors.hero.text')}
        </p>
        <button className="vendor-hero-cta" type="button">{t('vendors.hero.cta')}</button>
      </div>
    </section>
  );
};
