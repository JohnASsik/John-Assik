import React from 'react';
import { Booking } from '../types';

interface HistoryPageProps {
  history: Booking[];
  onBack: () => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ history, onBack }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };
  
  // Sort history from most recent to oldest
  const sortedHistory = [...history].sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());


  return (
    <div className="animate-fade-in">
       <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
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

      <h2 className="text-3xl md:text-4xl font-bold tracking-wider text-purple-300 uppercase mb-8">
        Booking History
      </h2>
      
      {sortedHistory.length > 0 ? (
        <div className="space-y-4">
          {sortedHistory.map((booking) => (
            <div key={booking.id} className="bg-gray-800 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-700 hover:border-purple-500 transition-colors">
              <div>
                <p className="font-bold text-lg text-white">{booking.gameTitle}</p>
                <p className="text-sm text-gray-400">Slot: {booking.slotTime}</p>
                <p className="text-sm text-gray-400">Booked on: {formatDate(booking.bookingDate)}</p>
              </div>
              <p className="font-bold text-lg text-green-400 mt-2 sm:mt-0">₹{booking.amount}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-gray-700 rounded-lg">
          <p className="text-xl text-gray-400">No booking history found.</p>
          <p className="text-gray-500 mt-2">Time to play some games!</p>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
