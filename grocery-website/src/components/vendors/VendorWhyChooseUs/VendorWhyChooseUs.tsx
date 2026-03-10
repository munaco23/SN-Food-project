import React from 'react';
import { useTranslation } from 'react-i18next';
import './VendorWhyChooseUs.css';

export const VendorWhyChooseUs: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: 'shield-check',
      title: t('vendors.guarantees.items.excellence.title'),
      desc: t('vendors.guarantees.items.excellence.desc')
    },
    {
      icon: 'box',
      title: t('vendors.guarantees.items.supply.title'),
      desc: t('vendors.guarantees.items.supply.desc')
    },
    {
      icon: 'handshake',
      title: t('vendors.guarantees.items.partnerships.title'),
      desc: t('vendors.guarantees.items.partnerships.desc')
    },
    {
      icon: 'snowflake',
      title: t('vendors.guarantees.items.cold_chain.title'),
      desc: t('vendors.guarantees.items.cold_chain.desc')
    },
    {
      icon: 'truck-fast',
      title: t('vendors.guarantees.items.innovation.title'),
      desc: t('vendors.guarantees.items.innovation.desc')
    },
    {
      icon: 'certificate',
      title: t('vendors.guarantees.items.certified.title'),
      desc: t('vendors.guarantees.items.certified.desc')
    }
  ];

  return (
    <section className="v-why">
      <div className="v-why-inner">
        <header className="v-why-head">
          <div className="v-why-head-left">
            <h2 className="v-why-title">{t('vendors.guarantees.title')}</h2>
            <h3 className="v-why-sub">{t('vendors.guarantees.sub')}</h3>
            <p className="v-why-desc">
              {t('vendors.guarantees.desc')}
            </p>
          </div>
          <div className="v-why-head-right">
            <button className="v-why-cta" type="button">{t('vendors.guarantees.cta')}</button>
          </div>
        </header>

        <div className="v-why-grid">
          {features.map((f, i) => (
            <div key={i} className="v-why-card">
              <div className="v-why-icon-box">
                <i className={`fa-solid fa-${f.icon}`} />
              </div>
              <div className="v-why-card-content">
                <h4 className="v-why-card-title">{f.title}</h4>
                <p className="v-why-card-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
