const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';
const url = require('url');

// Gardez une référence globale de l'objet window, sinon la fenêtre sera
// fermée automatiquement quand l'objet JavaScript sera collecté par le garbage collector.
let mainWindow;

function createWindow() {
  // Créer la fenêtre du navigateur.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../public/music-icon.png')
  });

  // Charger l'app
  if (isDev) {
    // En développement, chargez le serveur de développement local
    mainWindow.loadURL('http://localhost:5173');
    // Ouvre les DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    // En production, chargez l'application construite
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

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

// Dans ce fichier, vous pouvez inclure le reste du code spécifique au processus principal de votre application.
// Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.
