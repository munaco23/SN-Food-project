import React from 'react';
import { useTranslation } from 'react-i18next';
import './EventsGrid.css';
import hero1 from '../../../Images/hero1.jpg';
import hero2 from '../../../Images/hero2.jpg';

type EventItem = {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
};

const events: EventItem[] = [
  {
    id: 1,
    title: 'Fiera Anuga 2025 - Kohln Germania',
    date: '02/10/2025',
    description: 'Giornate ricche di preziosi dibattiti, presentazioni, tendenze e innovazioni: Anuga 2025, la fiera leader ...',
    image: hero1
  },
  {
    id: 2,
    title: 'Sial Fair Second Edition 2024',
    date: '19/10/2024',
    description: 'SIAL Paris 2024: Fresh Tropical and Alibaba Featured for the Second Year',
    image: hero2
  },
  {
    id: 3,
    title: 'Austria Summer Festival',
    date: '08/07/2024',
    description: 'In Austria, thanks to our client PROSI, we provided participants with free bags containing spices and...',
    image: hero1
  },
  {
    id: 4,
    title: 'Community Gathering 2024',
    date: '15/06/2024',
    description: 'A special moment with our community celebrating ethnic flavors and traditions across the country.',
    image: hero2
  },
  {
    id: 5,
    title: 'Logistics Expo 2024',
    date: '22/05/2024',
    description: 'Showcasing our state-of-the-art distribution network and innovative solutions for food preservation.',
    image: hero1
  },
  {
    id: 6,
    title: 'Milan Food Week',
    date: '10/05/2024',
    description: 'Fresh Tropical took center stage during Milan Food Week, highlighting the best of ethnic specialties.',
    image: hero2
  }
];

export const EventsGrid: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="events-grid-sec">
      <div className="events-grid-inner">
        <header className="events-header">
          <h1 className="events-title">{t('events_page.title')}</h1>
          <p className="events-subtitle">{t('events_page.subtitle')}</p>
        </header>

        <div className="events-grid">
          {events.map((event) => (
            <article key={event.id} className="event-card">
              <div className="event-card-img">
                <img src={event.image} alt={event.title} />
              </div>
              <div className="event-card-body">
                <h3 className="event-card-title">{event.title}</h3>
                <time className="event-card-date">{event.date}</time>
                <p className="event-card-desc">{event.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
