import React from 'react';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { CustomerHero } from '../../components/customers/CustomerHero/CustomerHero';
import { CustomerHistory } from '../../components/customers/CustomerHistory/CustomerHistory';
import { CustomerWhyChooseUs } from '../../components/customers/CustomerWhyChooseUs/CustomerWhyChooseUs';
import { RequestInformation } from '../../components/company/RequestInformation/RequestInformation';

export const Customers: React.FC = () => {
  return (
    <div className="customers-page">
      <Header />
      <main>
        <CustomerHero />
        <CustomerHistory />
        <CustomerWhyChooseUs />
        <RequestInformation />
      </main>
      <Footer />
    </div>
  );
};
