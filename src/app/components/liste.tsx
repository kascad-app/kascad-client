'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import listStyles from './liste.module.css';

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
    router.push(`/details/${item.id}`);
  };

  return (
    <div className={listStyles.container}>
      <h2 className={listStyles.header}>Liste des marques</h2>
      <ul className={listStyles.list}>
        {items.map(item => (
          <li key={item.id} onClick={() => handleItemClick(item)} className={listStyles.listItem}>
            <div className={listStyles.itemContent}>
              <h3 className={listStyles.itemTitle}>{item.brandName}</h3>
              <p>Sport: {item.sport}</p>
              <p>Nombre de sportifs adhérents: {item.athleteCount}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
