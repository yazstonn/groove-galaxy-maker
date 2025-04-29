# Groove Galaxy - Application Desktop

Ce document explique comment utiliser Groove Galaxy à la fois comme application web et comme application de bureau (desktop) grâce à Electron.

## Prérequis

- Node.js 16.x ou supérieur
- npm ou yarn

## Développement

### Mode Web (navigateur)

Pour démarrer l'application en mode développement web classique :

```bash
npm run dev
```

Cela lancera l'application sur http://localhost:5173 dans votre navigateur.

### Mode Desktop (Electron)

Pour démarrer l'application en mode desktop avec Electron :

```bash
npm run electron:dev
```

Cela lancera à la fois le serveur de développement Vite et une fenêtre Electron qui se connecte à ce serveur.

## Production

### Build pour le Web

Pour construire l'application pour un déploiement web :

```bash
npm run build
```

Les fichiers générés se trouveront dans le répertoire `dist/`.

### Build pour Desktop

Pour créer un package d'installation pour desktop :

```bash
npm run electron:build
```

Cela générera des packages d'installation adaptés à votre système d'exploitation dans le dossier `release/`.

Vous pouvez également créer un package pour une plateforme spécifique :

- Windows : `npm run electron:build -- --win`
- macOS : `npm run electron:build -- --mac`
- Linux : `npm run electron:build -- --linux`

## Fonctionnalités spécifiques à la version Desktop

La version desktop de Groove Galaxy offre quelques avantages par rapport à la version web :

1. **Accès hors ligne** : Utilisez l'application sans connexion internet
2. **Analyse locale des fichiers musicaux** : Analyser des fichiers directement depuis votre disque dur
3. **Intégration système** : Notifications système et contrôles multimédias intégrés
4. **Meilleure performance** : Exécution native pour une expérience plus fluide
5. **Accès aux périphériques** : Microphone et autres périphériques audio avec moins de restrictions

## Structure du projet

- `electron/` : Contient les fichiers spécifiques à Electron
  - `main.js` : Point d'entrée de l'application Electron
  - `preload.js` : Script de préchargement pour injecter des fonctionnalités dans le processus de rendu

- `src/` : Code source React partagé entre la version web et desktop
  - `components/layout/PlatformWrapper.tsx` : Composant qui adapte l'interface selon la plateforme

## Différences de comportement

L'application s'adapte automatiquement à son environnement d'exécution :

- Dans un navigateur web, elle se comporte comme une application web standard
- Dans Electron (desktop), elle utilise des contrôles et styles natifs, et peut accéder aux API système

## Dépannage

- **Problème** : Electron ne se lance pas
  - **Solution** : Vérifiez que les dépendances sont bien installées avec `npm install`

- **Problème** : Erreur "Cannot find module 'electron'"
  - **Solution** : Installez electron globalement avec `npm install -g electron`

- **Problème** : Erreur de compilation durant le build
  - **Solution** : Vérifiez la version de Node.js et mettez à jour si nécessaire
