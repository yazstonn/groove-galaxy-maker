
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface MusicAnalysisProps {
  music?: MusicData;
}

interface MusicData {
  title: string;
  artist: string;
  albumArt: string;
  genre: string[];
  mood: string;
  energy: number;
  intensity: number;
  instruments: string[];
}

const MusicAnalysis = ({ music }: MusicAnalysisProps) => {
  const demoMusic: MusicData = music || {
    title: "Lost in the Rhythm",
    artist: "Electronic Dreams",
    albumArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60",
    genre: ["Électronique", "House", "Deep House"],
    mood: "Énergique",
    energy: 78,
    intensity: 65,
    instruments: ["Synthétiseur", "Batterie électronique", "Basse", "Piano"]
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
                  {demoMusic.genre.map((genre, idx) => (
                    <Badge key={idx} className="bg-music-purple">{genre}</Badge>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="mood" className="space-y-4">
                <h3 className="font-medium text-lg">Ambiance détectée</h3>
                <div className="p-4 rounded-lg bg-gradient-to-r from-music-purple to-music-dark-purple text-white font-medium text-center text-xl">
                  {demoMusic.mood}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <MoodCard type="Calme" value={25} color="bg-music-light-purple" />
                  <MoodCard type="Énergique" value={75} color="bg-music-soft-orange" />
                  <MoodCard type="Joyeux" value={60} color="bg-music-soft-green" />
                  <MoodCard type="Mélancolique" value={30} color="bg-music-soft-blue" />
                </div>
              </TabsContent>
              
              <TabsContent value="energy" className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">Niveau d'énergie</h3>
                  <div className="space-y-1">
                    <Progress value={demoMusic.energy} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Faible</span>
                      <span>Élevée</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Intensité musicale</h3>
                  <div className="space-y-1">
                    <Progress value={demoMusic.intensity} className="h-3" />
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
              </TabsContent>
              
              <TabsContent value="instruments" className="space-y-4">
                <h3 className="font-medium text-lg">Instruments détectés</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {demoMusic.instruments.map((instrument, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/80">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span>{instrument}</span>
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
      <span>{type}</span>
      <div className={cn("h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium text-white", color)}>
        {value}%
      </div>
    </div>
  );
};

export default MusicAnalysis;
