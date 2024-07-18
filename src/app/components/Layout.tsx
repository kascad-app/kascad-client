'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const Layout: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="fixed w-1/2 bottom-8 left-1/2 -translate-x-1/2 z-50 flex justify-center">
      <div className="bg-gray-300 gap-36 w-auto opacity-90 text-white p-2 flex justify-between items-center rounded-xl relative">
        <Link href="/" passHref>
          <img src="/views/logos/logoSquare.svg" alt="Logo" className="h-12 mr-4 cursor-pointer" />
        </Link>
        <button 
          className="bg-dark-green text-white px-6 py-4 rounded"
          onClick={toggleMenu}
        >
          Actions
        </button>
        {menuVisible && (
          <div className="absolute w-50vw rounded-xl bottom-full left-1/2 -translate-x-1/2 bg-white p-4 shadow-lg mb-2 z-50">
            <ul>
              <li>
                <Link href="/" passHref>
                  <div className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black cursor-pointer">
                    Home
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/profile" passHref>
                  <div className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black cursor-pointer">
                    Profile
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
