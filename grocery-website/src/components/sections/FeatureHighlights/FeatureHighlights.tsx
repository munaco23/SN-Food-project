import React from 'react';
import { useTranslation } from 'react-i18next';
import './FeatureHighlights.css';

const FEATURES = [
  {
    icon: 'fa-solid fa-truck-fast',
    title: 'feature_highlights.free_shipping',
    desc: 'feature_highlights.free_shipping_desc'
  },
  {
    icon: 'fa-solid fa-hand-holding-dollar',
    title: 'feature_highlights.save_money',
    desc: 'feature_highlights.save_money_desc'
  },
  {
    icon: 'fa-solid fa-circle-check',
    title: 'feature_highlights.quality_assured',
    desc: 'feature_highlights.quality_assured_desc'
  },
  {
    icon: 'fa-solid fa-tags',
    title: 'feature_highlights.best_deal',
    desc: 'feature_highlights.best_deal_desc'
  },
  {
    icon: 'fa-solid fa-headset',
    title: 'feature_highlights.support',
    desc: 'feature_highlights.support_desc'
  }
];

export const FeatureHighlights: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="feature-highlights">
      <div className="features-container">
        {FEATURES.map((item, index) => (
          <div key={index} className="feature-item">
            <div className="feature-icon-wrapper">
              <i className={item.icon} aria-hidden="true" />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">{t(item.title)}</h3>
              <p className="feature-desc">{t(item.desc)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
