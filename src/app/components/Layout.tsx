'use client';
import React from 'react';

const Layout: React.FC = () => {
  return (
    <div className="fixed w-1/2 bottom-8 left-1/2 -translate-x-1/2 z-50 flex justify-center">
      <div className="bg-gray-300 gap-36 w-auto opacity-90 text-white p-2 flex justify-between items-center rounded-xl relative group">
        <a href="/">
          <img src="/views/logos/logoSquare.svg" alt="Logo" className="h-12 mr-4" />
        </a>
        <button className="bg-dark-green text-white px-6 py-4 rounded">
          actions
        </button>
        <div className="absolute w-50vw rounded-xl bottom-full left-1/2 right-1/2 -translate-x-1/2 bg-white p-4 shadow-lg mb-2 hidden group-hover:block z-50">
          <h2 className="text-lg font-bold mb-2 text-black">Actions</h2>
          <ul>
            <li>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black">
                Action 1
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black">
                Action 2
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black">
                Action 3
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Layout;
