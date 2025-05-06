
import React, { useEffect } from "react";
import { MusicData } from "@/types/music";
import { toast } from "sonner";

interface MusicApiHandlerProps {
  onAddTrack: (track: MusicData) => void;
}

const MusicApiHandler: React.FC<MusicApiHandlerProps> = ({ onAddTrack }) => {
  useEffect(() => {
    // Create a function to handle the POST request
    const handleApiPost = async (event: MessageEvent) => {
      // Make sure we're only processing messages from our own origin
      if (event.origin !== window.location.origin) {
        return;
      }

      try {
        // Check if the message has the correct format
        if (event.data && event.data.type === 'ADD_MUSIC_TRACK') {
          const trackData = event.data.track;
          
          // Validate the track data
          if (!trackData || !trackData.title || !trackData.artist) {
            throw new Error('Invalid track data');
          }

          // Generate a unique ID if not provided
          const newTrack: MusicData = {
            id: trackData.id || String(Date.now()),
            title: trackData.title,
            artist: trackData.artist,
            albumArt: trackData.albumArt || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&auto=format&fit=crop&q=60",
            p_genre: trackData.p_genre || [{ genre: "Unknown", score: 1.0 }],
            p_mood: trackData.p_mood || [{ mood: "Unknown", score: 1.0 }],
            p_dance: trackData.p_dance || [{ danceability: "Medium", score: 0.5 }],
            bpm: trackData.bpm || 120,
            instrument_scores: trackData.instrument_scores || [
              { instrument: "Other", score: 1.0 }
            ],
            energy: trackData.energy || 0.5,
            loudness: trackData.loudness || -7.0,
            duration_sec: trackData.duration_sec || 180,
            youtubeId: trackData.youtubeId || undefined
          };

          // Add the track to the library
          onAddTrack(newTrack);
          
          // Notify with a success message
          toast.success(`${newTrack.title} ajouté à la bibliothèque via API`);
          
          // Send a response message
          if (event.source && 'postMessage' in event.source) {
            const response = {
              type: 'ADD_MUSIC_TRACK_RESPONSE',
              success: true,
              trackId: newTrack.id
            };
            (event.source as WindowProxy).postMessage(response, event.origin);
          }
        }
      } catch (error) {
        console.error('Error processing API request:', error);
        toast.error("Erreur lors de l'ajout de la musique");
        
        // Send error response if possible
        if (event.source && 'postMessage' in event.source) {
          const response = {
            type: 'ADD_MUSIC_TRACK_RESPONSE',
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          };
          (event.source as WindowProxy).postMessage(response, event.origin);
        }
      }
    };

    // Add event listener for postMessage API
    window.addEventListener('message', handleApiPost);

    // Cleanup function
    return () => {
      window.removeEventListener('message', handleApiPost);
    };
  }, [onAddTrack]);

  // This component doesn't render anything
  return null;
};

export default MusicApiHandler;
