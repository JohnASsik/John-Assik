import React from 'react';

const GamepadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 8.25a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H17.25a.75.75 0 0 1-.75-.75Zm-3 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H14.25a.75.75 0 0 1-.75-.75Z" />
    <path fillRule="evenodd" d="M22.5 12c0-5.033-4.06-9.12-9.116-9.125a.75.75 0 0 0-.768.75v16.75a.75.75 0 0 0 .768.75C18.44 21.12 22.5 17.033 22.5 12ZM10.5 12a.75.75 0 0 0 0-1.5H8.25a.75.75 0 0 0 0 1.5H10.5Z" clipRule="evenodd" />
    <path d="M8.25 15a.75.75 0 0 1 .75-.75H10.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" />
    <path d="M9 9.75a.75.75 0 0 0-1.5 0v2.25a.75.75 0 0 0 1.5 0V9.75Z" />
    <path d="M1.5 12a.75.75 0 0 1 .75-.75H4.5a.75.75 0 0 1 0 1.5H2.25A.75.75 0 0 1 1.5 12Z" />
  </svg>
);

interface HeaderProps {
    onLogout: () => void;
    onShowHistory: () => void;
    onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onShowHistory, onGoHome }) => {
  return (
    <header className="bg-black/30 backdrop-blur-sm shadow-lg shadow-purple-500/10 border-b border-gray-700 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
            <button onClick={onGoHome} className="flex items-center focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg">
                <GamepadIcon className="w-10 h-10 mr-4 text-purple-400" />
                <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    NEXUS GAMING ZONE
                </h1>
            </button>
            <div className="flex items-center gap-4">
                <button
                    onClick={onShowHistory}
                    className="hidden sm:inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-300 hover:bg-purple-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900 transition-colors"
                >
                    History
                </button>
                <button
                    onClick={onLogout}
                    className="px-4 py-2 border border-purple-500 text-sm font-medium rounded-md text-purple-300 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
