import React from 'react';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { BrandsHero } from '../../components/brands/BrandsHero/BrandsHero';
import { BrandsDetailGrid } from '../../components/brands/BrandsDetailGrid/BrandsDetailGrid';
import { RequestInformation } from '../../components/company/RequestInformation/RequestInformation';

export const Brands: React.FC = () => {
  return (
    <div className="brands-page">
      <Header />
      <main>
        <BrandsHero />
        <BrandsDetailGrid />
        <RequestInformation />
      </main>
      <Footer />
    </div>
  );
};
