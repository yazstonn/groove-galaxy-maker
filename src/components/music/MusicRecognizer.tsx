
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Music } from 'lucide-react';

const MusicRecognizer = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Simule l'authentification Google
  const handleGoogleAuth = () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulation de l'authentification Google
    toast({
      title: "Connexion à Google",
      description: "Authentification en cours...",
    });
    
    setTimeout(() => {
      setIsAuthenticated(true);
      toast({
        title: "Authentification réussie",
        description: "Récupération de votre bibliothèque YouTube...",
      });
      
      // Simulation de l'analyse des vidéos
      analyzeYouTubeLibrary();
    }, 1500);
  };

  // Simule l'analyse de la bibliothèque YouTube
  const analyzeYouTubeLibrary = () => {
    const totalSteps = 100;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep += 1;
      setProgress(Math.min(Math.round((currentStep / totalSteps) * 100), 100));
      
      // Messages d'état pour informer l'utilisateur de l'avancement
      if (currentStep === 20) {
        toast({
          title: "Récupération des vidéos",
          description: "Nous analysons vos vidéos likées...",
        });
      }
      
      if (currentStep === 50) {
        toast({
          title: "Traitement des données",
          description: "Analyse des caractéristiques musicales...",
        });
      }
      
      if (currentStep === 80) {
        toast({
          title: "Finalisation",
          description: "Préparation de votre bibliothèque musicale...",
        });
      }
      
      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setIsProcessing(false);
        
        // Changed "success" to "default" to match allowed variant types
        toast({
          title: "Analyse terminée !",
          description: "Votre bibliothèque est prête à être explorée.",
        });
        
        // Ici, on simulerait la redirection vers l'onglet d'analyse ou 
        // l'affichage des résultats dans l'interface
      }
    }, 100);
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card overflow-hidden">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Reconnaissance Musicale</h2>
          <p className="text-muted-foreground">
            {isAuthenticated 
              ? "Analyse de votre bibliothèque YouTube en cours" 
              : "Connectez-vous pour analyser vos vidéos YouTube likées"}
          </p>
        </div>

        <div 
          className={cn(
            "relative w-48 h-48 mx-auto rounded-full transition-all duration-500 mb-8",
            isProcessing ? "scale-110" : "scale-100",
            isProcessing ? "music-gradient shadow-lg shadow-music-purple/30" : "bg-secondary/60"
          )}
        >
          <button
            onClick={isAuthenticated ? () => {} : handleGoogleAuth}
            disabled={isProcessing}
            className="absolute inset-0 flex items-center justify-center focus:outline-none"
            aria-label={isAuthenticated ? "Analyse en cours" : "Se connecter à Google"}
          >
            <div className="absolute inset-4 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
              <div className={cn(
                "p-12 rounded-full",
                isProcessing ? "bg-music-purple animate-pulse-light" : "bg-secondary"
              )}>
                {isProcessing ? (
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
                    <span className="text-white font-medium">Analyse...</span>
                  </div>
                ) : (
                  <div className="w-8 h-12 flex items-center justify-center">
                    {isAuthenticated ? (
                      <Music className="h-8 w-8" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </button>
        </div>

        {isProcessing && (
          <div className="w-full bg-secondary/50 rounded-full h-2.5 mb-6">
            <div
              className="bg-music-purple h-2.5 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <div className="flex justify-center space-x-4">
          {!isAuthenticated ? (
            <Button 
              onClick={handleGoogleAuth}
              disabled={isProcessing}
              className="flex items-center space-x-2"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Connecter avec Google</span>
            </Button>
          ) : (
            <>
              <Button variant="outline">Historique</Button>
              <Button>Ajouter à une playlist</Button>
            </>
          )}
        </div>
      </CardContent>

      <style>
        {`
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
        `}
      </style>
    </Card>
  );
};

export default MusicRecognizer;
