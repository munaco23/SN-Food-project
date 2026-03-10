import React from 'react';
import { useTranslation } from 'react-i18next';
import './CompanyHero.css';

export const CompanyHero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="company-hero">
      <div className="company-hero-content">
        <h1 className="company-hero-title">
          {t('company.hero.title_line1')}<br />
          {t('company.hero.title_line2')}
        </h1>
        <p className="company-hero-text">
          {t('company.hero.text')}
        </p>
        <button className="company-hero-btn" type="button">
          {t('company.hero.cta')}
        </button>
      </div>
      <div className="company-hero-image-clip">
        {/* In a real app, use the actual image from src/Images/hero_purple.jpg or similar */}
        <div className="company-hero-img-placeholder" />
      </div>
    </section>
  );
};
