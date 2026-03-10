import React from 'react';
import { useTranslation } from 'react-i18next';
import './FeatureStrip.css';
import BgImg from '../../../Images/hero2.jpg';

export const FeatureStrip: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="brand-story" aria-label={t('feature_strip.title')}>
      <div className="brand-story-parallax" style={{ backgroundImage: `url(${BgImg})` }}>
        <div className="brand-story-overlay" />
        <div className="brand-story-container">
          <div className="brand-story-grid">
            <div className="brand-story-content">
              <span className="brand-story-kicker">{t('feature_strip.kicker')}</span>
              <h2 className="brand-story-title">{t('feature_strip.title')}</h2>
              <div className="brand-story-divider" />
              <p className="brand-story-text">
                {t('feature_strip.text1')}
              </p>
              <p className="brand-story-text">
                {t('feature_strip.text2')}
              </p>
            </div>

            <div className="brand-story-cards">
              <div className="vision-card">
                <span className="vision-number">01</span>
                <h3 className="vision-card-title">{t('feature_strip.vision1_title')}</h3>
                <p className="vision-card-desc">{t('feature_strip.vision1_desc')}</p>
              </div>
              <div className="vision-card">
                <span className="vision-number">02</span>
                <h3 className="vision-card-title">{t('feature_strip.vision2_title')}</h3>
                <p className="vision-card-desc">{t('feature_strip.vision2_desc')}</p>
              </div>
              <div className="vision-card">
                <span className="vision-number">03</span>
                <h3 className="vision-card-title">{t('feature_strip.vision3_title')}</h3>
                <p className="vision-card-desc">{t('feature_strip.vision3_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
