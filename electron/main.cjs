const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';
const url = require('url');

// Gardez une référence globale de l'objet window, sinon la fenêtre sera
// fermée automatiquement quand l'objet JavaScript sera collecté par le garbage collector.
let mainWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  // Créer la fenêtre du navigateur.
  mainWindow = new BrowserWindow({
    width: Math.min(1280, width * 0.8),
    height: Math.min(800, height * 0.8),
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs')
    },
    icon: path.join(__dirname, '../public/music-icon.png'),
    
    // Paramètres pour une fenêtre personnalisée
    frame: false, // Supprime la bordure de fenêtre standard
    titleBarStyle: 'hidden',
    transparent: false,
    backgroundColor: '#00000000', // Transparent
    roundedCorners: true,
    thickFrame: true, // Permet le redimensionnement
    show: false, // Ne pas afficher jusqu'à ce que soit prêt
  });

  // Affiche la fenêtre quand elle est prête pour éviter le flash blanc
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Charger l'app
  if (isDev) {
    // En développement, chargez le serveur de développement local
    mainWindow.loadURL('http://localhost:5173');
    // Ouvre les DevTools.
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    // En production, chargez l'application construite
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Gestion des événements IPC pour le contrôle de la fenêtre
  ipcMain.on('window-minimize', () => {
    mainWindow.minimize();
  });

  ipcMain.on('window-maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on('window-close', () => {
    mainWindow.close();
  });

  // Émis lorsque la fenêtre est fermée.
  mainWindow.on('closed', function () {
    // Dé-référencer l'objet window, généralement vous stockeriez les fenêtres
    // dans un tableau si votre application supporte le multi-fenêtre, c'est le moment
    // où vous devriez supprimer l'élément correspondant.
    mainWindow = null;
  });
}

// Cette méthode sera appelée quand Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigateur.
// Certaines APIs peuvent être utilisées uniquement après cet événement.
app.on('ready', createWindow);

// Quitte lorsque toutes les fenêtres sont fermées.
app.on('window-all-closed', function () {
  // Sur macOS, il est commun pour une application et leur barre de menu
  // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
  // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
  if (mainWindow === null) createWindow();
});
