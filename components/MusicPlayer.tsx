import React, { useState, useRef, useEffect } from 'react';

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const PauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  useEffect(() => {
    const audioEl = audioRef.current;
    if (audioEl) {
      // Attempt to play on mount after login.
      // User interaction on login screen should allow this.
      audioEl.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay was prevented. User can manually start it.
          setIsPlaying(false);
        });
    }
  }, []);

  useEffect(() => {
      const audioEl = audioRef.current;
      if (audioEl) {
          const handlePlay = () => setIsPlaying(true);
          const handlePause = () => setIsPlaying(false);
          audioEl.addEventListener('play', handlePlay);
          audioEl.addEventListener('pause', handlePause);
          
          return () => {
              audioEl.removeEventListener('play', handlePlay);
              audioEl.removeEventListener('pause', handlePause);
          }
      }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio 
        ref={audioRef}
        src="https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monplaisir/FMA_-_Monplaisir/Monplaisir_-_05_-_Bikelane.mp3"
        loop
      />
      <button
        onClick={togglePlayPause}
        className="bg-purple-600/50 text-white rounded-full p-3 backdrop-blur-sm hover:bg-purple-500 transition-colors duration-200 shadow-lg"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
};

export default MusicPlayer;
