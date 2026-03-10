import React, { useState } from 'react';
import './Login.css';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../utils/api';

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.ok) {
        // Store user info in localStorage for session persistence
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem('token', String(data.token));
        }
        const redirect = searchParams.get('redirect');
        navigate(redirect ? decodeURIComponent(redirect) : '/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Header />
      <main className="login-main">
        <div className="login-card">
          <h1 className="auth-title">{t('auth.login')}</h1>
          {error && <div className="auth-error-msg">{error}</div>}
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">{t('auth.email')}</label>
              <input 
                type="email" 
                id="email" 
                placeholder="fresh-tropical@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">{t('auth.password')}</label>
              <input 
                type="password" 
                id="password" 
                placeholder={t('auth.password')} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <div className="form-options">
              <Link to="#" className="forgot-link">{t('auth.forgot_password')}</Link>
            </div>
            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? '...' : t('auth.login')}
            </button>
          </form>
          <div className="auth-divider">
            <span>{t('auth.new_to')}</span>
          </div>
          <Link to="/register" className="auth-secondary-btn">{t('auth.register')}</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};
