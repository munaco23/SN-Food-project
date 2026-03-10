import React from 'react';
import { useTranslation } from 'react-i18next';
import './CompanyValues.css';

export const CompanyValues: React.FC = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: 'fa-solid fa-gem',
      title: t('company.values.quality_title'),
      desc: t('company.values.quality_desc')
    },
    {
      icon: 'fa-solid fa-handshake-angle',
      title: t('company.values.integrity_title'),
      desc: t('company.values.integrity_desc')
    },
    {
      icon: 'fa-solid fa-users-gear',
      title: t('company.values.commitment_title'),
      desc: t('company.values.commitment_desc')
    }
  ];

  return (
    <section className="values-section">
      <div className="values-container">
        <div className="values-header">
          <span className="values-subtitle">{t('company.values.subtitle')}</span>
          <h2 className="values-title">{t('company.values.title')}</h2>
        </div>
        <div className="values-grid">
          {values.map((val, idx) => (
            <div key={idx} className="value-card">
              <div className="value-icon-wrapper">
                <i className={val.icon}></i>
              </div>
              <h3 className="value-card-title">{val.title}</h3>
              <p className="value-card-desc">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
