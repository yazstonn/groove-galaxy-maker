
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface PlaylistSectionProps {
  className?: string;
}

const PlaylistSection = ({ className }: PlaylistSectionProps) => {
  const navigate = useNavigate();
  
  const recentPlaylists = [
    {
      id: 1,
      name: "Ambiance Électro",
      tracks: 12,
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=60",
      primaryGenre: "Électronique"
    },
    {
      id: 2,
      name: "Soirée Chill",
      tracks: 8,
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60",
      primaryGenre: "Lo-fi"
    },
    {
      id: 3,
      name: "Concentration",
      tracks: 15,
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60",
      primaryGenre: "Ambient"
    }
  ];

  const handlePlaylistClick = (playlist: typeof recentPlaylists[0]) => {
    navigate('/playlist/create', { state: { playlist } });
  };

  const handleCreatePlaylist = () => {
    navigate('/playlist/create');
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Mes Playlists</h2>
        <Button variant="outline" onClick={handleCreatePlaylist}>
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Playlist
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentPlaylists.map((playlist) => (
          <Card 
            key={playlist.id} 
            className="glass-card overflow-hidden group transition-all hover:shadow-lg cursor-pointer"
            onClick={() => handlePlaylistClick(playlist)}
          >
            <div className="relative h-32 overflow-hidden">
              <img
                src={playlist.image}
                alt={playlist.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <div>
                  <h3 className="text-white font-bold text-lg">{playlist.name}</h3>
                  <div className="flex items-center text-white/80 text-sm">
                    <Music className="w-3 h-3 mr-1" /> 
                    <span>{playlist.tracks} morceaux</span>
                  </div>
                </div>
              </div>
              <Badge className="absolute top-2 right-2 bg-music-purple">{playlist.primaryGenre}</Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-6 h-6 rounded-full border-2 border-background bg-secondary"
                    ></div>
                  ))}
                </div>
                <Button variant="ghost" size="sm">
                  Écouter
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card 
          className="glass-card border-dashed flex items-center justify-center h-[168px] cursor-pointer"
          onClick={handleCreatePlaylist}
        >
          <div className="text-center p-4">
            <div className="w-12 h-12 rounded-full bg-secondary/80 mx-auto flex items-center justify-center mb-2">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Ajouter une playlist</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PlaylistSection;
