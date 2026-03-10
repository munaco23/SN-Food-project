import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { ContactHero } from '../../components/contact/ContactHero/ContactHero';
import { ContactInfo } from '../../components/contact/ContactInfo/ContactInfo';
import { ContactForm } from '../../components/contact/ContactForm/ContactForm';
import './Contact.css';

export const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="contact-page">
      <Header />
      <ContactHero />
      
      <main className="contact-main">
        <div className="container">
          <ContactInfo />
          <div className="contact-content-row">
            <ContactForm />
            <div className="contact-map-placeholder">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2537.9123847594!2d3.5413063!3d50.4054611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2ec94017a11d3%3A0x673c68379c381f88!2s262%20Rue%20des%20Bouleaux%2C%2059860%20Bruay-sur-l'Escaut%2C%20France!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '16px' }} 
                allowFullScreen={true} 
                loading="lazy"
                title={t('contact_page.map_title')}
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
