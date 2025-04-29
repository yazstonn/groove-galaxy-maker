const { contextBridge, ipcRenderer } = require('electron');

// Exposer des fonctionnalités protégées à travers la contextBridge
contextBridge.exposeInMainWorld('electronAPI', {
  // Informations sur la plateforme
  platform: process.platform,
  
  // Fonctions de contrôle de la fenêtre
  minimizeWindow: () => ipcRenderer.send('window-minimize'),
  maximizeWindow: () => ipcRenderer.send('window-maximize'),
  closeWindow: () => ipcRenderer.send('window-close'),
  
  // Ajout d'une propriété indiquant qu'on est dans Electron
  isElectron: true
});

// Lorsque le DOM est chargé, on peut initialiser d'autres choses
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});