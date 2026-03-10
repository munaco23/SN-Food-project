import React from 'react';
import { useTranslation } from 'react-i18next';
import './ContactHero.css';

export const ContactHero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="contact-hero">
      <div className="contact-hero-overlay" />
      <div className="contact-hero-content">
        <h1>{t('contact_page.hero.title')}</h1>
        <p>{t('contact_page.hero.subtitle')}</p>
      </div>
    </section>
  );
};
