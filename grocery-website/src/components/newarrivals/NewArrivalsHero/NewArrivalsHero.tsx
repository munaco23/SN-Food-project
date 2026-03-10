import React from 'react';
import { useTranslation } from 'react-i18next';
import './NewArrivalsHero.css';
import hero2 from '../../../Images/hero2.jpg';

export const NewArrivalsHero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="na-hero">
      <div className="na-hero-bg">
        <img src={hero2} alt="New ethnic products" />
        <div className="na-hero-overlay" />
      </div>
      <div className="na-hero-inner">
        <h1 className="na-hero-title">{t('new_arrivals_page.hero_title')}</h1>
        <p className="na-hero-text">
          {t('new_arrivals_page.hero_text')}
        </p>
      </div>
    </section>
  );
};
