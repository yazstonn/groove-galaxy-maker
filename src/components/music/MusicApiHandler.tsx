import React, { useEffect } from "react";
import { MusicData } from "@/types/music";
import { toast } from "sonner";

interface MusicApiHandlerProps {
  onAddTrack: (track: MusicData) => void;
}

// Définir un type personnalisé pour notre événement fetch car FetchEvent n'est pas disponible
interface CustomFetchEvent {
  request: {
    url: string;
    method: string;
    json: () => Promise<any>;
  };
  respondWith: (response: Response) => void;
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

    // Create HTTP endpoint listener
    const createHttpEndpoint = () => {
      const endpoint = '/addMusic';
      
      // Modifié pour ne pas utiliser FetchEvent
      const handleFetch = async (request: Request): Promise<Response> => {
        try {
          const requestData = await request.json();
          const responseData = await new Promise(resolve => {
            processTrackData(requestData, resolve);
          });
          
          return new Response(JSON.stringify(responseData), {
            headers: { 'Content-Type': 'application/json' },
            status: (responseData as any).success ? 200 : 400
          });
        } catch (error) {
          console.error('Error processing HTTP request:', error);
          return new Response(
            JSON.stringify({
              success: false,
              error: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
              headers: { 'Content-Type': 'application/json' },
              status: 400
            }
          );
        }
      };
      
      // Pour les navigateurs qui supportent service workers
      // Note: nous n'utilisons plus FetchEvent directement
      if ('serviceWorker' in navigator) {
        window.addEventListener('fetch', (e: any) => {
          if (e.request && e.request.url && e.request.url.endsWith(endpoint) && e.request.method === 'POST') {
            e.respondWith(handleFetch(e.request));
          }
        });
      }
      
      // Pour l'accès API direct via l'API fetch
      const originalFetch = window.fetch;
      window.fetch = async function(input, init) {
        const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input instanceof Request ? input.url : '';
        
        if (url.endsWith(endpoint) && (init?.method === 'POST' || input instanceof Request && input.method === 'POST')) {
          try {
            const request = input instanceof Request ? input : new Request(url, init);
            return handleFetch(request);
          } catch (error) {
            console.error('Error in fetch override:', error);
            return new Response(
              JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
              }),
              {
                headers: { 'Content-Type': 'application/json' },
                status: 400
              }
            );
          }
        }
        
        // Otherwise proceed with original fetch
        return originalFetch.apply(this, [input, init]);
      };
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

    // Initialize both APIs
    window.addEventListener('message', handleApiPost);
    createHttpEndpoint();

    // Cleanup function
    return () => {
      window.removeEventListener('message', handleApiPost);
    };
  }, [onAddTrack]);

  // This component doesn't render anything
  return null;
};

export default MusicApiHandler;
