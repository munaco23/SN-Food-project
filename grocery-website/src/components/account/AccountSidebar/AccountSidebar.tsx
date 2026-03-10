import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../utils/auth';
import './AccountSidebar.css';

type Tab = 'dashboard' | 'orders' | 'profile' | 'addresses';

interface AccountSidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const AccountSidebar: React.FC<AccountSidebarProps> = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    window.location.reload(); // Refresh to update header and other components
  };

  return (
    <aside className="account-sidebar">
      <nav className="account-nav">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''} 
          onClick={() => onTabChange('dashboard')}
        >
          <i className="fa-solid fa-gauge-high"></i> {t('sidebar.dashboard')}
        </button>
        <button 
          className={activeTab === 'orders' ? 'active' : ''} 
          onClick={() => onTabChange('orders')}
        >
          <i className="fa-solid fa-cart-arrow-down"></i> {t('sidebar.orders')}
        </button>
        <button 
          className={activeTab === 'addresses' ? 'active' : ''} 
          onClick={() => onTabChange('addresses')}
        >
          <i className="fa-solid fa-location-dot"></i> {t('sidebar.addresses')}
        </button>
        <button 
          className={activeTab === 'profile' ? 'active' : ''} 
          onClick={() => onTabChange('profile')}
        >
          <i className="fa-solid fa-user"></i> {t('sidebar.details')}
        </button>
        <button className="logout-link" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i> {t('sidebar.logout')}
        </button>
      </nav>
    </aside>
  );
};
