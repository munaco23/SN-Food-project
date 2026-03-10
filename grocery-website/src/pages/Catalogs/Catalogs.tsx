import React from 'react';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { CatalogHero } from '../../components/catalogs/CatalogHero/CatalogHero';
import { CatalogGrid } from '../../components/catalogs/CatalogGrid/CatalogGrid';
import { RequestInformation } from '../../components/company/RequestInformation/RequestInformation';

export const Catalogs: React.FC = () => {
  return (
    <div className="catalogs-page">
      <Header />
      <main>
        <CatalogHero />
        <CatalogGrid />
        <RequestInformation />
      </main>
      <Footer />
    </div>
  );
};
