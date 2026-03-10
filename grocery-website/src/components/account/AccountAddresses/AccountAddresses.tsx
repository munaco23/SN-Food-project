import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../../utils/api';
import { getCurrentUser } from '../../../utils/auth';
import './AccountAddresses.css';

interface AddressData {
  street: string;
  street2: string;
  city: string;
  zip: string;
  country_id: [number, string] | false;
}

export const AccountAddresses: React.FC = () => {
  const { t } = useTranslation();
  const [address, setAddress] = useState<AddressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<AddressData>({
    street: '',
    street2: '',
    city: '',
    zip: '',
    country_id: false
  });

  useEffect(() => {
    const fetchAddress = async () => {
      const user = getCurrentUser();
      const pId = user?.partnerId || user?.id;
      if (!pId) return;

      try {
        const res = await fetch(`${API_BASE_URL}/api/account/${pId}`);
        const data = await res.json();
        if (data.ok) {
          setAddress(data.partner);
          setFormData({
            street: data.partner.street || '',
            street2: data.partner.street2 || '',
            city: data.partner.city || '',
            zip: data.partner.zip || '',
            country_id: data.partner.country_id || false
          });
        } else {
          setError(data.message || 'Failed to fetch address');
        }
      } catch (err) {
        setError('Connection error');
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = getCurrentUser();
    const pId = user?.partnerId || user?.id;
    if (!pId) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/account/${pId}/address`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.ok) {
        setAddress({ ...address!, ...formData });
        setIsEditing(false);
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (err) {
      alert('Connection error');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !address) return <div className="account-panel">Loading address...</div>;

  return (
    <div className="account-panel">
      <h2 className="panel-title">{t('addresses.title')}</h2>
      <p className="panel-desc">{t('addresses.desc')}</p>

      {isEditing ? (
        <form className="address-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label>{t('details.address', { defaultValue: 'Street' })}</label>
            <input 
              type="text" 
              value={formData.street} 
              onChange={e => setFormData({...formData, street: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group">
            <label>{t('details.address2', { defaultValue: 'Street 2' })}</label>
            <input 
              type="text" 
              value={formData.street2} 
              onChange={e => setFormData({...formData, street2: e.target.value})} 
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>{t('details.city', { defaultValue: 'City' })}</label>
              <input 
                type="text" 
                value={formData.city} 
                onChange={e => setFormData({...formData, city: e.target.value})} 
                required 
              />
            </div>
            <div className="form-group">
              <label>{t('details.postal_code', { defaultValue: 'ZIP Code' })}</label>
              <input 
                type="text" 
                value={formData.zip} 
                onChange={e => setFormData({...formData, zip: e.target.value})} 
                required 
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? t('details.saving', { defaultValue: 'Saving...' }) : t('details.save_changes')}
            </button>
            <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>{t('details.cancel', { defaultValue: 'Cancel' })}</button>
          </div>
        </form>
      ) : (
        <div className="address-grid">
          <div className="address-card">
            <div className="address-head">
              <h3>{t('addresses.billing')}</h3>
              <button className="edit-link" onClick={() => setIsEditing(true)}>
                {t('addresses.edit')}
              </button>
            </div>
            <div className="address-body">
              {address ? (
                <>
                  <p><strong>{address.street}</strong></p>
                  {address.street2 && <p>{address.street2}</p>}
                  <p>{address.zip} {address.city}</p>
                  <p>{Array.isArray(address.country_id) ? address.country_id[1] : ''}</p>
                </>
              ) : (
                <p className="placeholder-text">{t('addresses.placeholder')}</p>
              )}
            </div>
          </div>
          <div className="address-card">
            <div className="address-head">
              <h3>{t('addresses.shipping')}</h3>
              <button className="edit-link" onClick={() => setIsEditing(true)}>
                {t('addresses.edit')}
              </button>
            </div>
            <div className="address-body">
              {address?.street ? (
                <>
                  <p><strong>{address.street}</strong></p>
                  {address.street2 && <p>{address.street2}</p>}
                  <p>{address.zip} {address.city}</p>
                  <p>{Array.isArray(address.country_id) ? address.country_id[1] : ''}</p>
                </>
              ) : (
                <p className="placeholder-text">{t('addresses.placeholder')}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
