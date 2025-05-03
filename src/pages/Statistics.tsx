
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import MusicStats from "@/components/music/MusicStats";
import { Skeleton } from "@/components/ui/skeleton";

const Statistics = () => {
  const { data: tracks, isLoading } = useQuery({
    queryKey: ["tracks"],
    queryFn: async () => {
      // In a real app, this would fetch from an API
      // For now, let's simulate some delay and return mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          // Using mock data from src/components/music/MusicAnalysis.tsx
          const mockData = Array(20).fill(null).map((_, index) => ({
            id: `track-${index}`,
            title: `Track ${index}`,
            artist: `Artist ${index % 5}`,
            albumArt: `https://picsum.photos/seed/${index}/200/200`,
            bpm: Math.floor(Math.random() * 180) + 60,
            energy: Math.random(),
            loudness: Math.floor(Math.random() * 20) - 30,
            duration_sec: Math.floor(Math.random() * 300) + 120,
            p_genre: [
              { genre: "Pop", score: Math.random() },
              { genre: "Rock", score: Math.random() },
              { genre: "Hip Hop", score: Math.random() },
              { genre: "Electronic", score: Math.random() },
              { genre: "Jazz", score: Math.random() },
            ],
            p_mood: [
              { mood: "Happy", score: Math.random() },
              { mood: "Sad", score: Math.random() },
              { mood: "Energetic", score: Math.random() },
              { mood: "Calm", score: Math.random() },
            ],
            p_dance: [
              { danceability: "High", score: Math.random() },
              { danceability: "Medium", score: Math.random() },
              { danceability: "Low", score: Math.random() },
            ],
            instrument_scores: [
              { instrument: "Guitar", score: Math.random() },
              { instrument: "Piano", score: Math.random() },
              { instrument: "Drums", score: Math.random() },
              { instrument: "Bass", score: Math.random() },
              { instrument: "Vocals", score: Math.random() },
            ],
          }));
          resolve(mockData);
        }, 500);
      });
    },
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Statistiques Musicales</h1>
          <p className="text-muted-foreground text-lg">
            Explorez les tendances et analyses statistiques de votre bibliothèque musicale
          </p>
        </div>
        
        <Separator />
        
        <div className="pt-4">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-[300px] w-full rounded-lg" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-[250px] w-full rounded-lg" />
                <Skeleton className="h-[250px] w-full rounded-lg" />
              </div>
            </div>
          ) : (
            <MusicStats tracks={tracks || []} />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Statistics;
