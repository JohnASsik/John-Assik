import React, { useEffect } from 'react';
import { Game, Slot } from '../types';

interface BookingConfirmationProps {
  game: Game;
  slot: Slot;
  onClose: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ game, slot, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-md animate-fade-in-fast"
      onClick={onClose}
    >
      <style>{`
        @keyframes fade-in-fast {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes pop-in {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes bubble-appear {
          from { transform: translateY(20px) scale(0.8); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-fade-in-fast { animation: fade-in-fast 0.3s ease-out forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.2s forwards; }
        .animate-pop-in { animation: pop-in 0.5s ease-out 0.8s forwards; }
        .animate-bubble-appear { animation: bubble-appear 0.5s ease-out 1.2s forwards; }
      `}</style>
      
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        
        {/* Character Image */}
        <div className="absolute bottom-0 right-0 w-2/3 md:w-1/2 max-w-lg opacity-0 animate-slide-in-right">
          <img 
            src={game.characterImageUrl} 
            alt={game.title} 
            className="w-full h-auto object-contain" 
            style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }}
          />
        </div>

        {/* Confirmation Text */}
        <div className="relative z-10 text-left p-8 max-w-md w-full self-center md:self-start md:mt-32">
            <div className="opacity-0 animate-pop-in">
                <svg className="w-16 h-16 text-green-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                    BOOKING CONFIRMED!
                </h2>
                <p className="text-lg text-gray-300 mt-2">Get ready for your session.</p>
                <div className="mt-6 bg-white/10 p-4 rounded-lg border border-white/20 backdrop-blur-sm">
                    <p className="font-bold text-xl text-white">{game.title}</p>
                    <p className="text-purple-300 text-lg">{slot.time}</p>
                </div>
            </div>

            {/* Speech Bubble */}
            <div className="relative mt-8 opacity-0 animate-bubble-appear">
              <div className="bg-white text-gray-900 p-4 rounded-lg rounded-bl-none shadow-lg">
                <p className="text-lg font-semibold">{`"${game.characterQuote}"`}</p>
              </div>
               <div className="absolute -bottom-2 left-0 w-0 h-0 border-t-[10px] border-t-white border-r-[10px] border-r-transparent"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
