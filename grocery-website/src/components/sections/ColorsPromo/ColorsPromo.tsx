import React from 'react';
import { useTranslation } from 'react-i18next';
import './ColorsPromo.css';
import FoodImg from '../../../Images/hero2.jpg';
import BgImg from '../../../Images/hero1.jpg';

export const ColorsPromo: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="cp-modern" aria-label={t('promo.title')}>
      <div className="cp-modern-hero" style={{ backgroundImage: `url(${BgImg})` }}>
        <div className="cp-modern-overlay" />
        <div className="cp-modern-container">
          <div className="cp-modern-grid">
            <div className="cp-modern-content">
              <div className="cp-modern-badge">{t('promo.badge')}</div>
              <h2 className="cp-modern-title">{t('promo.title')}</h2>
              <p className="cp-modern-text">
                {t('promo.text')}
              </p>
              
              <div className="cp-modern-features">
                <div className="cp-feature-item">
                  <span className="cp-feature-icon"><i className="fa-solid fa-truck-ramp-box" /></span>
                  <div className="cp-feature-info">
                    <h4>{t('promo.smart_logistics')}</h4>
                  </div>
                </div>
                <div className="cp-feature-item">
                  <span className="cp-feature-icon"><i className="fa-solid fa-tags" /></span>
                  <div className="cp-feature-info">
                    <h4>{t('promo.competitive_rates')}</h4>
                  </div>
                </div>
              </div>

              <div className="cp-modern-actions">
                <button className="cp-btn-primary" type="button">{t('promo.become_partner')}</button>
                <button className="cp-btn-secondary" type="button">{t('promo.catalog')}</button>
              </div>
            </div>

            <div className="cp-modern-visual">
              <div className="cp-circle-wrap">
                <img className="cp-circle-img" src={FoodImg} alt={t('promo.title')} />
                <div className="cp-floating-badge">
                  <span className="cp-badge-val">15+</span>
                  <span className="cp-badge-lab">{t('promo.years')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cp-newsletter-v2">
        <div className="cp-newsletter-v2-container">
          <div className="cp-newsletter-v2-content">
            <div className="cp-newsletter-v2-left">
              <h3>{t('promo.offers_title')}</h3>
              <p>{t('promo.offers_sub')}</p>
            </div>
            <div className="cp-newsletter-v2-right">
              <form className="cp-newsletter-v2-form">
                <div className="cp-v2-input-row">
                  <input type="email" placeholder={t('promo.email_placeholder')} aria-label={t('promo.email_placeholder')} />
                  <button type="button">{t('promo.signup_btn')}</button>
                </div>
                <label className="cp-v2-checkbox">
                  <input type="checkbox" />
                  <span>{t('promo.terms_accept')}</span>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
