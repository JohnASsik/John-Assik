import React from 'react';
import { Game, Slot } from '../types';
import { 
  PAYMENT_QR_CODE_URL,
  PAYEE_NAME,
  PAYEE_UPI_ID,
  PAYMENT_AMOUNT
} from '../constants';

interface PaymentModalProps {
  game: Game;
  slot: Slot;
  onClose: () => void;
  isVerifying: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ game, slot, onClose, isVerifying }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative bg-gray-800 border border-purple-500/50 rounded-lg shadow-2xl shadow-purple-500/20 w-full max-w-sm m-4 p-8 text-center transform transition-all duration-300 ease-in-out scale-95 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
        `}</style>
        
        {isVerifying && (
          <div className="absolute inset-0 bg-gray-800 bg-opacity-95 flex flex-col items-center justify-center rounded-lg z-10">
            <svg className="animate-spin h-10 w-10 text-purple-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-white text-lg font-semibold">Verifying Payment...</p>
            <p className="text-gray-400 text-sm">Please wait, do not close this window.</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          aria-label="Close payment modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-white mb-1">{PAYEE_NAME}</h2>
        <p className="text-sm text-gray-400 mb-4">
          Booking for {game.title} ({slot.time})
        </p>

        <div className="bg-white p-4 rounded-lg my-4 inline-block shadow-lg">
            <img 
              src={PAYMENT_QR_CODE_URL} 
              alt="Payment QR Code" 
              className="w-56 h-56" 
            />
        </div>
        
        <p className="text-sm text-gray-300 mt-2">UPI ID: {PAYEE_UPI_ID}</p>
        
        <div className="mt-4">
          <p className="text-3xl font-bold text-green-400 mb-2">₹{PAYMENT_AMOUNT}</p>
          <p className="text-base text-gray-200">Scan to pay with any UPI app</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;