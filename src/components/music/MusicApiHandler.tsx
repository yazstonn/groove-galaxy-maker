
import React, { useEffect } from "react";
import { MusicData } from "@/types/music";
import { toast } from "sonner";

interface MusicApiHandlerProps {
  onAddTrack: (track: MusicData) => void;
}

const MusicApiHandler: React.FC<MusicApiHandlerProps> = ({ onAddTrack }) => {
  useEffect(() => {
    // Create event handler for window.postMessage API (internal communication)
    const handleApiPost = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }

      try {
        if (event.data && event.data.type === 'ADD_MUSIC_TRACK') {
          processTrackData(event.data.track, (response) => {
            // Send response message if possible
            if (event.source && 'postMessage' in event.source) {
              (event.source as WindowProxy).postMessage(response, event.origin);
            }
          });
        }
      } catch (error) {
        console.error('Error processing postMessage API request:', error);
        
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

    // Process track data function (shared between both APIs)
    const processTrackData = (trackData: any, sendResponse: (response: any) => void) => {
      try {
        // Validate the track data
        if (!trackData || !trackData.title || !trackData.artist) {
          const error = { success: false, error: 'Invalid track data' };
          sendResponse(error);
          toast.error("Données de musique invalides");
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
        
        // Send a success response
        sendResponse({
          success: true,
          trackId: newTrack.id
        });
      } catch (error) {
        console.error('Error processing track data:', error);
        sendResponse({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    };

    // Setup WebSocket connection
    const setupWebSocket = () => {
      const wsUrl = window.location.protocol === 'https:' 
        ? `wss://${window.location.host}/ws` 
        : `ws://${window.location.host}/ws`;
      
      const socket = new WebSocket(wsUrl);
      
      socket.onopen = () => {
        console.log("WebSocket connection established");
        toast.success("WebSocket connecté");
      };
      
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data && data.type === 'ADD_MUSIC_TRACK') {
            processTrackData(data.track, (response) => {
              // Send response back through the WebSocket
              if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({
                  type: 'ADD_MUSIC_TRACK_RESPONSE',
                  ...response
                }));
              }
            });
          }
        } catch (error) {
          console.error('Error processing WebSocket message:', error);
          
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
              type: 'ADD_MUSIC_TRACK_RESPONSE',
              success: false,
              error: error instanceof Error ? error.message : 'Unknown error'
            }));
          }
        }
      };
      
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        toast.error("Erreur de connexion WebSocket");
      };
      
      socket.onclose = (event) => {
        console.log(`WebSocket connection closed with code ${event.code}`);
        
        // Try to reconnect after a delay
        setTimeout(() => {
          toast.info("Tentative de reconnexion WebSocket...");
          setupWebSocket();
        }, 5000);
      };
      
      // Store socket reference for cleanup
      return socket;
    };

    // Initialize APIs
    window.addEventListener('message', handleApiPost);
    const socket = setupWebSocket();

    // Cleanup function
    return () => {
      window.removeEventListener('message', handleApiPost);
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [onAddTrack]);

  // This component doesn't render anything
  return null;
};

export default MusicApiHandler;
