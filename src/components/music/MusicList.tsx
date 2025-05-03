
import React, { useState } from "react";
import { MusicData } from "@/types/music";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { 
  Grid2x2, 
  List, 
  Music,
  ChevronDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface MusicListProps {
  tracks: MusicData[];
}

type ViewMode = "grid" | "list" | "carousel";

const MusicList: React.FC<MusicListProps> = ({ tracks }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  const handleTrackClick = (track: MusicData) => {
    // Navigate to track detail page
    navigate(`/track/${track.id}`);
  };

  const renderTrackCard = (track: MusicData) => {
    const primaryGenre = track.p_genre.sort((a, b) => b.score - a.score)[0];
    
    return (
      <Card 
        key={track.id} 
        className="glass-card overflow-hidden group transition-all hover:shadow-lg cursor-pointer"
        onClick={() => handleTrackClick(track)}
      >
        <div className="relative h-40 overflow-hidden">
          <img
            src={track.albumArt}
            alt={`${track.title} by ${track.artist}`}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
            <div>
              <h3 className="text-white font-bold text-lg">{track.title}</h3>
              <div className="text-white/80 text-sm">{track.artist}</div>
            </div>
          </div>
          {primaryGenre && (
            <Badge className="absolute top-2 right-2 bg-music-purple">{primaryGenre.genre}</Badge>
          )}
        </div>
        <CardContent className="p-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Music className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{Math.floor(track.duration_sec / 60)}:{String(track.duration_sec % 60).padStart(2, '0')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="text-xs">
                {track.bpm} BPM
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderListItem = (track: MusicData) => {
    const primaryGenre = track.p_genre.sort((a, b) => b.score - a.score)[0];
    
    return (
      <div 
        key={track.id}
        className="flex items-center gap-4 p-3 hover:bg-secondary/50 rounded-md transition-colors cursor-pointer"
        onClick={() => handleTrackClick(track)}
      >
        <div className="h-12 w-12 relative overflow-hidden rounded-md">
          <img 
            src={track.albumArt} 
            alt={`${track.title} by ${track.artist}`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{track.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
        </div>
        <div className="flex items-center gap-2">
          {primaryGenre && (
            <Badge variant="outline" className="whitespace-nowrap">{primaryGenre.genre}</Badge>
          )}
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {Math.floor(track.duration_sec / 60)}:{String(track.duration_sec % 60).padStart(2, '0')}
          </span>
        </div>
      </div>
    );
  };

  const renderItems = () => {
    switch (viewMode) {
      case 'grid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tracks.map(renderTrackCard)}
          </div>
        );

      case 'list':
        return (
          <div className="space-y-2">
            {tracks.map(renderListItem)}
          </div>
        );
        
      case 'carousel':
        return (
          <div className="w-full px-4 py-8">
            <Carousel>
              <CarouselContent>
                {tracks.map((track) => (
                  <CarouselItem key={track.id} className="md:basis-1/2 lg:basis-1/3">
                    {renderTrackCard(track)}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        );
    }
  };

  // For future implementation of infinite scroll/pagination
  const loadMoreItems = () => {
    setPage(page + 1);
    // In a real app, you would fetch more data here
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {tracks.length} morceau{tracks.length > 1 ? 'x' : ''} trouvé{tracks.length > 1 ? 's' : ''}
        </p>
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as ViewMode)}>
          <ToggleGroupItem value="grid" aria-label="View as grid">
            <Grid2x2 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="View as list">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="carousel" aria-label="View as carousel">
            <ChevronDown className="h-4 w-4 rotate-90" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <ScrollArea className={cn("pr-4", viewMode === 'list' ? "h-[70vh]" : "")}>
        {renderItems()}
      </ScrollArea>
      
      {viewMode !== 'carousel' && tracks.length > 5 && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={loadMoreItems}>
            Charger plus
          </Button>
        </div>
      )}
    </div>
  );
};

export default MusicList;
