import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../../utils/api';
import { getCurrentUser } from '../../../utils/auth';
import './AccountDetails.css';

export const AccountDetails: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vat: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const user = getCurrentUser();
      const pId = user?.partnerId || user?.id; // Use partnerId if available, fallback to id
      if (!pId) return;

      try {
        const res = await fetch(`${API_BASE_URL}/api/account/${pId}`);
        const data = await res.json();
        if (data.ok) {
          setFormData({
            name: data.partner.name || '',
            phone: data.partner.phone || '',
            email: data.partner.email || '',
            vat: data.partner.vat || ''
          });
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = getCurrentUser();
    const pId = user?.partnerId || user?.id;
    if (!pId) return;

    try {
      setSaving(true);
      const res = await fetch(`${API_BASE_URL}/api/account/${pId}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone
        })
      });
      const data = await res.json();
      if (data.ok) {
        alert('Profile updated successfully');
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (err) {
      alert('Connection error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="account-panel">Loading profile...</div>;

  return (
    <div className="account-panel">
      <h2 className="panel-title">{t('details.title')}</h2>
      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('details.full_name', { defaultValue: 'Full Name' })} *</label>
          <input 
            type="text" 
            value={formData.name || ''} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            placeholder={t('details.full_name', { defaultValue: 'Full Name' })}
            required 
          />
        </div>
        
        <div className="form-group">
          <label>{t('details.email', { defaultValue: 'Email Address' })} *</label>
          <input type="email" value={formData.email || ''} placeholder={t('details.email', { defaultValue: 'Email Address' })} disabled />
          <small>{t('details.email_hint', { defaultValue: 'Email cannot be changed here.' })}</small>
        </div>

        <div className="form-group">
          <label>{t('details.vat', { defaultValue: 'VAT Number' })}</label>
          <input type="text" value={formData.vat || ''} placeholder={t('details.vat', { defaultValue: 'VAT Number' })} disabled />
          <small>{t('details.vat_hint', { defaultValue: 'VAT number cannot be changed here.' })}</small>
        </div>

        <div className="form-group">
          <label>{t('details.phone', { defaultValue: 'Phone Number' })}</label>
          <input 
            type="text" 
            value={formData.phone || ''} 
            placeholder={t('details.phone', { defaultValue: 'Phone Number' })}
            onChange={e => setFormData({...formData, phone: e.target.value})} 
          />
        </div>

        <fieldset className="password-fieldset">
          <legend>{t('details.password_change')}</legend>
          <div className="form-group">
            <label>{t('details.current_password')}</label>
            <input type="password" placeholder={t('details.current_password_ph', { defaultValue: 'Leave blank to keep current' })} />
          </div>
          <div className="form-group">
            <label>{t('details.new_password')}</label>
            <input type="password" placeholder={t('details.new_password_ph', { defaultValue: 'New password' })} />
          </div>
        </fieldset>
        
        <button type="submit" className="save-btn" disabled={saving}>
          {saving ? t('details.saving', { defaultValue: 'Saving...' }) : t('details.save_changes')}
        </button>
      </form>
    </div>
  );
};
