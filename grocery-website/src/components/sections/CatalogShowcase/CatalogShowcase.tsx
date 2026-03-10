import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CatalogShowcase.css';
import ImgA from '../../../Images/hero1.jpg';
import ImgB from '../../../Images/hero2.jpg';

type Slide = {
  id: string;
  title: string;
  imageSrc: string;
};

type MiniItem = {
  id: string;
  imageSrc: string;
  label: string;
};

export const CatalogShowcase: React.FC = () => {
  const { t } = useTranslation();
  const leftSlides = useMemo<Slide[]>(
    () => [
      { id: 'l1', title: 'Legumi/Cereali', imageSrc: ImgA },
      { id: 'l2', title: 'Assorted Snack', imageSrc: ImgB },
      { id: 'l3', title: 'Organic Products', imageSrc: ImgA },
    ],
    []
  );

  const topSlides = useMemo<Slide[]>(
    () => [
      { id: 't1', title: 'JASMINE ROYAL UMBRELLA 18KG RISO', imageSrc: ImgB },
      { id: 't2', title: 'GK GINGER CANDY ORANGE 24X85G', imageSrc: ImgA },
      { id: 't3', title: 'LATTE RAYBY RAMANDAN 8X1LT', imageSrc: ImgB },
    ],
    []
  );

  const leftThumbs = useMemo<MiniItem[]>(
    () => [
      { id: 'lt1', imageSrc: ImgA, label: 'Beans' },
      { id: 'lt2', imageSrc: ImgB, label: 'Lentils' },
      { id: 'lt3', imageSrc: ImgA, label: 'Cereals' },
    ],
    []
  );

  const topThumbs = useMemo<MiniItem[]>(
    () => [
      { id: 'tt1', imageSrc: ImgB, label: 'Rice' },
      { id: 'tt2', imageSrc: ImgA, label: 'Candy' },
      { id: 'tt3', imageSrc: ImgB, label: 'Milk' },
    ],
    []
  );

  const [leftActive, setLeftActive] = useState(0);
  const [topActive, setTopActive] = useState(0);

  const leftMiniRef = useRef<HTMLDivElement | null>(null);
  const topMiniRef = useRef<HTMLDivElement | null>(null);

  const scrollMini = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -220 : 220, behavior: 'smooth' });
  };

  const prev = (index: number, total: number) => (index - 1 + total) % total;
  const next = (index: number, total: number) => (index + 1) % total;

  return (
    <section className="showcase" aria-label={t('catalog.title')}>
      <div className="showcase-inner">
        <div className="showcase-head">
          <h2 className="showcase-title">{t('catalog.title')}</h2>
          <p className="showcase-subtitle">
            {t('catalog.subtitle')}
          </p>
        </div>

        <div className="showcase-colsHead showcase-colsHead--single" aria-hidden="true">
          <div className="colHead">{t('catalog.col_top')}</div>
        </div>

        <div className="showcase-grid showcase-grid--single">
          <article className="showcard">
            <div className="colHead colHead--mobile">{t('catalog.col_top')}</div>
            <div className="showcard-top">
              <div className="showcard-pill showcard-pill--soft">{t('catalog.pill_fresh_frozen')}</div>
            </div>

            <div className="showcard-media showcard-media--center">
              <img className="showcard-img" src={topSlides[topActive].imageSrc} alt={topSlides[topActive].title} />

              <button
                className="showcard-nav showcard-nav--left"
                type="button"
                aria-label="Previous"
                onClick={() => setTopActive((v) => prev(v, topSlides.length))}
              >
                <i className="fa-solid fa-chevron-left" />
              </button>
              <button
                className="showcard-nav showcard-nav--right"
                type="button"
                aria-label="Next"
                onClick={() => setTopActive((v) => next(v, topSlides.length))}
              >
                <i className="fa-solid fa-chevron-right" />
              </button>
            </div>

            <div className="showcard-title">{topSlides[topActive].title}</div>
            <div className="showcard-code">cod. 9300</div>

            <div className="showcard-miniWrap">
              <button className="mini-nav" type="button" aria-label="Scroll left" onClick={() => scrollMini(topMiniRef, 'left')}>
                <i className="fa-solid fa-chevron-left" />
              </button>
              <div className="showcard-mini" ref={topMiniRef}>
                {topThumbs.map((t) => (
                  <button key={t.id} className="mini" type="button" aria-label={t.label}>
                    <img className="mini-img" src={t.imageSrc} alt={t.label} />
                  </button>
                ))}
              </div>
              <button className="mini-nav" type="button" aria-label="Scroll right" onClick={() => scrollMini(topMiniRef, 'right')}>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </div>

            <div className="showcard-dots" aria-hidden="true">
              {topSlides.map((s, i) => (
                <span key={s.id} className={`showdot${i === topActive ? ' showdot--active' : ''}`} />
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
