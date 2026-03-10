import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './HeroSlider.css';
import Hero1 from '../../../Images/hero1.jpg';
import Hero2 from '../../../Images/hero2.jpg';

type Slide = {
  id: string;
  imageSrc: string;
  alt: string;
};

export const HeroSlider: React.FC = () => {
  const { t } = useTranslation();

  const slides: Slide[] = useMemo(
    () => [
      { id: 'slide-1', imageSrc: Hero1, alt: t('slider.slide_alt', { index: 1 }) },
      { id: 'slide-2', imageSrc: Hero2, alt: t('slider.slide_alt', { index: 2 }) },
    ],
    [t]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!isDragging.current) {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }
    }, 4500);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeft.current = activeIndex;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const endX = e.pageX;
    const diff = startX.current - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  return (
    <section className="hero">
      <div 
        className="hero-slider" 
        aria-roledescription="carousel"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
      >
        <div
          ref={trackRef}
          className="hero-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div className="hero-slide" key={slide.id}>
              <img className="hero-image" src={slide.imageSrc} alt={slide.alt} draggable="false" />
            </div>
          ))}
        </div>

        <button className="hero-arrow hero-arrow--left" onClick={goPrev} aria-label={t('slider.prev')}>
          <span className="hero-arrow-icon" aria-hidden="true">‹</span>
        </button>
        <button className="hero-arrow hero-arrow--right" onClick={goNext} aria-label={t('slider.next')}>
          <span className="hero-arrow-icon" aria-hidden="true">›</span>
        </button>

        <div className="hero-dots" role="tablist" aria-label={t('slider.select')}>
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`hero-dot${index === activeIndex ? ' hero-dot--active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={t('slider.go_to', { index: index + 1 })}
              aria-selected={index === activeIndex}
              role="tab"
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
