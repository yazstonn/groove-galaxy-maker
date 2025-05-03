
import React from "react";
import { useParams } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MusicData } from "@/types/music";
import { ArrowLeft, Music } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample data - in a real app, this would come from an API
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
  }
];

const TrackDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the track with the matching ID
  const track = sampleTracks.find(track => track.id === id);

  if (!track) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h2 className="text-2xl font-bold mb-4">Morceau non trouvé</h2>
          <Button onClick={() => navigate('/musiques')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux musiques
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/musiques')}
          className="mb-2 -ml-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux musiques
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Track Info */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <div className="aspect-square w-full overflow-hidden">
                <img 
                  src={track.albumArt} 
                  alt={`${track.title} by ${track.artist}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold mb-1">{track.title}</h1>
                <h2 className="text-xl text-muted-foreground mb-4">{track.artist}</h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Genres</div>
                    <div className="flex flex-wrap gap-2">
                      {track.p_genre.map(genre => (
                        <Badge key={genre.genre} variant="secondary">
                          {genre.genre} ({Math.round(genre.score * 100)}%)
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-1">Ambiances</div>
                    <div className="flex flex-wrap gap-2">
                      {track.p_mood.map(mood => (
                        <Badge key={mood.mood} variant="outline">
                          {mood.mood}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium">BPM</div>
                      <div className="text-lg">{track.bpm}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium">Durée</div>
                      <div className="text-lg">
                        {Math.floor(track.duration_sec / 60)}:{String(track.duration_sec % 60).padStart(2, '0')}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium">Énergie</div>
                      <div className="text-lg">{Math.round(track.energy * 100)}%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 flex gap-2">
              <Button className="w-full">
                <Music className="mr-2 h-4 w-4" />
                Ajouter à une playlist
              </Button>
            </div>
          </div>
          
          {/* YouTube Embed */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-4">
                <div className="aspect-video w-full">
                  {track.youtubeId ? (
                    <iframe
                      className="w-full h-full rounded-md"
                      src={`https://www.youtube.com/embed/${track.youtubeId}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`${track.title} by ${track.artist}`}
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary rounded-md">
                      <p>Aucun lien YouTube disponible pour ce morceau</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Instruments détectés</h3>
                <div className="space-y-4">
                  {track.instrument_scores.map(instrument => (
                    <div key={instrument.instrument}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{instrument.instrument}</span>
                        <span className="text-sm font-medium">{Math.round(instrument.score * 100)}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-music-purple h-2 rounded-full" 
                          style={{ width: `${instrument.score * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TrackDetail;
