import React from 'react';
import './Footer.css';
import Logo from '../../../Images/Logo.jpeg';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col footer-brand-col">
            <Link to="/">
              <img src={Logo} alt={t('footer.brand_alt')} className="footer-logo" />
            </Link>
            <p className="footer-brand-text">
              {t('footer.brand_text')}
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col footer-hide-mobile">
            <h3 className="footer-title">{t('footer.quick_links')}</h3>
            <ul className="footer-links">
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/company">{t('nav.company')}</Link></li>
              <li><Link to="/team">{t('nav.team')}</Link></li>
              <li><Link to="/events">{t('nav.events')}</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col footer-hide-mobile">
            <h3 className="footer-title">{t('footer.categories')}</h3>
            <ul className="footer-links">
              <li><Link to="/new-arrivals">{t('nav.new_arrivals')}</Link></li>
              <li><Link to="/brands">{t('nav.brands')}</Link></li>
              <li><Link to="/vendors">{t('nav.vendors')}</Link></li>
              <li><Link to="/customers">{t('nav.customers')}</Link></li>
              <li><Link to="/login">{t('footer.account')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col footer-contact-col">
            <h3 className="footer-title">{t('footer.contact_us')}</h3>
            <div className="footer-contact-item">
              <i className="fa-solid fa-location-dot"></i>
              <span>{t('topbar.address')}</span>
            </div>
            <div className="footer-contact-item">
              <i className="fa-solid fa-phone"></i>
              <span>{t('footer.contact_wholesale')}</span>
            </div>
            <div className="footer-contact-item">
              <i className="fa-solid fa-envelope"></i>
              <span>{t('topbar.email')}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} SN Food Distribution. {t('footer.rights')}</p>
          <div className="footer-bottom-links">
            <a href="#">{t('footer.terms')}</a>
            <a href="#">{t('footer.privacy')}</a>
            <a href="#">{t('footer.cookie')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
