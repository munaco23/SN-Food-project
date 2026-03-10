import React from 'react';
import { useTranslation } from 'react-i18next';
import './VendorHistory.css';
import hero1 from '../../../Images/hero1.jpg';
import hero2 from '../../../Images/hero2.jpg';

export const VendorHistory: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="v-hist">
      <div className="v-hist-top">
        <div className="v-hist-inner">
          <div className="v-hist-content">
            <h2 className="v-hist-title">{t('vendors.infrastructure.title')}</h2>
            <h3 className="v-hist-sub">{t('vendors.infrastructure.sub')}</h3>
            <div className="v-hist-text">
              <p>
                {t('vendors.infrastructure.p1')}
              </p>
              <p>
                {t('vendors.infrastructure.p2')}
              </p>
              <p>
                {t('vendors.infrastructure.p3')}
              </p>
            </div>
          </div>
          <div className="v-hist-image">
            <img src={hero1} alt="Warehouse exterior" />
          </div>
        </div>
      </div>

      <div className="v-hist-mid">
        <div className="v-hist-inner">
          <div className="v-hist-grid-2">
           
          </div>
        </div>
      </div>
    </section>
  );
};
