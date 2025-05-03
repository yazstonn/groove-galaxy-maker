
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Common genres and moods based on music data
const commonGenres = [
  "Pop", "Rock", "Hip-Hop", "R&B", "Electronic", "Jazz", "Classical", "Country",
  "Folk", "Indie", "Metal", "Blues", "Reggae", "Funk", "Soul", "Ambient"
];

const commonMoods = [
  "Happy", "Sad", "Energetic", "Relaxed", "Angry", "Calm", "Excited", "Nostalgic",
  "Romantic", "Melancholic", "Peaceful", "Intense", "Dreamy", "Groovy", "Epic", "Reflective"
];

const commonInstruments = [
  "Guitar", "Piano", "Drums", "Bass", "Synthesizer", "Violin", "Saxophone", "Trumpet",
  "Flute", "Cello", "Harp", "Clarinet", "Banjo", "Harmonica", "Organ", "Ukulele"
];

interface FiltersType {
  genres: string[];
  moods: string[];
  bpmRange: [number, number];
  energy: [number, number];
  instruments: string[];
}

interface MusicFiltersProps {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
}

const MusicFilters = ({ filters, setFilters }: MusicFiltersProps) => {
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  const handleGenreChange = (genre: string, checked: boolean) => {
    setFilters(prev => {
      const newGenres = checked 
        ? [...prev.genres, genre]
        : prev.genres.filter(g => g !== genre);
      
      // Update active filters count
      updateActiveFiltersCount({ ...prev, genres: newGenres });
      
      return { ...prev, genres: newGenres };
    });
  };
  
  const handleMoodChange = (mood: string, checked: boolean) => {
    setFilters(prev => {
      const newMoods = checked 
        ? [...prev.moods, mood]
        : prev.moods.filter(m => m !== mood);
      
      // Update active filters count
      updateActiveFiltersCount({ ...prev, moods: newMoods });
      
      return { ...prev, moods: newMoods };
    });
  };
  
  const handleInstrumentChange = (instrument: string, checked: boolean) => {
    setFilters(prev => {
      const newInstruments = checked 
        ? [...prev.instruments, instrument]
        : prev.instruments.filter(i => i !== instrument);
      
      // Update active filters count
      updateActiveFiltersCount({ ...prev, instruments: newInstruments });
      
      return { ...prev, instruments: newInstruments };
    });
  };
  
  const handleBpmChange = (value: number[]) => {
    setFilters(prev => {
      const newBpmRange = [value[0], value[1]] as [number, number];
      
      // Update active filters count
      updateActiveFiltersCount({ ...prev, bpmRange: newBpmRange });
      
      return { ...prev, bpmRange: newBpmRange };
    });
  };
  
  const handleEnergyChange = (value: number[]) => {
    setFilters(prev => {
      const newEnergy = [value[0], value[1]] as [number, number];
      
      // Update active filters count
      updateActiveFiltersCount({ ...prev, energy: newEnergy });
      
      return { ...prev, energy: newEnergy };
    });
  };
  
  const updateActiveFiltersCount = (filters: FiltersType) => {
    let count = 0;
    
    if (filters.genres.length > 0) count++;
    if (filters.moods.length > 0) count++;
    if (filters.instruments.length > 0) count++;
    if (filters.bpmRange[0] > 0 || filters.bpmRange[1] < 200) count++;
    if (filters.energy[0] > 0 || filters.energy[1] < 1) count++;
    
    setActiveFiltersCount(count);
  };
  
  const resetFilters = () => {
    setFilters({
      genres: [],
      moods: [],
      bpmRange: [0, 200],
      energy: [0, 1],
      instruments: []
    });
    setActiveFiltersCount(0);
  };
  
  // BPM formatter for slider
  const formatBpm = (value: number) => `${value} BPM`;

  return (
    <div className="bg-card p-4 rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Filtres</h3>
        {activeFiltersCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="h-8 text-sm"
          >
            Réinitialiser
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        )}
      </div>
      
      <Accordion type="multiple" defaultValue={["genres", "moods", "bpm", "energy"]} className="space-y-2">
        <AccordionItem value="genres" className="border-b-0">
          <AccordionTrigger className="py-2">
            <span className="text-sm font-medium">Genres</span>
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-44">
              <div className="space-y-1.5">
                {commonGenres.map(genre => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox
                      id={`genre-${genre}`}
                      checked={filters.genres.includes(genre)}
                      onCheckedChange={(checked) => 
                        handleGenreChange(genre, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`genre-${genre}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {genre}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="moods" className="border-b-0">
          <AccordionTrigger className="py-2">
            <span className="text-sm font-medium">Ambiances</span>
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-44">
              <div className="space-y-1.5">
                {commonMoods.map(mood => (
                  <div key={mood} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mood-${mood}`}
                      checked={filters.moods.includes(mood)}
                      onCheckedChange={(checked) => 
                        handleMoodChange(mood, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`mood-${mood}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {mood}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="instruments" className="border-b-0">
          <AccordionTrigger className="py-2">
            <span className="text-sm font-medium">Instruments</span>
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-44">
              <div className="space-y-1.5">
                {commonInstruments.map(instrument => (
                  <div key={instrument} className="flex items-center space-x-2">
                    <Checkbox
                      id={`instrument-${instrument}`}
                      checked={filters.instruments.includes(instrument)}
                      onCheckedChange={(checked) => 
                        handleInstrumentChange(instrument, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`instrument-${instrument}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {instrument}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="bpm" className="border-b-0">
          <AccordionTrigger className="py-2">
            <span className="text-sm font-medium">BPM (Tempo)</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 px-2">
              <Slider 
                value={[filters.bpmRange[0], filters.bpmRange[1]]} 
                min={40}
                max={200}
                step={1}
                onValueChange={handleBpmChange}
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{formatBpm(filters.bpmRange[0])}</span>
                <span>{formatBpm(filters.bpmRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="energy" className="border-b-0">
          <AccordionTrigger className="py-2">
            <span className="text-sm font-medium">Énergie</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 px-2">
              <Slider 
                value={[filters.energy[0], filters.energy[1]]} 
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleEnergyChange}
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Calme</span>
                <span>Énergique</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MusicFilters;
