
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { MusicData } from "@/types/music";
import MusicList from "@/components/music/MusicList";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import MusicFilters from "@/components/music/MusicFilters";
import { Search } from "lucide-react";

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

const Musiques = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTracks, setFilteredTracks] = useState(sampleTracks);
  const [filters, setFilters] = useState<FiltersType>({
    genres: [],
    moods: [],
    bpmRange: [0, 200],
    energy: [0, 1],
    instruments: []
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Bibliothèque Musicale</h1>
          <p className="text-muted-foreground text-lg">
            Explorez et découvrez votre collection musicale personnalisée
          </p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-10" 
            placeholder="Rechercher par titre, artiste, genre..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <MusicFilters filters={filters} setFilters={setFilters} />
          </div>
          
          <div className="lg:col-span-3">
            <MusicList tracks={filteredTracks} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Musiques;
