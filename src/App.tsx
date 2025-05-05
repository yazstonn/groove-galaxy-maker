
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Playlists from "./pages/Playlists";
import Musiques from "./pages/Musiques";
import TrackDetail from "./pages/TrackDetail";
import Analyse from "./pages/Analyse";
import Statistics from "./pages/Statistics";
import PlaylistCreation from "./pages/PlaylistCreation";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

const App = () => (
  <GoogleOAuthProvider clientId="1049306400638-cbkjugjqa606cpgsd2tfhuml6ch9e2l1.apps.googleusercontent.com">
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/musiques" replace />} />
          <Route path="/musiques" element={<Musiques />} />
          <Route path="/track/:id" element={<TrackDetail />} />
          <Route path="/analyse" element={<Analyse />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlist/create" element={<PlaylistCreation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </GoogleOAuthProvider>
);

export default App;
