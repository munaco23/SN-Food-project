import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './BrandsGrid.css';
import Logo from '../../../Images/Logo.jpeg';

type Brand = {
  id: string;
  name: string;
  imageSrc: string;
};

export const BrandsGrid: React.FC = () => {
  const { t } = useTranslation();

  const brands = useMemo<Brand[]>(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: `b${i + 1}`,
        name: `Brand ${i + 1}`,
        imageSrc: Logo,
      })),
    []
  );

  return (
    <section className="bg" aria-label={t('company.brands.aria')}>
      <div className="bg-inner">
        <header className="bg-head">
          <h2 className="bg-title">{t('company.brands.title')}</h2>
          <button className="bg-see" type="button">{t('company.brands.see_all')}</button>
        </header>

        <p className="bg-sub">
          {t('company.brands.sub')}
        </p>

        <div className="bg-grid">
          {brands.map((b) => (
            <button key={b.id} className="bg-card" type="button" aria-label={b.name}>
              <img className="bg-logo" src={b.imageSrc} alt={b.name} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
