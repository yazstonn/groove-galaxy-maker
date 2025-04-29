
export interface GenrePrediction {
  genre: string;
  score: number;
}

export interface MoodPrediction {
  mood: string;
  score: number;
}

export interface DancePrediction {
  danceability: string;
  score: number;
}

export interface InstrumentScore {
  instrument: string;
  score: number;
}

export interface MusicData {
  id: string;
  p_genre: GenrePrediction[];
  p_mood: MoodPrediction[];
  p_dance: DancePrediction[];
  bpm: number;
  instrument_scores: InstrumentScore[];
  energy: number;
  loudness: number;
  duration_sec: number;
  title: string; // Titre de la musique
  artist: string; // Artiste
  albumArt: string; // URL de la pochette d'album
  youtubeId?: string; // ID YouTube optionnel
}

export interface UserMusicLibrary {
  isLoading: boolean;
  isAuthenticated: boolean;
  tracks: MusicData[];
}
