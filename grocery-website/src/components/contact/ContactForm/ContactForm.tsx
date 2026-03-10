import React from 'react';
import { useTranslation } from 'react-i18next';
import './ContactForm.css';

export const ContactForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="contact-form-container">
      <div className="contact-form-header">
        <h2>{t('contact_page.form.title')}</h2>
        <p>{t('contact_page.form.subtitle')}</p>
      </div>
      
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="name">{t('contact_page.form.full_name')}</label>
            <input type="text" id="name" placeholder={t('contact_page.form.full_name_ph')} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">{t('contact_page.form.email')}</label>
            <input type="email" id="email" placeholder={t('contact_page.form.email_ph')} required />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="subject">{t('contact_page.form.subject')}</label>
          <input type="text" id="subject" placeholder={t('contact_page.form.subject_ph')} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">{t('contact_page.form.message')}</label>
          <textarea id="message" rows={6} placeholder={t('contact_page.form.message_ph')} required></textarea>
        </div>
        
        <button type="submit" className="contact-submit-btn">
          {t('contact_page.form.submit')}
          <i className="fa-solid fa-paper-plane" />
        </button>
      </form>
    </div>
  );
};
