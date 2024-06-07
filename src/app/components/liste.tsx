'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

type ListItem = {
  id: number;
  brandName: string;
  sport: string;
  athleteCount: number;
};

type ListProps = {
  items: ListItem[];
};

const List: React.FC<ListProps> = ({ items }) => {
  const router = useRouter();

  const handleItemClick = (item: ListItem) => {
    router.push(`/sponsors/${item.id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Liste des sponsors</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Brand Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Sport
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Athlete Count
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr 
                key={item.id} 
                onClick={() => handleItemClick(item)} 
                className="cursor-pointer hover:bg-gray-100 transition"
              >
                <td className="px-6 py-4 border-b border-gray-200">
                  {item.brandName}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {item.sport}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {item.athleteCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
