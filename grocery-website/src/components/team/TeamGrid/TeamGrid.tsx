import React from 'react';
import { useTranslation } from 'react-i18next';
import './TeamGrid.css';
import hero1 from '../../../Images/hero1.jpg';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  email: string;
  image: string;
};

const DEPARTMENTS = ['direction', 'sales', 'purchasing', 'logistics', 'accounting'] as const;

const teamData: Record<(typeof DEPARTMENTS)[number], TeamMember[]> = {
  direction: [
    { id: 1, name: 'SN MANAGEMENT', role: 'director', email: 'contact@snfood.fr', image: hero1 },
  ],
  sales: [
    { id: 2, name: 'Sales Team', role: 'sales_rep', email: 'sales@snfood.fr', image: hero1 },
  ],
  purchasing: [
    { id: 3, name: 'Procurement', role: 'purchasing_manager', email: 'purchase@snfood.fr', image: hero1 },
  ],
  logistics: [
    { id: 4, name: 'Logistics Team', role: 'logistics_coordinator', email: 'logistics@snfood.fr', image: hero1 },
  ],
  accounting: [
    { id: 5, name: 'Admin & Finance', role: 'accountant', email: 'admin@snfood.fr', image: hero1 },
  ],
};

export const TeamGrid: React.FC = () => {
  const { t } = useTranslation();

  const allMembers = [
    ...teamData.direction,
    ...teamData.sales,
    ...teamData.purchasing,
    ...teamData.logistics,
    ...teamData.accounting
  ];

  return (
    <section className="team-grid-sec">
      <div className="team-grid-inner">
        <h2 className="team-grid-main-title">{t('team.grid.title')}</h2>
        
        <div className="team-grid">
          {allMembers.length > 0 ? (
            allMembers.map((m) => (
              <div key={m.id} className="team-card">
                <div className="team-card-circle">
                  <img src={m.image} alt={m.name} />
                </div>
                <h3 className="team-card-name">{m.name}</h3>
                <p className="team-card-role">{t(`team.roles.${m.role}`)}</p>
                <a href={`mailto:${m.email}`} className="team-card-email">{m.email}</a>
              </div>
            ))
          ) : (
            <p className="team-empty">{t('team.grid.empty')}</p>
          )}
        </div>
      </div>
    </section>
  );
};
