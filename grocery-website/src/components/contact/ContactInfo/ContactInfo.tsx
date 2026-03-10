import React from 'react';
import { useTranslation } from 'react-i18next';
import './ContactInfo.css';

export const ContactInfo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="contact-info-grid">
      <div className="contact-info-card">
        <div className="contact-info-icon">
          <i className="fa-solid fa-location-dot" />
        </div>
        <h3>{t('contact_page.info.location_title')}</h3>
        <p>262 rue des Bouleaux – Bloc 5 & 6, 59860 Bruay-sur-l’Escaut, France</p>
      </div>
      
      <div className="contact-info-card">
        <div className="contact-info-icon">
          <i className="fa-solid fa-phone" />
        </div>
        <h3>{t('contact_page.info.phone_title')}</h3>
        <p>{t('contact_page.info.phone_line1')}</p>
        <p>{t('contact_page.info.phone_line2')}</p>
      </div>
      
      <div className="contact-info-card">
        <div className="contact-info-icon">
          <i className="fa-solid fa-envelope" />
        </div>
        <h3>{t('contact_page.info.email_title')}</h3>
        <p>contact@snfood.fr</p>
        <p>support@snfood.fr</p>
      </div>
      
      <div className="contact-info-card">
        <div className="contact-info-icon">
          <i className="fa-solid fa-clock" />
        </div>
        <h3>{t('contact_page.info.hours_title')}</h3>
        <p>{t('contact_page.info.hours_line1')}</p>
        <p>{t('contact_page.info.hours_line2')}</p>
      </div>
    </div>
  );
};
