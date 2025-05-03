import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { MusicData } from "@/types/music";
import MusicList from "@/components/music/MusicList";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import MusicFilters from "@/components/music/MusicFilters";
import { Search, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import AddYoutubeTrack from "@/components/music/AddYoutubeTrack";

// Sample data - in a real app, this would come from an API or be passed as props
const sampleTracks: MusicData[] = [
  {
    id: "1",
    title: "Nights",
    artist: "Frank Ocean",
    albumArt: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&auto=format&fit=crop&q=60",
    p_genre: [{ genre: "R&B", score: 0.9 }, { genre: "Pop", score: 0.4 }],
    p_mood: [{ mood: "Melancholic", score: 0.8 }, { mood: "Reflective", score: 0.7 }],
    p_dance: [{ danceability: "Medium", score: 0.6 }],
    bpm: 115,
    instrument_scores: [
      { instrument: "Synthesizer", score: 0.8 },
      { instrument: "Drums", score: 0.9 },
    ],
    energy: 0.7,
    loudness: -7.5,
    duration_sec: 309,
    youtubeId: "r4l9bFqgMaQ"
  },
  {
    id: "2",
    title: "Redbone",
    artist: "Childish Gambino",
    albumArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60",
    p_genre: [{ genre: "R&B", score: 0.8 }, { genre: "Funk", score: 0.7 }],
    p_mood: [{ mood: "Groovy", score: 0.9 }, { mood: "Mellow", score: 0.6 }],
    p_dance: [{ danceability: "High", score: 0.8 }],
    bpm: 95,
    instrument_scores: [
      { instrument: "Bass", score: 0.9 },
      { instrument: "Guitar", score: 0.7 },
    ],
    energy: 0.6,
    loudness: -8.2,
    duration_sec: 327,
    youtubeId: "Kp7eSUU9oy8"
  },
  {
    id: "3",
    title: "Flashing Lights",
    artist: "Kanye West",
    albumArt: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=60",
    p_genre: [{ genre: "Hip-Hop", score: 0.9 }, { genre: "Electronic", score: 0.5 }],
    p_mood: [{ mood: "Energetic", score: 0.7 }, { mood: "Confident", score: 0.8 }],
    p_dance: [{ danceability: "High", score: 0.8 }],
    bpm: 126,
    instrument_scores: [
      { instrument: "Synthesizer", score: 0.9 },
      { instrument: "Drums", score: 0.8 },
    ],
    energy: 0.8,
    loudness: -5.1,
    duration_sec: 238,
    youtubeId: "ZAz3aWT1wg4"
  },
  {
    id: "4",
    title: "Midnight City",
    artist: "M83",
    albumArt: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60",
    p_genre: [{ genre: "Electronic", score: 0.9 }, { genre: "Indie", score: 0.6 }],
    p_mood: [{ mood: "Nostalgic", score: 0.8 }, { mood: "Energetic", score: 0.7 }],
    p_dance: [{ danceability: "High", score: 0.7 }],
    bpm: 105,
    instrument_scores: [
      { instrument: "Synthesizer", score: 0.9 },
      { instrument: "Saxophone", score: 0.7 },
    ],
    energy: 0.9,
    loudness: -6.3,
    duration_sec: 244,
    youtubeId: "dX3k_QDnzHE"
  },
  {
    id: "5",
    title: "Thinkin Bout You",
    artist: "Frank Ocean",
    albumArt: "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?w=800&auto=format&fit=crop&q=60",
    p_genre: [{ genre: "R&B", score: 0.9 }, { genre: "Soul", score: 0.7 }],
    p_mood: [{ mood: "Melancholic", score: 0.8 }, { mood: "Romantic", score: 0.7 }],
    p_dance: [{ danceability: "Low", score: 0.4 }],
    bpm: 92,
    instrument_scores: [
      { instrument: "Piano", score: 0.7 },
      { instrument: "Bass", score: 0.6 },
    ],
    energy: 0.5,
    loudness: -9.8,
    duration_sec: 201,
    youtubeId: "6JHu3b-pbh8"
  }
];

// Définir le type pour les filtres
interface FiltersType {
  genres: string[];
  moods: string[];
  bpmRange: [number, number];
  energy: [number, number];
  instruments: string[];
}

// Form data type
interface PlaylistFormData {
  name: string;
  description?: string;
  coverImage?: string;
}

const PlaylistCreation = () => {
  const location = useLocation();
  const playlistTemplate = location.state?.playlist;
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [allTracks, setAllTracks] = useState(sampleTracks);
  const [selectedTracks, setSelectedTracks] = useState<MusicData[]>([]);
  const [suggestedTracks, setSuggestedTracks] = useState<MusicData[]>(sampleTracks.slice(0, 5));
  const [filters, setFilters] = useState<FiltersType>({
    genres: [],
    moods: [],
    bpmRange: [0, 200],
    energy: [0, 1],
    instruments: []
  });

  const form = useForm<PlaylistFormData>({
    defaultValues: {
      name: playlistTemplate?.name || "",
      description: "",
      coverImage: playlistTemplate?.image || ""
    }
  });

  const handleAddTrack = (track: MusicData) => {
    if (!selectedTracks.some(t => t.id === track.id)) {
      setSelectedTracks([...selectedTracks, track]);
      toast.success(`${track.title} ajouté à la playlist`);
    } else {
      toast.info(`${track.title} est déjà dans la playlist`);
    }
  };

  const handleRemoveTrack = (trackId: string) => {
    setSelectedTracks(selectedTracks.filter(track => track.id !== trackId));
    toast.info("Morceau retiré de la playlist");
  };

  const handleCreatePlaylist = (data: PlaylistFormData) => {
    if (selectedTracks.length === 0) {
      toast.error("Ajoutez au moins un morceau à la playlist");
      return;
    }

    // Here you would save the playlist to the database
    console.log("Creating playlist:", {
      ...data,
      tracks: selectedTracks
    });

    // Show success message
    toast.success("Playlist créée avec succès !");
    
    // Navigate back to playlists page
    navigate("/playlists");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Créer une Playlist</h1>
          <p className="text-muted-foreground text-lg">
            Personnalisez votre playlist avec vos morceaux préférés
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreatePlaylist)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de la playlist</FormLabel>
                      <FormControl>
                        <Input placeholder="Ma playlist géniale" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Une description de la playlist..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image de couverture (URL)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="pt-4 space-y-2">
                  <Button type="submit">Créer la playlist</Button>
                  <div className="mt-2">
                    <AddYoutubeTrack onAddTrack={handleAddTrack} />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Morceaux sélectionnés ({selectedTracks.length})</h3>
                {selectedTracks.length === 0 ? (
                  <Card className="bg-secondary/30">
                    <CardContent className="p-6 text-center text-muted-foreground">
                      <div className="w-12 h-12 rounded-full bg-secondary/80 mx-auto flex items-center justify-center mb-2">
                        <Plus className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p>Ajoutez des morceaux à votre playlist</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {selectedTracks.map(track => (
                      <Card key={track.id} className="flex items-center p-2">
                        <div className="h-10 w-10 relative overflow-hidden rounded-md mr-3">
                          <img 
                            src={track.albumArt} 
                            alt={track.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate text-sm">{track.title}</h4>
                          <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveTrack(track.id)}
                          className="ml-2"
                        >
                          Retirer
                        </Button>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </form>
        </Form>
        
        <Separator />
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Suggestions pour vous</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {suggestedTracks.map(track => (
              <Card 
                key={track.id} 
                className="glass-card overflow-hidden group transition-all hover:shadow-lg"
                onClick={() => handleAddTrack(track)}
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={track.albumArt}
                    alt={`${track.title} by ${track.artist}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                    <div>
                      <h3 className="text-white font-bold text-sm">{track.title}</h3>
                      <div className="text-white/80 text-xs">{track.artist}</div>
                    </div>
                  </div>
                  <Button 
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7 bg-white/90 hover:bg-white"
                  >
                    <Plus className="h-4 w-4 text-primary" />
                  </Button>
                </div>
                <CardContent className="p-2">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">
                      {track.p_genre[0].genre}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {Math.floor(track.duration_sec / 60)}:{String(track.duration_sec % 60).padStart(2, '0')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-10" 
                placeholder="Rechercher par titre, artiste, genre..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="ml-2">
              <AddYoutubeTrack onAddTrack={handleAddTrack} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <MusicFilters filters={filters} setFilters={setFilters} />
            </div>
            
            <div className="lg:col-span-3">
              <MusicListWithAddButton 
                tracks={allTracks} 
                onAddTrack={handleAddTrack} 
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

interface MusicListWithAddButtonProps {
  tracks: MusicData[];
  onAddTrack: (track: MusicData) => void;
}

const MusicListWithAddButton: React.FC<MusicListWithAddButtonProps> = ({ tracks, onAddTrack }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {tracks.length} morceau{tracks.length > 1 ? 'x' : ''} trouvé{tracks.length > 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {tracks.map(track => (
          <Card 
            key={track.id} 
            className="glass-card overflow-hidden group transition-all hover:shadow-lg"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={track.albumArt}
                alt={`${track.title} by ${track.artist}`}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <div>
                  <h3 className="text-white font-bold text-lg">{track.title}</h3>
                  <div className="text-white/80 text-sm">{track.artist}</div>
                </div>
              </div>
              <Button 
                variant="secondary"
                size="icon"
                className="absolute top-3 right-3 h-8 w-8 bg-white/90 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddTrack(track);
                }}
              >
                <Plus className="h-4 w-4 text-primary" />
              </Button>
            </div>
            <CardContent className="p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{Math.floor(track.duration_sec / 60)}:{String(track.duration_sec % 60).padStart(2, '0')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="text-xs">
                    {track.bpm} BPM
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlaylistCreation;
