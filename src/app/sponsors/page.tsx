'use client'
import React from 'react';
import Layout from '../components/Layout';
import List from '../components/Liste';

type ListItem = {
  id: number;
  brandName: string;
  sport: string;
  athleteCount: number;
};

const SponsorsPage: React.FC = () => {
  const items: ListItem[] = [
    { id: 1, brandName: 'Nike', sport: 'Running', athleteCount: 120 },
    { id: 2, brandName: 'Adidas', sport: 'Football', athleteCount: 200 },
    { id: 3, brandName: 'Puma', sport: 'Basketball', athleteCount: 150 },
  ];

  return (
    <Layout>
      <List items={items} />
    </Layout>
  );
};

export default SponsorsPage;
