'use client'
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-bold mb-2">Liens Rapides</h3>
          <ul>
            <li className="mb-1">
              <a href="/about" className="hover:underline">À propos</a>
            </li>
            <li className="mb-1">
              <a href="/services" className="hover:underline">Services</a>
            </li>
            <li className="mb-1">
              <a href="/contact" className="hover:underline">Contact</a>
            </li>
            <li className="mb-1">
              <a href="/faq" className="hover:underline">FAQ</a>
            </li>
          </ul>
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-bold mb-2">Contact</h3>
          <p className="mb-1">Adresse : 123 Rue Exemple, Paris, France</p>
          <p className="mb-1">Téléphone : +33 1 23 45 67 89</p>
          <p>Email : contact@exemple.com</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Suivez-nous</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Facebook
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Twitter
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Instagram
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm">&copy; 2024 Votre Entreprise. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
