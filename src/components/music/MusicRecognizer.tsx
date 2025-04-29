
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const MusicRecognizer = () => {
  const [isListening, setIsListening] = useState(false);
  const [progress, setProgress] = useState(0);

  const startListening = () => {
    setIsListening(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsListening(false);
          // Simulate finding a song
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card overflow-hidden">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Reconnaissance Musicale</h2>
          <p className="text-muted-foreground">
            Appuyez pour identifier la musique en cours de lecture
          </p>
        </div>

        <div 
          className={cn(
            "relative w-48 h-48 mx-auto rounded-full transition-all duration-500 mb-8",
            isListening ? "scale-110" : "scale-100",
            isListening ? "music-gradient shadow-lg shadow-music-purple/30" : "bg-secondary/60"
          )}
        >
          <button
            onClick={isListening ? () => setIsListening(false) : startListening}
            className="absolute inset-0 flex items-center justify-center focus:outline-none"
            aria-label="Start listening"
          >
            <div className="absolute inset-4 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
              <div className={cn(
                "p-12 rounded-full",
                isListening ? "bg-music-purple animate-pulse-light" : "bg-secondary"
              )}>
                {isListening ? (
                  <div className="w-12 h-12 flex items-center justify-center">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-full h-full rounded-full border-4 border-white opacity-0"
                        style={{
                          animation: `ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite ${i * 0.5}s`,
                        }}
                      />
                    ))}
                    <span className="text-white font-medium">Écoute...</span>
                  </div>
                ) : (
                  <div className="w-8 h-12">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </button>
        </div>

        {isListening && (
          <div className="w-full bg-secondary/50 rounded-full h-2.5 mb-6">
            <div
              className="bg-music-purple h-2.5 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <Button variant="outline">Historique</Button>
          <Button>Ajouter à une playlist</Button>
        </div>
      </CardContent>

      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0.1);
            opacity: 0.4;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
      `}</style>
    </Card>
  );
};

export default MusicRecognizer;
