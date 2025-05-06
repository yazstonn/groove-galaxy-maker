
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Favoris = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [albumArt, setAlbumArt] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a track object with minimal required fields
    const newTrack = {
      title,
      artist,
      albumArt: albumArt || undefined
    };
    
    // Use the postMessage API to add the track to the library
    window.postMessage({
      type: 'ADD_MUSIC_TRACK',
      track: newTrack
    }, window.location.origin);
    
    // Display a toast and reset the form
    toast.success("Demande d'ajout envoyée");
    setTitle("");
    setArtist("");
    setAlbumArt("");
    
    // Navigate to the music library
    setTimeout(() => {
      navigate('/musiques');
    }, 1500);
  };

  // Function to simulate WebSocket API usage
  const simulateWebSocketSend = () => {
    const demoWsUrl = window.location.protocol === 'https:' 
      ? `wss://${window.location.host}/ws` 
      : `ws://${window.location.host}/ws`;
    
    toast.info(`Simulation WebSocket: connexion à ${demoWsUrl}`);
    
    const demoTrack = {
      title: "Demo WebSocket",
      artist: "Lovable Music WebSocket",
      albumArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60"
    };

    // Simulate sending via WebSocket
    // Note: This is just a simulation for the UI demo
    // In real use, your backend would send this message via WebSocket
    setTimeout(() => {
      window.postMessage({
        type: 'ADD_MUSIC_TRACK',
        track: demoTrack
      }, window.location.origin);
      
      toast.success("Message WebSocket simulé envoyé");
      setTimeout(() => navigate('/musiques'), 1500);
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Favoris</h1>
          <p className="text-muted-foreground text-lg">
            Ajoutez vos titres favoris à votre bibliothèque
          </p>
        </div>
        
        <Tabs defaultValue="form">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Ajout manuel</TabsTrigger>
            <TabsTrigger value="api">Documentation API</TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <Card>
              <CardHeader>
                <CardTitle>Ajouter une musique</CardTitle>
                <CardDescription>
                  Ajoutez manuellement un nouveau titre à votre bibliothèque
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre</Label>
                    <Input 
                      id="title"
                      placeholder="Nom du titre" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="artist">Artiste</Label>
                    <Input 
                      id="artist"
                      placeholder="Nom de l'artiste" 
                      value={artist}
                      onChange={(e) => setArtist(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="albumArt">Image de couverture (URL)</Label>
                    <Input 
                      id="albumArt"
                      placeholder="https://exemple.com/image.jpg" 
                      value={albumArt}
                      onChange={(e) => setAlbumArt(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">Ajouter à la bibliothèque</Button>
                </CardFooter>
              </form>
            </Card>
            
            <div className="mt-4">
              <Button variant="outline" onClick={simulateWebSocketSend} className="w-full">
                Tester l'API WebSocket (simulation)
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="api">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>API WebSocket (/ws)</CardTitle>
                  <CardDescription>
                    Connectez-vous au WebSocket pour envoyer des musiques en temps réel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Pour ajouter une musique via l'API WebSocket, connectez-vous à:</p>
                  <pre className="bg-secondary p-4 rounded-md overflow-auto text-sm">
                    {`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/ws`}
                  </pre>
                  <p className="mt-4 mb-2">Puis envoyez un message JSON:</p>
                  <pre className="bg-secondary p-4 rounded-md overflow-auto text-sm">
{`{
  "type": "ADD_MUSIC_TRACK",
  "track": {
    "title": "Nom du titre",
    "artist": "Nom de l'artiste",
    "albumArt": "URL de l'image",
    // Champs optionnels:
    "bpm": 120,
    "energy": 0.7,
    // etc...
  }
}`}
                  </pre>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>API interne (postMessage)</CardTitle>
                  <CardDescription>
                    Pour les communications entre composants frontend
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Pour ajouter une musique via l'API interne:</p>
                  <pre className="bg-secondary p-4 rounded-md overflow-auto text-sm">
{`window.postMessage({
  type: 'ADD_MUSIC_TRACK',
  track: {
    title: "Nom du titre",
    artist: "Nom de l'artiste",
    albumArt: "URL de l'image",
    // Champs optionnels:
    bpm: 120,
    energy: 0.7,
    // etc...
  }
}, window.location.origin);`}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Favoris;
