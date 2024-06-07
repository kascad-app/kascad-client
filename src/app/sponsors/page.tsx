'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import listSponsorsStyles from './listSponsors.module.css';
import Layout from '../components/Layout';

type ListItem = {
  id: number;
  brandName: string;
  sport: string;
  athleteCount: number;
};

const List: React.FC = () => {
  const router = useRouter();

  const items: ListItem[] = [
    { id: 1, brandName: 'Nike', sport: 'Running', athleteCount: 120 },
    { id: 2, brandName: 'Adidas', sport: 'Football', athleteCount: 200 },
    { id: 3, brandName: 'Puma', sport: 'Basketball', athleteCount: 150 },
  ];

  const handleItemClick = (item: ListItem) => {
    router.push(`/sponsors/${item.id}`);
  };

  return (
   <Layout>
     <div className={listSponsorsStyles.container}>
      <h2 className={listSponsorsStyles.header}>Liste des sponsors</h2>
      <ul className={listSponsorsStyles.list}>
        {items.map(item => (
          <li key={item.id} onClick={() => handleItemClick(item)} className={listSponsorsStyles.listItem}>
            <div className={listSponsorsStyles.itemContent}>
              <h3 className={listSponsorsStyles.itemTitle}>{item.brandName}</h3>
              <p>Sport: {item.sport}</p>
              <p>Nombre de sportifs adhérents: {item.athleteCount}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
   </Layout>
  );
};

export default List;
