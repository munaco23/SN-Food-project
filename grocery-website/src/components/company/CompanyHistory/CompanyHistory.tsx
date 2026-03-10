import React from 'react';
import { useTranslation } from 'react-i18next';
import './CompanyHistory.css';
import HistoryImg from '../../../Images/hero1.jpg';

export const CompanyHistory: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="comp-history">
      <div className="comp-history-inner">
        <div className="comp-history-left">
          <h2 className="comp-history-title">{t('company.history.title')}</h2>
          <div className="comp-history-text">
            <p>
              {t('company.history.p1')}
            </p>
            <p>
              {t('company.history.p2')}
            </p>
            <p>
              {t('company.history.p3')}
            </p>
          </div>
        </div>
        <div className="comp-history-right">
          <img src={HistoryImg} alt="Fresh Tropical Team" className="comp-history-img" />
        </div>
      </div>
    </section>
  );
};
