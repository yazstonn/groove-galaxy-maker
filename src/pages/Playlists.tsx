
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import PlaylistSection from "@/components/music/PlaylistSection";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaylistAdd, ListMusic, Gear } from "lucide-react";
import MusicRecognizer from "@/components/music/MusicRecognizer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Playlists = () => {
  const navigate = useNavigate();

  const handleCreatePlaylist = () => {
    navigate('/playlist/create');
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Mes Playlists</h1>
            <p className="text-muted-foreground text-lg">
              Explorez et gérez vos playlists personnalisées
            </p>
          </div>
          
          <Button onClick={handleCreatePlaylist}>
            <PlaylistAdd className="mr-2 h-4 w-4" />
            Nouvelle Playlist
          </Button>
        </div>
        
        <Separator />
        
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <ListMusic className="h-4 w-4" />
              Playlists Manuelles
            </TabsTrigger>
            <TabsTrigger value="auto" className="flex items-center gap-2">
              <Gear className="h-4 w-4" />
              Playlists Automatiques
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="pt-4">
            <PlaylistSection />
          </TabsContent>
          
          <TabsContent value="auto" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Playlists Intelligentes</h2>
                <p className="text-muted-foreground">
                  Créez des playlists générées automatiquement selon vos critères musicaux préférés.
                </p>
                
                <div className="grid grid-cols-1 gap-4">
                  <AutoPlaylistCard 
                    title="Par Ambiance" 
                    description="Créez des playlists en fonction de l'ambiance et de l'énergie" 
                    icon="🎭" 
                  />
                  <AutoPlaylistCard 
                    title="Par Genre" 
                    description="Regroupez vos morceaux par genres musicaux" 
                    icon="🎵" 
                  />
                  <AutoPlaylistCard 
                    title="Par Artiste" 
                    description="Explorez la musique par artiste" 
                    icon="🎤" 
                  />
                  <AutoPlaylistCard 
                    title="Par Tempo (BPM)" 
                    description="Créez des playlists en fonction du rythme" 
                    icon="⏱️" 
                  />
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Reconnaissance Musicale</h2>
                <MusicRecognizer />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

interface AutoPlaylistCardProps {
  title: string;
  description: string;
  icon: string;
}

const AutoPlaylistCard = ({ title, description, icon }: AutoPlaylistCardProps) => {
  return (
    <div className="glass-card border hover:border-primary/50 hover:shadow-md transition-all p-4 rounded-lg cursor-pointer flex items-center gap-4">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Playlists;
