import React from 'react';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { VendorHero } from '../../components/vendors/VendorHero/VendorHero';
import { VendorHistory } from '../../components/vendors/VendorHistory/VendorHistory';
import { VendorWhyChooseUs } from '../../components/vendors/VendorWhyChooseUs/VendorWhyChooseUs';
import { RequestInformation } from '../../components/company/RequestInformation/RequestInformation';

export const Vendors: React.FC = () => {
  return (
    <div className="vendors-page">
      <Header />
      <main>
        <VendorHero />
        <VendorHistory />
        <VendorWhyChooseUs />
        <RequestInformation />
      </main>
      <Footer />
    </div>
  );
};
