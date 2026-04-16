import React from 'react';
import { useTranslation } from 'react-i18next';
import './BrandsDetailGrid.css';

type Brand = {
  id: number;
  name: string;
  image: string;
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

  const items = keys
    .map((key, index) => {
      const mod = ctx(key);
      const src: string = (mod && mod.default) || mod;
      return {
        id: index + 1,
        name: nameFromFilename(key),
        image: src,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return items;
};

export const BrandsDetailGrid: React.FC = () => {
  const { t } = useTranslation();
  const brands = React.useMemo(() => getBrandItems(), []);

  return (
    <section className="brands-det-sec">
      <div className="brands-det-inner">
        <h2 className="brands-det-title">{t('brands_page.popular_title')}</h2>
        
        <div className="brands-det-grid">
          {brands.map((brand) => (
            <div key={brand.id} className="brand-det-card">
              <div className="brand-det-card-img">
                <img src={brand.image} alt={brand.name} />
              </div>
              <p className="brand-det-card-name">{brand.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
