import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173, // Port par défaut de Vite pour être compatible avec la configuration Electron
    watch: {
      usePolling: true,
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    // Configuration pour optimiser la sortie pour Electron
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer les bibliothèques React pour améliorer les performances
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // Regrouper les composants UI
          "ui-components": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            // ... autres composants UI
          ],
        },
      },
    },
  },
  // Optimisation pour l'environnement Electron
  base: mode === "production" ? "./" : "/", // Chemin relatif en production
}));
