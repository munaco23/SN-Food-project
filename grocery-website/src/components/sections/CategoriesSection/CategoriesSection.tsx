import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './CategoriesSection.css';

type Category = {
  id: string;
  label: string;
  iconClass: string;
  color: 'blue' | 'red' | 'orange' | 'green' | 'yellow' | 'lime';
};

export const CategoriesSection: React.FC = () => {
  const { t } = useTranslation();
  const categories = useMemo<Category[]>(
    () => [
      { id: 'c1', label: t('categories_section.items.dairy'), iconClass: 'fa-solid fa-bottle-droplet', color: 'blue' },
      { id: 'c2', label: t('categories_section.items.meat'), iconClass: 'fa-solid fa-fish-fins', color: 'red' },
      { id: 'c3', label: t('categories_section.items.bakery'), iconClass: 'fa-solid fa-cookie-bite', color: 'orange' },
      { id: 'c4', label: t('categories_section.items.organic'), iconClass: 'fa-solid fa-leaf', color: 'green' },
      { id: 'c5', label: t('categories_section.items.fresh_eggs'), iconClass: 'fa-solid fa-egg', color: 'yellow' },
      { id: 'c6', label: t('categories_section.items.ready_meals'), iconClass: 'fa-solid fa-bowl-food', color: 'lime' },
      { id: 'c7', label: t('categories_section.items.dairy'), iconClass: 'fa-solid fa-bottle-droplet', color: 'blue' },
      { id: 'c8', label: t('categories_section.items.meat'), iconClass: 'fa-solid fa-fish-fins', color: 'red' },
      { id: 'c9', label: t('categories_section.items.bakery'), iconClass: 'fa-solid fa-cookie-bite', color: 'orange' },
      { id: 'c10', label: t('categories_section.items.organic'), iconClass: 'fa-solid fa-leaf', color: 'green' },
      { id: 'c11', label: t('categories_section.items.fresh_eggs'), iconClass: 'fa-solid fa-egg', color: 'yellow' },
      { id: 'c12', label: t('categories_section.items.ready_meals'), iconClass: 'fa-solid fa-bowl-food', color: 'lime' },
      { id: 'c13', label: t('categories_section.items.dairy'), iconClass: 'fa-solid fa-bottle-droplet', color: 'blue' },
      { id: 'c14', label: t('categories_section.items.meat'), iconClass: 'fa-solid fa-fish-fins', color: 'red' },
      { id: 'c15', label: t('categories_section.items.bakery'), iconClass: 'fa-solid fa-cookie-bite', color: 'orange' },
      { id: 'c16', label: t('categories_section.items.organic'), iconClass: 'fa-solid fa-leaf', color: 'green' },
      { id: 'c17', label: t('categories_section.items.fresh_eggs'), iconClass: 'fa-solid fa-egg', color: 'yellow' },
      { id: 'c18', label: t('categories_section.items.ready_meals'), iconClass: 'fa-solid fa-bowl-food', color: 'lime' },
    ],
    [t]
  );

  return (
    <section className="cats" aria-label={t('categories_section.title')}>
      <div className="cats-inner">
        <div className="cats-head">
          <h2 className="cats-title">{t('categories_section.title')}</h2>
          <p className="cats-subtitle">
            {t('categories_section.subtitle')}
          </p>
        </div>

        <div className="cats-grid">
          {categories.map((c) => (
            <button key={c.id} className="cat-card" type="button" aria-label={c.label}>
              <span className="cat-iconWrap" data-color={c.color} aria-hidden="true">
                <i className={c.iconClass} />
              </span>
              <span className="cat-label">{c.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
