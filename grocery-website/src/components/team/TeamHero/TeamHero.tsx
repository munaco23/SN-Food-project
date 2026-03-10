import React from 'react';
import { useTranslation } from 'react-i18next';
import './TeamHero.css';
import hero1 from '../../../Images/hero1.jpg';
import hero2 from '../../../Images/hero2.jpg';

export const TeamHero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="team-hero">
      <div className="team-hero-inner">
        <div className="team-breadcrumb">
        </div>
        
        <h1 className="team-hero-title">{t('team.hero.title')}</h1>
        
        <div className="team-hero-content">
          <p className="team-hero-desc">
            {t('team.hero.desc')}
          </p>
        </div>
      </div>
    </section>
  );
};
