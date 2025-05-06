
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Favoris</h1>
          <p className="text-muted-foreground text-lg">
            Ajoutez vos titres favoris à votre bibliothèque
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ajouter une musique</CardTitle>
              <CardDescription>
                Utilisez l'API pour ajouter un nouveau titre à votre bibliothèque
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
          
          <Card>
            <CardHeader>
              <CardTitle>Documentation API</CardTitle>
              <CardDescription>
                Comment utiliser l'API pour ajouter des titres
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Pour ajouter une musique via l'API, utilisez le code suivant:</p>
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
      </div>
    </AppLayout>
  );
};

export default Favoris;
