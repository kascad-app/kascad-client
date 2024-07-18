'use client';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { getRouteRegex } from 'next/dist/shared/lib/router/utils/route-regex';
import path from 'path';

type Column<T> = {
  title: string;
  key: keyof T;
};

type ListProps<T> = {
  title: string;
  items: T[];
  columns: Column<T>[];
  growing?: boolean;
  threshold?: number;
};

const List = <T extends { id: number }>({
  title,
  items,
  columns,
  growing = false,
  threshold = 5,
}: ListProps<T>) => {
  const router = useRouter();
  const pathname = usePathname();
  const [visibleCount, setVisibleCount] = useState(threshold);

  const handleItemClick = (item: T) => {
   if(pathname === '/marketplace/riders') router.push(`/riders/${item.id}`);
   if(pathname === '/marketplace/sponsors') router.push(`/sponsors/${item.id}`);
  };

  const handleShowMore = () => {
    setVisibleCount(items.length);
  };

  return (
    <div className="py-12 flex flex-col items-start w-full">
      <h2 className="text-l font-bold mb-4 text-center">{title}</h2>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.slice(0, growing ? visibleCount : items.length).map((item) => (
              <tr
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="cursor-pointer hover:bg-gray-100 transition"
              >
                {columns.map((column) => (
                  <td
                    key={column.key as string}
                    className="px-6 py-4 border-b border-gray-200"
                  >
                    {column.key === 'profilePhoto' && item[column.key] ? (
                      <img src={String(item[column.key])} alt="Profile" className="h-16 w-16 object-cover rounded-full" />
                    ) : (
                      String(item[column.key])
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {growing && visibleCount < items.length && (
          <div className="flex justify-center mt-4 w-full">
            <button
              onClick={handleShowMore}
              className="bg-white text-dark-green px-4 py-2 rounded hover:bg-gray-100 hover:border-dark-green transition"
            >
              Voir plus
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
