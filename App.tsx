import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Game, Booking } from './types';
import { GAMES as initialGames, PAYMENT_AMOUNT } from './constants';
import Header from './components/Header';
import GameCard from './components/GameCard';
import BookingPage from './components/BookingPage';
import Login from './components/Login';
import MusicPlayer from './components/MusicPlayer';
import HistoryPage from './components/HistoryPage';

const BOOKING_HISTORY_KEY = 'NEXUS_GAMING_BOOKING_HISTORY';

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(BOOKING_HISTORY_KEY);
      if (storedHistory) {
        setBookingHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to parse booking history from localStorage", error);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedGame(null);
    setSearchQuery('');
    setShowHistory(false);
  };

  const handleGameSelect = (game: Game) => {
    const currentGame = games.find(g => g.id === game.id);
    setSelectedGame(currentGame || game);
    setShowHistory(false);
  };

  const handleBack = () => {
    setSelectedGame(null);
  };

  const handleShowHistory = () => {
    setSelectedGame(null);
    setShowHistory(true);
  };

  const handleGoHome = () => {
    setSelectedGame(null);
    setShowHistory(false);
  }

  const handleBookSlot = useCallback((gameId: number, slotId: number) => {
    let bookedGame: Game | undefined;
    let bookedSlot: Game['slots'][0] | undefined;

    const updatedGames = games.map(game => {
      if (game.id === gameId) {
        const updatedSlots = game.slots.map(slot => {
          if (slot.id === slotId) {
            bookedSlot = slot;
            return { ...slot, status: 'booked' };
          }
          return slot;
        });
        bookedGame = { ...game, slots: updatedSlots };
        return bookedGame;
      }
      return game;
    });
    setGames(updatedGames);

    if (bookedGame && bookedSlot) {
      const newBooking: Booking = {
        id: `${new Date().toISOString()}-${gameId}-${slotId}`,
        gameId: bookedGame.id,
        gameTitle: bookedGame.title,
        slotTime: bookedSlot.time,
        bookingDate: new Date().toISOString(),
        amount: PAYMENT_AMOUNT,
      };

      const updatedHistory = [...bookingHistory, newBooking];
      setBookingHistory(updatedHistory);
      localStorage.setItem(BOOKING_HISTORY_KEY, JSON.stringify(updatedHistory));
    }
    
    const updatedSelectedGame = updatedGames.find(g => g.id === gameId);
    if (updatedSelectedGame) {
      setSelectedGame(updatedSelectedGame);
    }
  }, [games, bookingHistory]);

  const filteredGames = useMemo(() => {
    if (!searchQuery) {
      return games;
    }
    return games.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [games, searchQuery]);

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header 
        onLogout={handleLogout} 
        onShowHistory={handleShowHistory}
        onGoHome={handleGoHome}
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showHistory ? (
           <HistoryPage history={bookingHistory} onBack={handleGoHome} />
        ) : !selectedGame ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-wider text-purple-300 uppercase text-center sm:text-left">
                  Choose Your Game
                </h2>
                <div className="relative w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search for a game..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>
            </div>
            
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {filteredGames.map((game) => (
                  <GameCard key={game.id} game={game} onSelect={handleGameSelect} />
                ))}
              </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-gray-400">No games found for "{searchQuery}"</p>
                </div>
            )}
          </>
        ) : (
          <BookingPage
            game={selectedGame}
            onBack={handleBack}
            onBookSlot={handleBookSlot}
          />
        )}
      </main>
      <MusicPlayer />
    </div>
  );
};

export default App;