
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Music, Guitar, Piano, Mic, Headphones, Volume2 } from "lucide-react";

interface GenrePrediction {
  genre: string;
  score: number;
}

interface MoodPrediction {
  mood: string;
  score: number;
}

interface DancePrediction {
  danceability: string;
  score: number;
}

interface InstrumentScore {
  instrument: string;
  score: number;
}

interface MusicData {
  id: string;
  p_genre: GenrePrediction[];
  p_mood: MoodPrediction[];
  p_dance: DancePrediction[];
  bpm: number;
  instrument_scores: InstrumentScore[];
  energy: number;
  loudness: number;
  duration_sec: number;
  title?: string; // Added for display purposes
  artist?: string; // Added for display purposes
  albumArt?: string; // Added for display purposes
}

interface MusicAnalysisProps {
  music?: MusicData;
}

const MusicAnalysis = ({ music }: MusicAnalysisProps) => {
  // Demo data based on the format you provided
  const demoMusic: MusicData = music || {
    id: "unique_id_here",
    title: "Lost in the Rhythm", // Added for display
    artist: "Electronic Dreams", // Added for display
    albumArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60", // Added for display
    p_genre: [
      { genre: "Electronic---Dance-pop", score: 0.0566 },
      { genre: "Pop---K-pop", score: 0.045 },
      { genre: "Electronic---Downtempo", score: 0.0416 },
      { genre: "Pop---Ballad", score: 0.0405 },
      { genre: "Funk / Soul---Contemporary R&B", score: 0.0379 }
    ],
    p_mood: [
      { mood: "love", score: 0.1506 },
      { mood: "happy", score: 0.0981 },
      { mood: "energetic", score: 0.079 },
      { mood: "romantic", score: 0.063 },
      { mood: "film", score: 0.0487 }
    ],
    p_dance: [
      { danceability: "High", score: 0.904 }
    ],
    bpm: 119,
    instrument_scores: [
      { instrument: "drums", score: 33.4462 },
      { instrument: "guitar", score: 29.5078 },
      { instrument: "bass", score: 25.6136 },
      { instrument: "piano", score: 24.6804 },
      { instrument: "synthesizer", score: 21.6905 },
      { instrument: "keyboard", score: 20.2913 }
    ],
    energy: 0.0716,
    loudness: 0.1952,
    duration_sec: 267.47
  };

  // Format genres by removing '---' and taking first part
  const formatGenre = (genreString: string) => {
    if (genreString.includes("---")) {
      return genreString.split("---")[0];
    }
    return genreString;
  };

  // Get the top mood
  const topMood = demoMusic.p_mood.length > 0 ? demoMusic.p_mood[0].mood : "Inconnu";

  // Calculate energy and intensity as percentages for the UI
  const energyPercentage = Math.round(demoMusic.energy * 100);
  const intensityPercentage = Math.round(demoMusic.loudness * 100);
  
  // Get the top instruments (for display)
  const topInstruments = demoMusic.instrument_scores
    .slice(0, 6)
    .map(item => ({
      name: item.instrument.charAt(0).toUpperCase() + item.instrument.slice(1),
      score: Math.round((item.score / 40) * 100) // Normalize to percentage (assuming 40 is max score)
    }));

  // Get icon for instrument
  const getInstrumentIcon = (instrumentName: string) => {
    const name = instrumentName.toLowerCase();
    if (name.includes("guitar")) return <Guitar className="h-4 w-4" />;
    if (name.includes("piano")) return <Piano className="h-4 w-4" />;
    if (name.includes("drum")) return <Headphones className="h-4 w-4" />;
    if (name === "voice") return <Mic className="h-4 w-4" />;
    return <Music className="h-4 w-4" />;
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Analyse Musicale</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 glass-card">
          <CardHeader className="pb-2">
            <CardTitle>Morceau détecté</CardTitle>
            <CardDescription>Écoutez et analysez ce morceau</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-4 overflow-hidden rounded-xl">
                <img 
                  src={demoMusic.albumArt} 
                  alt={`${demoMusic.title} by ${demoMusic.artist}`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center cursor-pointer">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-music-purple border-b-8 border-b-transparent ml-1"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60">
                  <h3 className="text-white font-bold truncate">{demoMusic.title}</h3>
                  <p className="text-white/80 text-sm truncate">{demoMusic.artist}</p>
                </div>
              </div>
              
              <div className="audio-wave flex items-end justify-center mt-4 h-6 w-36">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-muted-foreground text-sm">BPM: {demoMusic.bpm}</p>
                <p className="text-muted-foreground text-sm">Durée: {Math.floor(demoMusic.duration_sec / 60)}:{String(Math.round(demoMusic.duration_sec % 60)).padStart(2, '0')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2 glass-card">
          <CardHeader>
            <CardTitle>Caractéristiques</CardTitle>
            <CardDescription>Analyse détaillée du morceau</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="genre">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="genre">Genre</TabsTrigger>
                <TabsTrigger value="mood">Mood</TabsTrigger>
                <TabsTrigger value="energy">Énergie</TabsTrigger>
                <TabsTrigger value="instruments">Instruments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="genre" className="space-y-4">
                <h3 className="font-medium text-lg">Classification par genre</h3>
                <div className="flex flex-wrap gap-2">
                  {demoMusic.p_genre.map((genrePrediction, idx) => (
                    <Badge key={idx} className="bg-music-purple">
                      {formatGenre(genrePrediction.genre)}
                      <span className="ml-1 opacity-70">
                        {Math.round(genrePrediction.score * 100)}%
                      </span>
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Confiance dans les prédictions</h4>
                  {demoMusic.p_genre.slice(0, 5).map((genre, idx) => (
                    <div key={idx} className="mb-3">
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{formatGenre(genre.genre)}</span>
                        <span>{Math.round(genre.score * 100)}%</span>
                      </div>
                      <Progress value={genre.score * 100} className="h-2"/>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="mood" className="space-y-4">
                <h3 className="font-medium text-lg">Ambiance détectée</h3>
                <div className="p-4 rounded-lg bg-gradient-to-r from-music-purple to-music-dark-purple text-white font-medium text-center text-xl capitalize">
                  {topMood}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {demoMusic.p_mood.map((moodItem, index) => {
                    const colors = [
                      "bg-music-light-purple",
                      "bg-music-soft-orange",
                      "bg-music-soft-green",
                      "bg-music-soft-blue",
                      "bg-music-purple"
                    ];
                    const colorIndex = index % colors.length;
                    
                    return (
                      <MoodCard 
                        key={index}
                        type={moodItem.mood.charAt(0).toUpperCase() + moodItem.mood.slice(1)}
                        value={Math.round(moodItem.score * 100)}
                        color={colors[colorIndex]}
                      />
                    );
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="energy" className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">Niveau d'énergie</h3>
                  <div className="space-y-1">
                    <Progress value={energyPercentage} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Faible</span>
                      <span>Élevée</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Intensité musicale</h3>
                  <div className="space-y-1">
                    <Progress value={intensityPercentage} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Douce</span>
                      <span>Intense</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Impact dynamique</h3>
                  <div className="h-24 w-full bg-secondary/50 rounded-lg p-2 flex items-end">
                    {[...Array(40)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 mx-0.5 bg-primary"
                        style={{
                          height: `${20 + Math.sin(i / 3) * 15 + Math.random() * 30}%`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Danceability</h3>
                  {demoMusic.p_dance.map((dance, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <span>{dance.danceability}</span>
                      <Badge className="bg-music-purple">{Math.round(dance.score * 100)}%</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="instruments" className="space-y-4">
                <h3 className="font-medium text-lg">Instruments détectés</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topInstruments.map((instrument, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/80">
                      <div className="text-primary">
                        {getInstrumentIcon(instrument.name)}
                      </div>
                      <span className="flex-1">{instrument.name}</span>
                      <span className="text-sm font-medium">{instrument.score}%</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface MoodCardProps {
  type: string;
  value: number;
  color: string;
}

const MoodCard = ({ type, value, color }: MoodCardProps) => {
  return (
    <div className="rounded-lg bg-white/50 dark:bg-gray-800/50 p-3 flex items-center justify-between">
      <span className="capitalize">{type}</span>
      <div className={cn("h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium text-white", color)}>
        {value}%
      </div>
    </div>
  );
};

export default MusicAnalysis;
