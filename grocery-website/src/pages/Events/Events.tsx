import React from 'react';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { EventsGrid } from '../../components/events/EventsGrid/EventsGrid';
import { RequestInformation } from '../../components/company/RequestInformation/RequestInformation';

export const Events: React.FC = () => {
  return (
    <div className="events-page">
      <Header />
      <main>
        <EventsGrid />
        <RequestInformation />
      </main>
      <Footer />
    </div>
  );
};
