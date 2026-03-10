import React from 'react';
import { useTranslation } from 'react-i18next';
import './BrandsDetailGrid.css';
import Logo from '../../../Images/Logo.jpeg';

type Brand = {
  id: number;
  name: string;
  image: string;
};

const popularBrands: Brand[] = [
  { id: 1, name: 'Aashirvaad', image: Logo },
  { id: 2, name: 'Aroy-D', image: Logo },
  { id: 3, name: 'Daawat', image: Logo },
  { id: 4, name: 'Foco', image: Logo },
  { id: 5, name: "Haldiram's", image: Logo },
  { id: 6, name: 'India Gate', image: Logo },
  { id: 7, name: 'Indomie', image: Logo },
  { id: 8, name: 'Maggi', image: Logo },
  { id: 9, name: 'Mdh', image: Logo },
  { id: 10, name: 'Nido', image: Logo },
  { id: 11, name: 'Nongshim', image: Logo },
  { id: 12, name: 'Peak', image: Logo },
  { id: 13, name: 'Royal Umbrella', image: Logo },
  { id: 14, name: 'Samyang', image: Logo },
  { id: 15, name: 'Shan', image: Logo },
  { id: 16, name: 'Spoon & Spoon', image: Logo },
  { id: 17, name: 'Tapal', image: Logo },
  { id: 18, name: 'Tata Tea', image: Logo },
];

export const BrandsDetailGrid: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="brands-det-sec">
      <div className="brands-det-inner">
        <h2 className="brands-det-title">{t('brands_page.popular_title')}</h2>
        
        <div className="brands-det-grid">
          {popularBrands.map((brand) => (
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
