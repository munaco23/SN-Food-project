import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './BrandsGrid.css';

type Brand = {
  id: string;
  name: string;
  imageSrc: string;
};

const toTitleCase = (value: string) =>
  value
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

const nameFromFilename = (filename: string) => {
  const raw = filename.replace(/^\.\//, '');
  const withoutExt = raw.replace(/\.(png|jpe?g|gif|webp)$/i, '').replace(/\.(png|jpe?g|gif|webp)$/i, '');
  const withoutPrefix = withoutExt.replace(/^[0-9a-f]+_/i, '').replace(/^[0-9]+_/i, '');
  const cleaned = withoutPrefix
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return toTitleCase(cleaned);
};

const getBrandItems = (): Brand[] => {
  const ctx = (require as any).context('../../../Images/Brands', false, /\.(png|jpe?g|gif|webp)$/i);
  const keys: string[] = ctx.keys();

  return keys
    .map((key, index) => {
      const mod = ctx(key);
      const src: string = (mod && mod.default) || mod;
      return {
        id: `b${index + 1}`,
        name: nameFromFilename(key),
        imageSrc: src,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const BrandsGrid: React.FC = () => {
  const { t } = useTranslation();

  const brands = useMemo<Brand[]>(
    () => getBrandItems().slice(0, 16),
    []
  );

  return (
    <section className="bg" aria-label={t('company.brands.aria')}>
      <div className="bg-inner">
        <header className="bg-head">
          <h2 className="bg-title">{t('company.brands.title')}</h2>
          <Link className="bg-see" to="/brands">{t('company.brands.see_all')}</Link>
        </header>

        <p className="bg-sub">
          {t('company.brands.sub')}
        </p>

        <div className="bg-grid">
          {brands.map((b) => (
            <Link key={b.id} className="bg-card" to="/brands" aria-label={b.name}>
              <img className="bg-logo" src={b.imageSrc} alt={b.name} />
              <span className="bg-name">{b.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
