import React, { useState, useEffect } from 'react';
import { X, Minus, Maximize, Minimize } from 'lucide-react';
import { cn } from '@/lib/utils';
import useAppEnvironment from '@/hooks/useAppEnvironment';

interface CustomTitleBarProps {
  title?: string;
  className?: string;
}

const CustomTitleBar: React.FC<CustomTitleBarProps> = ({ 
  title = 'Groove Galaxy',
  className 
}) => {
  const { isElectron, isMac } = useAppEnvironment();
  const [isMaximized, setIsMaximized] = useState(false);
  
  // Ne rien afficher si nous ne sommes pas dans Electron ou si nous sommes sur macOS
  // (macOS gère différemment la barre de titre)
  if (!isElectron || isMac) {
    return null;
  }

  // Fonctions pour manipuler la fenêtre Electron (via l'API préchargée)
  const handleMinimize = () => {
    if (window.electronAPI) {
      window.electronAPI.minimizeWindow();
    }
  };

  const handleMaximize = () => {
    if (window.electronAPI) {
      window.electronAPI.maximizeWindow();
      // On bascule l'état local pour changer l'icône
      setIsMaximized(!isMaximized);
    }
  };

  const handleClose = () => {
    if (window.electronAPI) {
      window.electronAPI.closeWindow();
    }
  };

  return (
    <div 
      className={cn(
        'custom-titlebar h-9 flex items-center p-0 bg-gradient-to-r from-purple-900/90 to-indigo-900/90 backdrop-blur-md',
        'border-b border-white/10 text-white shadow-md',
        className
      )}
    >
      {/* Région glissable pour déplacer la fenêtre */}
      <div className="drag-region flex-1 h-full app-drag-region flex items-center px-3">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          </div>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>

      {/* Boutons de contrôle de la fenêtre */}
      <div className="window-controls flex h-full">
        <button 
          onClick={handleMinimize}
          className="window-control-btn h-full w-12 flex items-center justify-center hover:bg-white/10 focus:outline-none transition-colors"
          aria-label="Minimize"
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <button 
          onClick={handleMaximize}
          className="window-control-btn h-full w-12 flex items-center justify-center hover:bg-white/10 focus:outline-none transition-colors"
          aria-label={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? (
            <Minimize className="w-4 h-4" />
          ) : (
            <Maximize className="w-4 h-4" />
          )}
        </button>
        
        <button 
          onClick={handleClose}
          className="window-control-btn h-full w-12 flex items-center justify-center hover:bg-red-600 focus:outline-none transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CustomTitleBar;
