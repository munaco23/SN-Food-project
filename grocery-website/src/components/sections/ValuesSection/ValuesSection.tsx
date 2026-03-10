import React from 'react';
import { useTranslation } from 'react-i18next';
import './ValuesSection.css';
import TeamImg from '../../../Images/hero1.jpg';

export const ValuesSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="vals" aria-label={t('values.title')}>
      <div className="vals-inner">
        <div className="vals-left">
          <h2 className="vals-title">{t('values.title')}</h2>
          <div className="vals-sub">{t('values.sub')}</div>
          <p className="vals-text">
            {t('values.text')}
          </p>
          <button className="vals-link" type="button">{t('values.cta')}</button>
        </div>

        <div className="vals-right" aria-hidden="true">
          <img className="vals-img" src={TeamImg} alt="" />
        </div>
      </div>
    </section>
  );
};
