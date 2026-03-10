import React from 'react';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { TeamHero } from '../../components/team/TeamHero/TeamHero';
import { TeamBanner } from '../../components/team/TeamBanner/TeamBanner';
import { TeamGrid } from '../../components/team/TeamGrid/TeamGrid';

export const Team: React.FC = () => {
  return (
    <div className="team-page">
      <Header />
      <main>
        <TeamHero />
        <TeamBanner />
        <TeamGrid />
      </main>
      <Footer />
    </div>
  );
};
