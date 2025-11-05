import React, { useState, useEffect, useRef } from 'react';
import { Game, Slot } from '../types';
import BookingConfirmation from './BookingConfirmation';
import PaymentModal from './PaymentModal';
import { verifyPaymentStatus } from '../services/paymentVerifier';

interface BookingPageProps {
  game: Game;
  onBack: () => void;
  onBookSlot: (gameId: number, slotId: number) => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ game, onBack, onBookSlot }) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [confirmationGame, setConfirmationGame] = useState<Game | null>(null);
  const [confirmationSlot, setConfirmationSlot] = useState<Slot | null>(null);

  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const pollingRef = useRef<number | null>(null);

  const handleSlotSelect = (slot: Slot) => {
    if (slot.status === 'available') {
      setSelectedSlot(slot);
      setIsVerifying(true); // Start verification process
    }
  };
  
  const handleCloseModal = () => {
    if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
    }
    setSelectedSlot(null);
    setIsVerifying(false);
  };

  useEffect(() => {
    if (selectedSlot && isVerifying) {
      pollingRef.current = window.setInterval(async () => {
        try {
          const result = await verifyPaymentStatus();
          if (result.status === 'SUCCESS' && pollingRef.current) { // Check ref to avoid race conditions
            clearInterval(pollingRef.current);
            pollingRef.current = null;
            
            // Finalize booking
            onBookSlot(game.id, selectedSlot.id);
            setConfirmationGame(game);
            setConfirmationSlot(selectedSlot);
            
            // Close modal and show confirmation screen
            setSelectedSlot(null);
            setIsVerifying(false);
            setShowConfirmation(true);
          }
        } catch (error) {
          console.error("Payment verification poll failed:", error);
          // Polling will continue on the next interval
        }
      }, 3000); // Poll every 3 seconds

      // Cleanup function
      return () => {
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;
        }
      };
    }
  }, [selectedSlot, isVerifying, game, onBookSlot]);


  const handleConfirmationEnd = () => {
    setShowConfirmation(false);
    setConfirmationGame(null);
    setConfirmationSlot(null);
  };

  return (
    <div className="animate-fade-in">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
      <button
        onClick={onBack}
        className="mb-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to Games
      </button>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <div className="md:w-1/3 flex-shrink-0">
          <img src={game.imageUrl} alt={game.title} className="rounded-lg shadow-2xl shadow-purple-500/30 w-full object-cover aspect-[4/5.5]" />
          <h2 className="text-3xl font-bold mt-4">{game.title}</h2>
          <span className={`text-sm font-bold px-3 py-1 rounded-full text-white mt-2 inline-block ${game.console === 'PS5' ? 'bg-blue-500' : 'bg-gray-600'}`}>
            {game.console}
          </span>
           <p className="text-gray-300 mt-4 text-sm leading-relaxed">{game.description}</p>
        </div>
        <div className="md:w-2/3">
          <h3 className="text-2xl font-bold text-purple-300 mb-4">Select a Time Slot</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {game.slots.map(slot => {
              const isAvailable = slot.status === 'available';
              const baseClasses = "w-full p-3 rounded-lg text-center font-semibold transition-all duration-200 ease-in-out transform";
              const availableClasses = "bg-gray-700 hover:bg-purple-600 hover:scale-105 cursor-pointer border border-gray-600 hover:border-purple-500";
              const bookedClasses = "bg-gray-800 text-gray-500 cursor-not-allowed line-through";

              return (
                <button
                  key={slot.id}
                  onClick={() => handleSlotSelect(slot)}
                  disabled={!isAvailable}
                  className={`${baseClasses} ${isAvailable ? availableClasses : bookedClasses}`}
                  aria-label={`Slot ${slot.time}, Status: ${slot.status}`}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedSlot && (
        <PaymentModal 
            game={game} 
            slot={selectedSlot} 
            onClose={handleCloseModal} 
            isVerifying={isVerifying}
        />
      )}

      {showConfirmation && confirmationGame && confirmationSlot && (
        <BookingConfirmation 
            game={confirmationGame} 
            slot={confirmationSlot} 
            onClose={handleConfirmationEnd} 
        />
      )}
    </div>
  );
};

export default BookingPage;