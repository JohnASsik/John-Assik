
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onSelect }) => {
  const consoleColor = game.console === 'PS5' ? 'bg-blue-500' : 'bg-gray-600';

  return (
    <div
      onClick={() => onSelect(game)}
      className="group relative rounded-lg overflow-hidden bg-gray-800 shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40"
    >
      <img
        src={game.imageUrl}
        alt={game.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <span
          className={`absolute top-0 right-0 mt-2 mr-2 text-xs font-bold px-2 py-1 rounded-full text-white ${consoleColor}`}
        >
          {game.console}
        </span>
        <h3 className="text-white text-lg font-bold leading-tight">{game.title}</h3>
      </div>
    </div>
  );
};

export default GameCard;
