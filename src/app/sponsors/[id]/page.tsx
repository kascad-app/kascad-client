'use client'
import Layout from '@/app/components/Layout';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-full md:w-1/2 h-64 bg-gray-200 rounded-lg overflow-hidden">
            <img src={`/images/${item.brandName.toLowerCase()}.jpg`} alt={item.brandName} className="w-full h-full object-cover"/>
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl text-gray-50 font-bold mb-2">Détails du Sponsor</h1>
            <h2 className="text-2xl text-gray-50 font-semibold mb-4">{item.brandName}</h2>
            <p className="text-lg text-gray-50 mb-2"><strong>Sport:</strong> {item.sport}</p>
            <p className="text-lg text-gray-50"><strong>Nombre de sportifs adhérents:</strong> {item.athleteCount}</p>
          </div>
        </div>  
      </div>
    </Layout>
  );
};

export default Detail;
