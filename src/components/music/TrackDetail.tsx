
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MusicData } from "@/types/music";
import { Badge } from "@/components/ui/badge";

interface TrackDetailProps {
  track?: MusicData;
}

const TrackDetail = ({ track }: TrackDetailProps) => {
  // Demo track for preview
  const demoTrack: MusicData = track || {
    id: "demo_track_id",
    title: "Lost in the Rhythm",
    artist: "Electronic Dreams",
    albumArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60",
    youtubeId: "dQw4w9WgXcQ", // Sample YouTube ID
    p_genre: [
      { genre: "Electronic---Dance-pop", score: 0.0566 },
      { genre: "Pop---K-pop", score: 0.045 }
    ],
    p_mood: [
      { mood: "energetic", score: 0.079 },
      { mood: "happy", score: 0.0981 }
    ],
    p_dance: [{ danceability: "High", score: 0.904 }],
    bpm: 119,
    instrument_scores: [
      { instrument: "drums", score: 33.4462 },
      { instrument: "synthesizer", score: 21.6905 }
    ],
    energy: 0.0716,
    loudness: 0.1952,
    duration_sec: 267.47
  };

  // Format genre for display
  const formatGenre = (genreString: string) => {
    if (genreString.includes("---")) {
      return genreString.split("---")[0];
    }
    return genreString;
  };

  // Get primary genre
  const primaryGenre = demoTrack.p_genre.length > 0 
    ? formatGenre(demoTrack.p_genre[0].genre)
    : "Unknown";

  // Get primary mood
  const primaryMood = demoTrack.p_mood.length > 0
    ? demoTrack.p_mood[0].mood
    : "Unknown";

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Track Info Card */}
        <Card className="glass-card lg:col-span-1">
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={demoTrack.albumArt}
                alt={`${demoTrack.title} by ${demoTrack.artist}`}
                className="w-full aspect-square object-cover rounded-t-lg"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-music-purple">{primaryGenre}</Badge>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-bold truncate">{demoTrack.title}</h2>
                <p className="text-muted-foreground text-lg">{demoTrack.artist}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">BPM</div>
                  <div className="text-xl font-medium">{demoTrack.bpm}</div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Durée</div>
                  <div className="text-xl font-medium">
                    {Math.floor(demoTrack.duration_sec / 60)}:{String(Math.round(demoTrack.duration_sec % 60)).padStart(2, '0')}
                  </div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Mood</div>
                  <div className="text-xl font-medium capitalize">{primaryMood}</div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Danceability</div>
                  <div className="text-xl font-medium">
                    {demoTrack.p_dance.length > 0 ? demoTrack.p_dance[0].danceability : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* YouTube Embed */}
        <Card className="glass-card lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Écouter</h2>
            <div className="aspect-video w-full">
              {demoTrack.youtubeId ? (
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${demoTrack.youtubeId}`}
                  title={`${demoTrack.title} by ${demoTrack.artist}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full bg-secondary/50 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Vidéo non disponible</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrackDetail;
