import React from 'react';
import { useTranslation } from 'react-i18next';
import './WhySN.css';
import ImgWhy from '../../../Images/hero1.jpg';

export const WhySN: React.FC = () => {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: 'fa-solid fa-truck-fast',
      title: t('company.why_sn.reason1_title'),
      desc: t('company.why_sn.reason1_desc')
    },
    {
      icon: 'fa-solid fa-medal',
      title: t('company.why_sn.reason2_title'),
      desc: t('company.why_sn.reason2_desc')
    },
    {
      icon: 'fa-solid fa-handshake',
      title: t('company.why_sn.reason3_title'),
      desc: t('company.why_sn.reason3_desc')
    },
    {
      icon: 'fa-solid fa-tags',
      title: t('company.why_sn.reason4_title'),
      desc: t('company.why_sn.reason4_desc')
    }
  ];

  return (
    <section className="why-sn-section">
      <div className="why-sn-container">
        <div className="why-sn-flex">
          <div className="why-sn-image-side">
            <div className="why-sn-image-wrapper">
              <img src={ImgWhy} alt="Why SN Food" className="why-sn-main-img" />
              <div className="why-sn-experience-badge">
                <span className="exp-number">15+</span>
                <span className="exp-text">{t('company.promo.years')}</span>
              </div>
            </div>
          </div>
          
          <div className="why-sn-content-side">
            <div className="why-sn-header">
              <span className="why-sn-subtitle">{t('company.why_sn.subtitle')}</span>
              <h2 className="why-sn-title">{t('company.why_sn.title')}</h2>
              <p className="why-sn-intro">
                {t('company.why_sn.intro')}
              </p>
            </div>

            <div className="why-sn-features-list">
              {reasons.map((reason, index) => (
                <div key={index} className="why-sn-feature-item">
                  <div className="why-sn-feature-icon">
                    <i className={reason.icon}></i>
                  </div>
                  <div className="why-sn-feature-info">
                    <h3 className="why-sn-feature-title">{reason.title}</h3>
                    <p className="why-sn-feature-desc">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
