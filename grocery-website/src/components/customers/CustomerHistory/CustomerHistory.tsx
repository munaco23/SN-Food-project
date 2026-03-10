import React from 'react';
import { useTranslation } from 'react-i18next';
import './CustomerHistory.css';
import hero1 from '../../../Images/hero1.jpg';
import hero2 from '../../../Images/hero2.jpg';

export const CustomerHistory: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="c-hist">
      <div className="c-hist-top">
        <div className="c-hist-inner">
          <div className="c-hist-content">
            <h2 className="c-hist-title">{t('customers.stats.title')}</h2>
            <h3 className="c-hist-sub">{t('customers.stats.sub')}</h3>
            <div className="c-hist-text">
              <p>
                {t('customers.stats.p1')}
              </p>
              <p>
                {t('customers.stats.p2')}
              </p>
            </div>
          </div>
          <div className="c-hist-image">
            <img src={hero1} alt="Logistics facility" />
          </div>
        </div>
      </div>

      <div className="c-hist-mid">
        <div className="c-hist-inner">
          <div className="c-hist-grid-2">
            
          </div>
        </div>
      </div>
    </section>
  );
};
