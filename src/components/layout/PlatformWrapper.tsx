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
      
      {/* Contenu principal de l'application */}
      <div className={cn(
        "platform-content",
        isElectron && "electron-container"
      )}>
        {children}
      </div>
      
      {/* Pied de page pour la version desktop - optionnel */}
      {isElectron && false && ( // désactivé pour l'instant (mettre true pour activer)
        <div className="electron-footer">
          Groove Galaxy
        </div>
      )}
    </div>
  );
};

export default PlatformWrapper;
