import { useState, useEffect } from 'react';

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
    // Vérifier si l'application s'exécute dans Electron
    const userAgent = navigator.userAgent.toLowerCase();
    const isElectron = userAgent.indexOf(' electron/') > -1;
    
    // Déterminer la plateforme
    const isMac = /darwin|mac os/.test(navigator.platform.toLowerCase());
    const isWindows = /win/.test(navigator.platform.toLowerCase());
    const isLinux = /linux/.test(navigator.platform.toLowerCase());
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
