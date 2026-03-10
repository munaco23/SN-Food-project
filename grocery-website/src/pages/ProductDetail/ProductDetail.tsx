import React from 'react';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { ProductView } from '../../components/product/ProductView/ProductView';
import { ProductsOfWeek } from '../../components/sections/ProductsOfWeek/ProductsOfWeek';

export const ProductDetail: React.FC = () => {
  return (
    <div className="product-detail-page">
      <Header />
      <main>
        <ProductView />
        {/* We now show ProductsOfWeek below ProductView */}
        <div style={{ marginTop: '40px' }}>
          <ProductsOfWeek />
        </div>
      </main>
      <Footer />
    </div>
  );
};
