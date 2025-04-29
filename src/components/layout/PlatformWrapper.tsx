import React from 'react';
import useAppEnvironment from '../../hooks/useAppEnvironment';
import { cn } from '@/lib/utils';
import CustomTitleBar from './CustomTitleBar';

interface PlatformWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Composant qui adapte l'interface en fonction de la plateforme d'exécution
 * (navigateur web ou application de bureau Electron)
 */
const PlatformWrapper: React.FC<PlatformWrapperProps> = ({ children, className }) => {
  const { isElectron, isMac, isWindows, isLinux } = useAppEnvironment();

  // Classes spécifiques à chaque plateforme
  const platformClasses = cn(
    className,
    isElectron && 'electron-app',
    isMac && 'mac-os',
    isWindows && 'windows',
    isLinux && 'linux'
  );

  return (
    <div className={platformClasses} data-platform={isElectron ? 'electron' : 'web'}>
      {/* Barre de titre personnalisée pour Windows/Linux en mode Electron */}
      {isElectron && !isMac && <CustomTitleBar />}
      
      {/* Si macOS, on ajoute une marge en haut pour la barre de titre native */}
      <div className={cn(
        "platform-content w-full h-full",
        isElectron && isMac && "pt-7" // Espace pour la barre de titre macOS
      )}>
        {children}
      </div>
      
      {/* Pied de page pour la version desktop */}
      {isElectron && (
        <div className="electron-footer text-center p-2 text-xs text-gray-500 border-t">
          Groove Galaxy - Version Desktop
        </div>
      )}
    </div>
  );
};

export default PlatformWrapper;
