import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './EventsSection.css';
import Img1 from '../../../Images/hero2.jpg';
import Img2 from '../../../Images/hero1.jpg';

type EventItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  href: string;
  imageSrc: string;
};

export const EventsSection: React.FC = () => {
  const { t } = useTranslation();

  const events = useMemo<EventItem[]>(
    () => [
      {
        id: 'e1',
        title: 'Fiera Anuga 2025 - Kohln Germania',
        date: '02/10/2025',
        excerpt:
          'Giornate ricche di preziosi dibattiti, presentazioni, tendenze e innovazioni: Anuga 2025, la fiera leader ...',
        href: '#',
        imageSrc: Img1,
      },
      {
        id: 'e2',
        title: 'Sial Fair Second Edition 2024',
        date: '19/10/2024',
        excerpt: 'SIAL Paris 2024: Fresh Tropical and Alibaba Featured for the Second Year',
        href: '#',
        imageSrc: Img2,
      },
      {
        id: 'e3',
        title: 'Austria Summer Festival',
        date: '08/07/2024',
        excerpt:
          'In Austria, thanks to our client PROSI, we provided participants with free bags containing spices ...',
        href: '#',
        imageSrc: Img1,
      },
    ],
    []
  );

  return (
    <section className="ev" aria-label={t('events_page.title')}>
      <div className="ev-inner">
        <header className="ev-head">
          <div>
            <h2 className="ev-title">{t('events_page.title')}</h2>
            <div className="ev-sub">{t('events_page.subtitle')}</div>
          </div>

          <button className="ev-headLink" type="button">{t('events_page.go_to')}</button>
        </header>

        <div className="ev-grid">
          {events.map((e) => (
            <a key={e.id} className="ev-card" href={e.href} aria-label={e.title}>
              <div className="ev-imgWrap" aria-hidden="true">
                <img className="ev-img" src={e.imageSrc} alt="" />
              </div>
              <div className="ev-body">
                <div className="ev-cardTitle">{e.title}</div>
                <div className="ev-date">{e.date}</div>
                <div className="ev-text">{e.excerpt}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
