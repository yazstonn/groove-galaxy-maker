import React from 'react';
import useAppEnvironment from '../../hooks/useAppEnvironment';
import { cn } from '@/lib/utils';

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

  // Si c'est une application Electron, on ajoute une marge en haut pour la barre de titre
  // sous macOS (qui utilise un style différent)
  const containerStyle = isMac && isElectron ? { paddingTop: '1.5rem' } : {};

  return (
    <div className={platformClasses} style={containerStyle} data-platform={isElectron ? 'electron' : 'web'}>
      {isElectron && isMac && (
        <div className="drag-region h-7 absolute top-0 left-0 right-0 z-50"></div>
      )}
      
      {children}
      
      {isElectron && (
        <div className="electron-footer text-center p-2 text-xs text-gray-500 border-t">
          Groove Galaxy - Application Version
        </div>
      )}
    </div>
  );
};

export default PlatformWrapper;
