import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './ExportEurope.css';

type CountryItem = {
  id: string;
  code: string;
  name: string;
  flagImageUrl: string;
};

export const ExportEurope: React.FC = () => {
  const { t } = useTranslation();
  const railRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Drag functionality refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const countries = useMemo<CountryItem[]>(
    () => [
      { id: 'c1', code: 'pl', name: 'Poland', flagImageUrl: 'https://flagcdn.com/w80/pl.png' },
      { id: 'c2', code: 'ua', name: 'Ukraine', flagImageUrl: 'https://flagcdn.com/w80/ua.png' },
      { id: 'c3', code: 'ee', name: 'Estonia', flagImageUrl: 'https://flagcdn.com/w80/ee.png' },
      { id: 'c4', code: 'dk', name: 'Denmark', flagImageUrl: 'https://flagcdn.com/w80/dk.png' },
      { id: 'c5', code: 'no', name: 'Norway', flagImageUrl: 'https://flagcdn.com/w80/no.png' },
      { id: 'c6', code: 'se', name: 'Sweden', flagImageUrl: 'https://flagcdn.com/w80/se.png' },
      { id: 'c7', code: 'fi', name: 'Finland', flagImageUrl: 'https://flagcdn.com/w80/fi.png' },
      { id: 'c8', code: 'pt', name: 'Portugal', flagImageUrl: 'https://flagcdn.com/w80/pt.png' },
      { id: 'c9', code: 'it', name: 'Italy', flagImageUrl: 'https://flagcdn.com/w80/it.png' },
      { id: 'c10', code: 'fr', name: 'France', flagImageUrl: 'https://flagcdn.com/w80/fr.png' },
      { id: 'c11', code: 'de', name: 'Germany', flagImageUrl: 'https://flagcdn.com/w80/de.png' },
      { id: 'c12', code: 'es', name: 'Spain', flagImageUrl: 'https://flagcdn.com/w80/es.png' },
      { id: 'c13', code: 'nl', name: 'Netherlands', flagImageUrl: 'https://flagcdn.com/w80/nl.png' },
      { id: 'c14', code: 'be', name: 'Belgium', flagImageUrl: 'https://flagcdn.com/w80/be.png' },
      { id: 'c15', code: 'ch', name: 'Switzerland', flagImageUrl: 'https://flagcdn.com/w80/ch.png' },
      { id: 'c16', code: 'at', name: 'Austria', flagImageUrl: 'https://flagcdn.com/w80/at.png' },
      { id: 'c17', code: 'gr', name: 'Greece', flagImageUrl: 'https://flagcdn.com/w80/gr.png' },
      { id: 'c18', code: 'ie', name: 'Ireland', flagImageUrl: 'https://flagcdn.com/w80/ie.png' },
    ],
    []
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!railRef.current) return;
    isDragging.current = true;
    railRef.current.classList.add('dragging');
    startX.current = e.pageX - railRef.current.offsetLeft;
    scrollLeftStart.current = railRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !railRef.current) return;
    e.preventDefault();
    const x = e.pageX - railRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll speed
    railRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    railRef.current?.classList.remove('dragging');
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    railRef.current?.classList.remove('dragging');
  };

  const scrollRight = () => {
    const nextIndex = Math.min(activeIndex + 1, countries.length - 1);
    setActiveIndex(nextIndex);

    const el = itemRefs.current[nextIndex];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      return;
    }

    railRef.current?.scrollBy({ left: 160, behavior: 'smooth' });
  };

  return (
    <section className="ee" aria-label={t('export.title')}>
      <div className="ee-inner">
        <header className="ee-head">
          <div className="ee-copy">
            <h2 className="ee-title">{t('export.title')}</h2>
            <p className="ee-text">
              {t('export.text')}
            </p>
          </div>

          <button className="ee-arrow" type="button" aria-label={t('export.title')} onClick={scrollRight}>
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </header>

        <div 
          className="ee-rail" 
          ref={railRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {countries.map((c, idx) => (
            <div
              key={c.id}
              className="ee-item"
              ref={(node) => {
                itemRefs.current[idx] = node;
              }}
            >
              <div className="ee-flag" aria-hidden="true">
                <img className="ee-flagImg" src={c.flagImageUrl} alt="" loading="lazy" draggable="false" />
              </div>
              <div className="ee-name">{c.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
