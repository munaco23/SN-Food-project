import React, { useEffect, useRef, useState } from 'react';
import './Register.css';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../utils/api';

export const Register: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    vatCountryCode: '',
    vatNumber: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    sdi: '',
    phone: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vatStatus, setVatStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [vatMessage, setVatMessage] = useState<string | null>(null);

  const vatReqSeq = useRef(0);

  const normalizeVatNumber = (countryCode: string, vatNumber: string) => {
    const cc = (countryCode || '').trim().toUpperCase();
    let num = String(vatNumber || '').trim();
    num = num.replace(/\s+/g, '');
    if (cc && num.toUpperCase().startsWith(cc)) {
      num = num.slice(cc.length);
    }
    return { cc, num };
  };

  const verifyVat = async (countryCode: string, vatNumber: string) => {
    const { cc, num } = normalizeVatNumber(countryCode, vatNumber);
    if (!cc || !num) {
      setVatStatus('idle');
      setVatMessage(null);
      return;
    }

    const reqId = ++vatReqSeq.current;
    setVatStatus('checking');
    setVatMessage(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-vat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ countryCode: cc, vatNumber: num })
      });
      const data = await response.json();

      if (reqId !== vatReqSeq.current) return;

      if (data.ok) {
        setVatStatus('valid');
        setVatMessage(null);
      } else {
        setVatStatus('invalid');
        setVatMessage(data.message || 'Invalid VAT number');
      }
    } catch {
      if (reqId !== vatReqSeq.current) return;
      setVatStatus('invalid');
      setVatMessage('VAT verification failed. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const next = { ...formData, [e.target.id]: e.target.value } as typeof formData;
    setFormData(next);
  };

  useEffect(() => {
    const { cc, num } = normalizeVatNumber(formData.vatCountryCode, formData.vatNumber);
    if (!cc || !num) {
      vatReqSeq.current += 1;
      setVatStatus('idle');
      setVatMessage(null);
      return;
    }

    const t = window.setTimeout(() => {
      verifyVat(cc, num);
    }, 500);

    return () => window.clearTimeout(t);
  }, [formData.vatCountryCode, formData.vatNumber]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (vatStatus !== 'valid') {
      setError('Please verify your VAT number before registering.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const normalized = normalizeVatNumber(formData.vatCountryCode, formData.vatNumber);
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          company: formData.company,
          vatCountryCode: normalized.cc,
          vatNumber: normalized.num,
          vat: `${normalized.cc}${normalized.num}`,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          postalCode: formData.postalCode,
          sdi: formData.sdi,
          phone: formData.phone,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (data.ok) {
        navigate('/login'); // Redirect to login after successful registration
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <Header />
      <main className="register-main">
        <div className="register-card">
          <h1 className="auth-title">{t('auth.register')}</h1>
          {error && <div className="auth-error-msg">{error}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">{t('auth.first_name')}</label>
                <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">{t('auth.last_name')}</label>
                <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">{t('auth.company_name')}</label>
                <input type="text" id="company" value={formData.company} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="vatCountryCode">VAT Country</label>
                <select id="vatCountryCode" value={formData.vatCountryCode} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="AT">AT</option>
                  <option value="BE">BE</option>
                  <option value="BG">BG</option>
                  <option value="CY">CY</option>
                  <option value="CZ">CZ</option>
                  <option value="DE">DE</option>
                  <option value="DK">DK</option>
                  <option value="EE">EE</option>
                  <option value="EL">EL</option>
                  <option value="ES">ES</option>
                  <option value="FI">FI</option>
                  <option value="FR">FR</option>
                  <option value="HR">HR</option>
                  <option value="HU">HU</option>
                  <option value="IE">IE</option>
                  <option value="IT">IT</option>
                  <option value="LT">LT</option>
                  <option value="LU">LU</option>
                  <option value="LV">LV</option>
                  <option value="MT">MT</option>
                  <option value="NL">NL</option>
                  <option value="PL">PL</option>
                  <option value="PT">PT</option>
                  <option value="RO">RO</option>
                  <option value="SE">SE</option>
                  <option value="SI">SI</option>
                  <option value="SK">SK</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="vatNumber">{t('auth.vat_number')}</label>
                <input type="text" id="vatNumber" value={formData.vatNumber} onChange={handleChange} required />
                {vatStatus === 'checking' && <div className="auth-vat-hint">Verifying VAT...</div>}
                {vatStatus === 'valid' && <div className="auth-vat-hint auth-vat-hint--ok">VAT verified</div>}
                {vatStatus === 'invalid' && <div className="auth-vat-hint auth-vat-hint--err">{vatMessage || 'Invalid VAT number'}</div>}
              </div>
              <div className="form-group" />
            </div>

            <h2 className="section-subtitle">{t('auth.billing_address')}</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address">{t('auth.address')}</label>
                <input type="text" id="address" value={formData.address} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="city">{t('auth.city')}</label>
                <input type="text" id="city" value={formData.city} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="country">{t('auth.country')}</label>
                <input type="text" id="country" value={formData.country} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">{t('auth.postal_code')}</label>
                <input type="text" id="postalCode" value={formData.postalCode} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sdi">{t('auth.sdi_pec')}</label>
                <input type="text" id="sdi" value={formData.sdi} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">{t('auth.phone')}</label>
                <input type="tel" id="phone" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>

            <h2 className="section-subtitle">{t('auth.account')}</h2>

            <div className="form-group">
              <label htmlFor="email">{t('auth.email')}</label>
              <input type="email" id="email" placeholder="fresh-tropical@email.com" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="password">{t('auth.password')}</label>
              <input type="password" id="password" placeholder={t('auth.password')} value={formData.password} onChange={handleChange} required />
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading || vatStatus !== 'valid'}>
              {loading ? '...' : t('auth.register')}
            </button>
          </form>

          <div className="auth-divider">
            <span>{t('auth.already_have')}</span>
          </div>
          <Link to="/login" className="auth-secondary-btn">{t('auth.login')}</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};
