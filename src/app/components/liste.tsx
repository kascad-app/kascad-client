'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

type ListeTitle = {
  title: string;
}

type ListItem = {
  id: number;
  brandName: string;
  sport: string;
  athleteCount: number;
};

type ListProps = {
  title: string;
  items: ListItem[];
  columnTitles: {
    brandName: string;
    sport: string;
    athleteCount: string;
  };
};

const List: React.FC<ListProps> = ({ title, items, columnTitles }) => {
  const router = useRouter();

  const handleItemClick = (item: ListItem) => {
    router.push(`/sponsors/${item.id}`);
  };

  return (
    <div className="container mx-auto  py-12 flex flex-col items-start w-full">
      <h2 className="text-l font-bold mb-4 text-center">{title}</h2>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {columnTitles.brandName}
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {columnTitles.sport}
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {columnTitles.athleteCount}
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
