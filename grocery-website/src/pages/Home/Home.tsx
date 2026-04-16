import React from 'react';
import { Header } from '../../components/layout/Header/Header';
import { HeroSlider } from '../../components/sections/HeroSlider/HeroSlider';
import { FeatureHighlights } from '../../components/sections/FeatureHighlights/FeatureHighlights';
import { ProductsOfWeek } from '../../components/sections/ProductsOfWeek/ProductsOfWeek';
import { TopRatedSection } from '../../components/sections/TopRatedSection/TopRatedSection';
import { DiscoverBanner } from '../../components/sections/DiscoverBanner/DiscoverBanner';
import { CategoriesSection } from '../../components/sections/CategoriesSection/CategoriesSection';
import { FeatureStrip } from '../../components/sections/FeatureStrip/FeatureStrip';
import { BrandsGrid } from '../../components/sections/BrandsGrid/BrandsGrid';
import { ExportEurope } from '../../components/sections/ExportEurope/ExportEurope';
import { Footer } from '../../components/layout/Footer/Footer';

export const Home: React.FC = () => {
  return (
    <>
      <Header />
      <HeroSlider />
      <FeatureHighlights />
      <ProductsOfWeek />
      <DiscoverBanner />
      <CategoriesSection />
      <FeatureStrip />
      <TopRatedSection />
      <BrandsGrid />
      <ExportEurope />
      <Footer />
    </>
  );
};
