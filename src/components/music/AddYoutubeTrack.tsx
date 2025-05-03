
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Youtube } from "lucide-react";
import { toast } from "sonner";
import { MusicData } from "@/types/music";

interface AddYoutubeTrackProps {
  onAddTrack?: (track: MusicData) => void;
}

interface YouTubeFormData {
  url: string;
  title: string;
  artist: string;
  description?: string;
}

const extractYoutubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const AddYoutubeTrack: React.FC<AddYoutubeTrackProps> = ({ onAddTrack }) => {
  const [open, setOpen] = useState(false);
  const [previewId, setPreviewId] = useState<string | null>(null);
  
  const form = useForm<YouTubeFormData>({
    defaultValues: {
      url: "",
      title: "",
      artist: "",
      description: ""
    }
  });
  
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    const youtubeId = extractYoutubeId(url);
    setPreviewId(youtubeId);
    form.setValue("url", url);
  };

  const onSubmit = (data: YouTubeFormData) => {
    const youtubeId = extractYoutubeId(data.url);
    
    if (!youtubeId) {
      toast.error("URL YouTube invalide");
      return;
    }
    
    // Create a new track from the YouTube data
    const newTrack: MusicData = {
      id: `yt-${youtubeId}`,
      title: data.title,
      artist: data.artist,
      albumArt: `https://img.youtube.com/vi/${youtubeId}/0.jpg`,
      p_genre: [{ genre: "Non classé", score: 1 }],
      p_mood: [{ mood: "Non classé", score: 1 }],
      p_dance: [{ danceability: "Medium", score: 0.5 }],
      bpm: 120, // Default BPM
      instrument_scores: [
        { instrument: "Non déterminé", score: 1 },
      ],
      energy: 0.5,
      loudness: -10,
      duration_sec: 180, // Default duration
      youtubeId: youtubeId
    };
    
    if (onAddTrack) {
      onAddTrack(newTrack);
      toast.success(`${data.title} ajouté à votre bibliothèque`);
      setOpen(false);
      form.reset();
      setPreviewId(null);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Youtube className="h-4 w-4" />
          Ajouter depuis YouTube
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Ajouter une musique depuis YouTube</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL YouTube</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://www.youtube.com/watch?v=..." 
                      {...field}
                      onChange={handleUrlChange}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {previewId && (
              <div className="aspect-video rounded-md overflow-hidden bg-secondary mb-4">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${previewId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input placeholder="Titre de la musique" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="artist"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artiste</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom de l'artiste" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optionnelle)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Description de la musique..."
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => {
                setOpen(false);
                form.reset();
                setPreviewId(null);
              }}>
                Annuler
              </Button>
              <Button type="submit">Ajouter</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddYoutubeTrack;
