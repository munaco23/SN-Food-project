import React from 'react';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { NewArrivalsHero } from '../../components/newarrivals/NewArrivalsHero/NewArrivalsHero';
import { NewArrivalsGrid } from '../../components/newarrivals/NewArrivalsGrid/NewArrivalsGrid';
import { RequestInformation } from '../../components/company/RequestInformation/RequestInformation';

export const NewArrivals: React.FC = () => {
  return (
    <div className="na-page">
      <Header />
      <main>
        <NewArrivalsHero />
        <NewArrivalsGrid />
        <RequestInformation />
      </main>
      <Footer />
    </div>
  );
};
