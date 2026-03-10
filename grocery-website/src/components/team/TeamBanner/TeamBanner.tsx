import React from 'react';
import { useTranslation } from 'react-i18next';
import './TeamBanner.css';
import Bg from '../../../Images/hero1.jpg';

export const TeamBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="team-banner" style={{ backgroundImage: `url(${Bg})` }}>
      <div className="team-banner-overlay" />
      <div className="team-banner-inner">
        <div className="team-banner-content">
          <h2 className="team-banner-title">
            Join Our Network of Professionals
          </h2>
          <p className="team-banner-text">
            Experience excellence in every delivery with SN Food Distribution.
          </p>
        </div>
      </div>
    </section>
  );
};
