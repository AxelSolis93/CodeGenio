import React from 'react';
import Card from './Card';
import Button from './Button';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
    >
      <div className="w-full max-w-lg">
        <Card className="relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            aria-label="Cerrar modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 id="info-modal-title" className="text-2xl font-bold text-gray-800 mb-4 pr-8">{title}</h2>
          <div className="text-gray-600">
            {children}
          </div>
          <div className="mt-6 text-right">
            <Button onClick={onClose}>
              Entendido
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InfoModal;
