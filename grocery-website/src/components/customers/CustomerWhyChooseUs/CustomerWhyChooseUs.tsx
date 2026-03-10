import React from 'react';
import { useTranslation } from 'react-i18next';
import './CustomerWhyChooseUs.css';

export const CustomerWhyChooseUs: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: 'bowl-rice',
      title: t('customers.categories.items.dry.title'),
      desc: t('customers.categories.items.dry.desc')
    },
    {
      icon: 'leaf',
      title: t('customers.categories.items.fresh.title'),
      desc: t('customers.categories.items.fresh.desc')
    },
    {
      icon: 'snowflake',
      title: t('customers.categories.items.frozen.title'),
      desc: t('customers.categories.items.frozen.desc')
    },
    {
      icon: 'bottle-water',
      title: t('customers.categories.items.drinks.title'),
      desc: t('customers.categories.items.drinks.desc')
    },
    {
      icon: 'certificate',
      title: t('customers.categories.items.halal.title'),
      desc: t('customers.categories.items.halal.desc')
    },
    {
      icon: 'earth-africa',
      title: t('customers.categories.items.african.title'),
      desc: t('customers.categories.items.african.desc')
    }
  ];

  return (
    <section className="c-why">
      <div className="c-why-inner">
        <header className="c-why-head">
          <div className="c-why-head-left">
            <h2 className="c-why-title">{t('customers.categories.title')}</h2>
            <h3 className="c-why-sub">{t('customers.categories.sub')}</h3>
            <p className="c-why-desc">
              {t('customers.categories.desc')}
            </p>
          </div>
          <div className="c-why-head-right">
            <button className="c-why-cta" type="button">{t('customers.categories.cta')}</button>
          </div>
        </header>

        <div className="c-why-grid">
          {features.map((f, i) => (
            <div key={i} className="c-why-card">
              <div className="c-why-icon-box">
                <i className={`fa-solid fa-${f.icon}`} />
              </div>
              <div className="c-why-card-content">
                <h4 className="c-why-card-title">{f.title}</h4>
                <p className="c-why-card-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
