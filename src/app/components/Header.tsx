import React from 'react';

const Header = () => {
  return (
    <header className="bg-white text-gray-800  px-24 py-8 flex items-center w-full justify-between">
      <img src="/views/logos/logoSquare.png" alt="Logo" className="h-12 mr-4" />
      <h1 className="font-figtree font-medium text-lg">Bonjour Matis</h1>
    </header>
  );
};

export default Header;
