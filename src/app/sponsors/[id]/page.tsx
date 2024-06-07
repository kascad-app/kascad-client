'use client'
import Layout from '@/app/components/Layout';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import style from './page.module.css';
type ListItem = {
  id: number;
  brandName: string;
  sport: string;
  athleteCount: number;
};

const Detail: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const [item, setItem] = useState<ListItem | null>(null);

  useEffect(() => {
    if (id) {
      const items: ListItem[] = [
        { id: 1, brandName: 'Nike', sport: 'Running', athleteCount: 120 },
        { id: 2, brandName: 'Adidas', sport: 'Football', athleteCount: 200 },
        { id: 3, brandName: 'Puma', sport: 'Basketball', athleteCount: 150 },
      ];
      const currentItem = items.find(item => item.id === Number(id));
      if (currentItem) {
        setItem(currentItem);
      }
    }
  }, [id]);

  if (!item) {
    return <div>Chargement...</div>;
  }

  return (
    <Layout>
        <div>
            <div className={style.imageContainer}></div>
            <div>
              <h1>Détails du Sponsor</h1>
              <h2>{item.brandName}</h2>
              <p>Sport: {item.sport}</p>
              <p>Nombre de sportifs adhérents: {item.athleteCount}</p>
            </div>
          </div>
    </Layout>
  );
};

export default Detail;
