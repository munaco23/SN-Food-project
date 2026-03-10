import React from 'react';
import { useTranslation } from 'react-i18next';
import './LogisticsArea.css';
import Bg from '../../../Images/hero2.jpg';

export const LogisticsArea: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="comp-log" aria-label={t('company.logistics.aria')} style={{ backgroundImage: `url(${Bg})` }}>
      <div className="comp-log-overlay" />
      <div className="comp-log-inner">
        <h2 className="comp-log-title">
          {t('company.logistics.title_line1')}<br />
          {t('company.logistics.title_line2')}
        </h2>
        
        <div className="comp-log-text">
          <p>{t('company.logistics.p1')}</p>
          <p>{t('company.logistics.p2')}</p>
          <p>{t('company.logistics.p3')}</p>
        </div>
      </div>
    </section>
  );
};
