import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { AccountSidebar } from '../../components/account/AccountSidebar/AccountSidebar';
import { AccountDashboard } from '../../components/account/AccountDashboard/AccountDashboard';
import { AccountOrders } from '../../components/account/AccountOrders/AccountOrders';
import { AccountAddresses } from '../../components/account/AccountAddresses/AccountAddresses';
import { AccountDetails } from '../../components/account/AccountDetails/AccountDetails';
import './Account.css';

type Tab = 'dashboard' | 'orders' | 'profile' | 'addresses';

export const Account: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AccountDashboard onTabChange={setActiveTab} />;
      case 'orders':
        return <AccountOrders />;
      case 'profile':
        return <AccountDetails />;
      case 'addresses':
        return <AccountAddresses />;
      default:
        return null;
    }
  };

  return (
    <div className="account-page">
      <Header />
      <div className="account-hero">
        <div className="container">
          <h1>{t('account_page.hero_title')}</h1>
          <nav className="account-crumbs">
            <span>{t('account_page.breadcrumb_home')}</span> &gt; <span className="active">{t('account_page.hero_title')}</span>
          </nav>
        </div>
      </div>

      <main className="account-main">
        <div className="container account-container">
          <AccountSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <section className="account-content">
            {renderContent()}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
