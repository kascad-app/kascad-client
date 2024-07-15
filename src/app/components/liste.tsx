'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

type Column<T> = {
  title: string;
  key: keyof T;
};

type ListProps<T> = {
  title: string;
  items: T[];
  columns: Column<T>[];
};

const List = <T extends { id: number }>({
  title,
  items,
  columns,
}: ListProps<T>) => {
  const router = useRouter();

  const handleItemClick = (item: T) => {
    router.push(`/sponsors/${item.id}`);
  };

  return (
    <div className=" py-12 flex flex-col items-start w-full">
      <h2 className="text-l font-bold mb-4 text-center">{title}</h2>
      <div className="overflow-x-auto w-full">
        <table className=" min-w-full bg-white border border-gray-200">
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
            {items.map((item) => (
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

                    {String(item[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
