import React from 'react';
import { useTranslation } from 'react-i18next';
import './CustomerHero.css';
import hero2 from '../../../Images/hero2.jpg';

export const CustomerHero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="cust-hero">
      <div className="cust-hero-bg">
        <img src={hero2} alt="Fresh produce background" />
        <div className="cust-hero-overlay" />
      </div>
      <div className="cust-hero-inner">
        <h1 className="cust-hero-title">{t('customers.hero.title')}</h1>
        <p className="cust-hero-text">
          {t('customers.hero.text')}
        </p>
        <button className="cust-hero-cta" type="button">{t('customers.hero.cta')}</button>
      </div>
    </section>
  );
};
