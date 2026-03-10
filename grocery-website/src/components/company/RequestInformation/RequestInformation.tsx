import React from 'react';
import { useTranslation } from 'react-i18next';
import './RequestInformation.css';

export const RequestInformation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="ri" aria-label={t('company.request_info.aria')}>
      <div className="ri-inner">
        <div className="ri-left">
          <h2 className="ri-title">{t('company.request_info.title')}</h2>
          <p className="ri-text">
            {t('company.request_info.text')}
          </p>
        </div>

        <div className="ri-right">
          <button className="ri-btn" type="button">{t('company.request_info.cta')}</button>
        </div>
      </div>
    </section>
  );
};
