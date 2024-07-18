'use client'

import React, { useEffect } from 'react';
import ReactModal from 'react-modal';

interface PopupContent {
  title: string;
  text: string;
}

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: PopupContent[];
}

ReactModal.setAppElement('body');

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, content }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'unset';
    }
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 w-full"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      contentLabel={title}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-full mx-24 px-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="mt-4">
          {content.map((item, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </ReactModal>
  );
};

export default Popup;
