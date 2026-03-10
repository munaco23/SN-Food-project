import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../utils/api';
import { getCurrentUser } from '../../../utils/auth';
import './AccountOrders.css';

interface Order {
  id: number;
  name: string;
  date_order: string;
  state: string;
  amount_total: number;
}

export const AccountOrders: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = getCurrentUser();
      const pId = user?.partnerId || user?.id;
      if (!pId) return;

      try {
        const res = await fetch(`${API_BASE_URL}/api/account/${pId}`);
        const data = await res.json();
        if (data.ok) {
          setOrders(data.orders || []);
        } else {
          setError(data.message || 'Failed to fetch orders');
        }
      } catch (err) {
        setError('Connection error');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusLabel = (state: string) => {
    switch (state) {
      case 'draft': return 'Draft';
      case 'sent': return 'Sent';
      case 'sale': return 'Sales Order';
      case 'done': return 'Locked';
      case 'cancel': return 'Cancelled';
      default: return state;
    }
  };

  if (loading) return <div className="account-panel">Loading orders...</div>;
  if (error) return <div className="account-panel error">{error}</div>;

  return (
    <div className="account-panel">
      <h2 className="panel-title">{t('orders.title')}</h2>
      
      {orders.length === 0 ? (
        <div className="empty-state">
          <i className="fa-solid fa-cart-shopping"></i>
          <p>{t('orders.empty')}</p>
          <button className="browse-btn" onClick={() => navigate('/shop')}>
            {t('orders.browse')}
          </button>
        </div>
      ) : (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>{t('details.order_id', { defaultValue: 'Order ID' })}</th>
                <th>{t('details.date', { defaultValue: 'Date' })}</th>
                <th>{t('details.status', { defaultValue: 'Status' })}</th>
                <th>{t('details.total', { defaultValue: 'Total' })}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">#{order.name}</td>
                  <td>{new Date(order.date_order).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge status-${order.state}`}>
                      {getStatusLabel(order.state)}
                    </span>
                  </td>
                  <td className="order-total">{order.amount_total.toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
