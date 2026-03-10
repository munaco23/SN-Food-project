import React from 'react';
import { useTranslation } from 'react-i18next';
import './TeamValues.css';
import hero2 from '../../../Images/hero2.jpg';

export const TeamValues: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="team-vals">
      <div className="team-vals-inner">
        <div className="team-vals-content">
          <h2 className="team-vals-title">{t('team.values.title')}</h2>
          <h3 className="team-vals-sub">{t('team.values.sub')}</h3>
          <div className="team-vals-text">
            <p>
              {t('team.values.p1')}
            </p>
            <p>
              {t('team.values.p2')}
            </p>
          </div>
        </div>
        <div className="team-vals-image">
          <img src={hero2} alt={t('team.values.image_alt')} />
        </div>
      </div>
    </section>
  );
};
