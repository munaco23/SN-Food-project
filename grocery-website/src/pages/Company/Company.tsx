import React from 'react';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { CompanyHero } from '../../components/company/CompanyHero/CompanyHero';
import { CompanyHistory } from '../../components/company/CompanyHistory/CompanyHistory';
import { WhySN } from '../../components/company/WhySN/WhySN';
import { LogisticsArea } from '../../components/company/LogisticsArea/LogisticsArea';
import { CompanyValues } from '../../components/company/CompanyValues/CompanyValues';
import { BrandsGrid } from '../../components/sections/BrandsGrid/BrandsGrid';
import { RequestInformation } from '../../components/company/RequestInformation/RequestInformation';

export const Company: React.FC = () => {
  return (
    <div className="company-page">
      <Header />
      <main>
        <CompanyHero />
        <CompanyHistory />
        <WhySN />
        <LogisticsArea />
        <CompanyValues />
        <BrandsGrid />
        <RequestInformation />
      </main>
      <Footer />
    </div>
  );
};
