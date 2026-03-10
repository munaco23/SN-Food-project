import React from 'react';
import { useTranslation } from 'react-i18next';
import './DiscoverBanner.css';
import BannerImage from '../../../Images/hero2.jpg';

export const DiscoverBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="discover" aria-label={t('discover.title')}>
      <div className="discover-bg" style={{ backgroundImage: `url(${BannerImage})` }}>
        <div className="discover-overlay" />
        <div className="discover-inner">
          <h2 className="discover-title">
            {t('discover.title')}
          </h2>
          <p className="discover-subtitle">
            {t('discover.subtitle')}
          </p>
          <button className="discover-cta" type="button">{t('discover.cta')}</button>
        </div>
      </div>
    </section>
  );
};
