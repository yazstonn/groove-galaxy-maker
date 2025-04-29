import { useState, useEffect } from 'react';

// Étendre l'interface Window pour inclure electronAPI
declare global {
  interface Window {
    electronAPI?: {
      isElectron: boolean;
      platform: string;
      minimizeWindow: () => void;
      maximizeWindow: () => void;
      closeWindow: () => void;
    };
  }
}

interface AppEnvironment {
  isElectron: boolean;
  isMac: boolean;
  isWindows: boolean;
  isLinux: boolean;
  isDesktop: boolean;
}

/**
 * Hook personnalisé pour détecter l'environnement d'exécution de l'application.
 * Permet de savoir si l'application s'exécute dans Electron ou dans un navigateur web.
 */
const useAppEnvironment = (): AppEnvironment => {
  const [environment, setEnvironment] = useState<AppEnvironment>({
    isElectron: false,
    isMac: false,
    isWindows: false,
    isLinux: false,
    isDesktop: false
  });

  useEffect(() => {
    // Vérifier si l'application s'exécute dans Electron en se basant sur l'API exposée
    const isElectron = !!window.electronAPI;
    
    // Déterminer la plateforme
    let platform = '';
    
    if (isElectron && window.electronAPI?.platform) {
      // Si on est dans Electron, on utilise la valeur exposée par electronAPI
      platform = window.electronAPI.platform;
    } else {
      // Sinon, on essaie de détecter avec navigator
      platform = navigator.platform.toLowerCase();
    }
    
    const isMac = /darwin|mac os/.test(platform);
    const isWindows = /win/.test(platform);
    const isLinux = /linux/.test(platform);
    const isDesktop = isElectron;

    setEnvironment({
      isElectron,
      isMac,
      isWindows,
      isLinux,
      isDesktop
    });
  }, []);

  return environment;
};

export default useAppEnvironment;
