
import React from "react";
import { MusicData } from "@/types/music";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Scatter,
  ScatterChart,
  ZAxis
} from "recharts";
import { PieChart as PieChartIcon, BarChartHorizontal, BarChart as BarChartIcon, ScatterChart as ScatterChartIcon, LineChart as LineChartIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MusicStatsProps {
  tracks: MusicData[];
}

const MusicStats: React.FC<MusicStatsProps> = ({ tracks }) => {
  // Calculate genre distribution
  const genreDistribution = React.useMemo(() => {
    const genreCounts: Record<string, number> = {};
    
    tracks.forEach(track => {
      // Get top genre for each track
      const topGenre = track.p_genre.reduce((prev, current) => 
        prev.score > current.score ? prev : current, { genre: "Unknown", score: 0 });
      
      genreCounts[topGenre.genre] = (genreCounts[topGenre.genre] || 0) + 1;
    });
    
    return Object.entries(genreCounts).map(([genre, count]) => ({
      name: genre,
      value: count
    }));
  }, [tracks]);

  // Calculate mood distribution
  const moodDistribution = React.useMemo(() => {
    const moodCounts: Record<string, number> = {};
    
    tracks.forEach(track => {
      // Get top mood for each track
      const topMood = track.p_mood.reduce((prev, current) => 
        prev.score > current.score ? prev : current, { mood: "Unknown", score: 0 });
      
      moodCounts[topMood.mood] = (moodCounts[topMood.mood] || 0) + 1;
    });
    
    return Object.entries(moodCounts).map(([mood, count]) => ({
      name: mood,
      value: count
    }));
  }, [tracks]);

  // Calculate BPM distribution
  const bpmDistribution = React.useMemo(() => {
    const bpmRanges = [
      { range: "60-80", min: 60, max: 80, count: 0 },
      { range: "81-100", min: 81, max: 100, count: 0 },
      { range: "101-120", min: 101, max: 120, count: 0 },
      { range: "121-140", min: 121, max: 140, count: 0 },
      { range: "141-160", min: 141, max: 160, count: 0 },
      { range: "160+", min: 161, max: 999, count: 0 },
    ];

    tracks.forEach(track => {
      const bpm = track.bpm;
      const range = bpmRanges.find(r => bpm >= r.min && bpm <= r.max);
      if (range) {
        range.count++;
      }
    });

    return bpmRanges.map(range => ({
      name: range.range,
      value: range.count
    }));
  }, [tracks]);

  // Calculate average energy by genre
  const energyByGenre = React.useMemo(() => {
    const genreEnergySums: Record<string, { total: number, count: number }> = {};
    
    tracks.forEach(track => {
      // Get top genre for each track
      const topGenre = track.p_genre.reduce((prev, current) => 
        prev.score > current.score ? prev : current, { genre: "Unknown", score: 0 });
      
      if (!genreEnergySums[topGenre.genre]) {
        genreEnergySums[topGenre.genre] = { total: 0, count: 0 };
      }
      
      genreEnergySums[topGenre.genre].total += track.energy;
      genreEnergySums[topGenre.genre].count += 1;
    });
    
    return Object.entries(genreEnergySums)
      .map(([genre, { total, count }]) => ({
        name: genre,
        energy: (total / count) * 100 // Convert to percentage
      }))
      .sort((a, b) => b.energy - a.energy);
  }, [tracks]);

  // Calculate instrument prevalence across all tracks
  const instrumentPrevalence = React.useMemo(() => {
    const instrumentScores: Record<string, { total: number, count: number }> = {};
    
    tracks.forEach(track => {
      track.instrument_scores.forEach(item => {
        if (!instrumentScores[item.instrument]) {
          instrumentScores[item.instrument] = { total: 0, count: 0 };
        }
        
        instrumentScores[item.instrument].total += item.score;
        instrumentScores[item.instrument].count += 1;
      });
    });
    
    return Object.entries(instrumentScores)
      .map(([instrument, { total, count }]) => ({
        name: instrument,
        score: (total / count) * 100 // Convert to percentage
      }))
      .sort((a, b) => b.score - a.score);
  }, [tracks]);

  // Energy vs. BPM scatter plot data
  const energyBpmData = React.useMemo(() => {
    return tracks.map(track => ({
      name: track.title,
      energy: track.energy * 100, // Convert to percentage
      bpm: track.bpm,
      duration: track.duration_sec / 60 // Convert to minutes
    }));
  }, [tracks]);

  // Duration distribution
  const durationDistribution = React.useMemo(() => {
    const durationRanges = [
      { range: "< 2min", min: 0, max: 120, count: 0 },
      { range: "2-3min", min: 121, max: 180, count: 0 },
      { range: "3-4min", min: 181, max: 240, count: 0 },
      { range: "4-5min", min: 241, max: 300, count: 0 },
      { range: "5min+", min: 301, max: 9999, count: 0 },
    ];

    tracks.forEach(track => {
      const duration = track.duration_sec;
      const range = durationRanges.find(r => duration >= r.min && duration <= r.max);
      if (range) {
        range.count++;
      }
    });

    return durationRanges.map(range => ({
      name: range.range,
      value: range.count
    }));
  }, [tracks]);

  // Colors for charts
  const COLORS = ['#9b87f5', '#7E69AB', '#F97316', '#0EA5E9', '#D6BCFA', '#8E9196'];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="genres">Genres & Ambiances</TabsTrigger>
          <TabsTrigger value="audio">Caractéristiques Audio</TabsTrigger>
          <TabsTrigger value="instruments">Instrumentation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Distribution des Genres</CardTitle>
                  <CardDescription>Répartition par genre musical</CardDescription>
                </div>
                <PieChartIcon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <ChartContainer 
                  config={{
                    pop: { color: "#9b87f5" },
                    rock: { color: "#7E69AB" },
                    hiphop: { color: "#F97316" },
                    electronic: { color: "#0EA5E9" },
                    jazz: { color: "#D6BCFA" },
                  }}
                  className="aspect-square h-80"
                >
                  <PieChart>
                    <Pie
                      data={genreDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {genreDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend content={<ChartLegendContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Distribution des BPM</CardTitle>
                  <CardDescription>Répartition par tempo</CardDescription>
                </div>
                <BarChartIcon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <ChartContainer 
                  config={{
                    bpm: { theme: { light: "#9b87f5", dark: "#7E69AB" } },
                  }}
                  className="aspect-square h-80"
                >
                  <BarChart data={bpmDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" name="Nombre de morceaux" fill="var(--color-bpm)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Énergie vs. BPM</CardTitle>
                <CardDescription>Corrélation entre énergie et tempo</CardDescription>
              </div>
              <ScatterChartIcon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-0">
              <ChartContainer 
                config={{
                  energy: { color: "#F97316" },
                }}
                className="h-80"
              >
                <ScatterChart margin={{ top: 20, right: 30, bottom: 10, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="bpm" 
                    name="BPM" 
                    label={{ value: "BPM", position: "insideBottomRight", offset: -5 }} 
                  />
                  <YAxis 
                    dataKey="energy" 
                    name="Énergie" 
                    unit="%" 
                    label={{ value: "Énergie (%)", angle: -90, position: "insideLeft" }} 
                  />
                  <ZAxis dataKey="duration" name="Durée" unit=" min" />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Morceaux" data={energyBpmData} fill="#F97316" />
                </ScatterChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="genres" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Distribution des Genres</CardTitle>
                  <CardDescription>Répartition par genre musical</CardDescription>
                </div>
                <PieChartIcon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <ChartContainer 
                  config={{
                    pop: { color: "#9b87f5" },
                    rock: { color: "#7E69AB" },
                    hiphop: { color: "#F97316" },
                    electronic: { color: "#0EA5E9" },
                    jazz: { color: "#D6BCFA" },
                  }}
                  className="aspect-square h-80"
                >
                  <PieChart>
                    <Pie
                      data={genreDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {genreDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend content={<ChartLegendContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Distribution des Ambiances</CardTitle>
                  <CardDescription>Répartition par ambiance musicale</CardDescription>
                </div>
                <PieChartIcon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <ChartContainer 
                  config={{
                    happy: { color: "#F97316" },
                    sad: { color: "#0EA5E9" },
                    energetic: { color: "#9b87f5" },
                    calm: { color: "#D6BCFA" },
                  }}
                  className="aspect-square h-80"
                >
                  <PieChart>
                    <Pie
                      data={moodDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {moodDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend content={<ChartLegendContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Énergie Moyenne par Genre</CardTitle>
                <CardDescription>Niveau d'énergie moyen par genre</CardDescription>
              </div>
              <BarChartHorizontal className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-0">
              <ChartContainer 
                config={{
                  energy: { theme: { light: "#9b87f5", dark: "#7E69AB" } },
                }}
                className="h-80"
              >
                <BarChart
                  layout="vertical"
                  data={energyByGenre.slice(0, 8)}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} unit="%" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="energy" name="Énergie" fill="var(--color-energy)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audio" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Distribution des BPM</CardTitle>
                  <CardDescription>Répartition par tempo</CardDescription>
                </div>
                <BarChartIcon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <ChartContainer 
                  config={{
                    bpm: { theme: { light: "#9b87f5", dark: "#7E69AB" } },
                  }}
                  className="aspect-square h-80"
                >
                  <BarChart data={bpmDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" name="Nombre de morceaux" fill="var(--color-bpm)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Durée des Morceaux</CardTitle>
                  <CardDescription>Distribution par durée</CardDescription>
                </div>
                <BarChartIcon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <ChartContainer 
                  config={{
                    duration: { theme: { light: "#F97316", dark: "#F97316" } },
                  }}
                  className="aspect-square h-80"
                >
                  <BarChart data={durationDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" name="Nombre de morceaux" fill="var(--color-duration)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Énergie vs. BPM</CardTitle>
                <CardDescription>Corrélation entre énergie et tempo</CardDescription>
              </div>
              <ScatterChartIcon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-0">
              <ChartContainer 
                config={{
                  energy: { color: "#F97316" },
                }}
                className="h-80"
              >
                <ScatterChart margin={{ top: 20, right: 30, bottom: 10, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="bpm" 
                    name="BPM" 
                    label={{ value: "BPM", position: "insideBottomRight", offset: -5 }} 
                  />
                  <YAxis 
                    dataKey="energy" 
                    name="Énergie" 
                    unit="%" 
                    label={{ value: "Énergie (%)", angle: -90, position: "insideLeft" }} 
                  />
                  <ZAxis dataKey="duration" name="Durée" unit=" min" />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Morceaux" data={energyBpmData} fill="#F97316" />
                </ScatterChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instruments" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Prévalence des Instruments</CardTitle>
                <CardDescription>Instruments les plus utilisés</CardDescription>
              </div>
              <BarChartHorizontal className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-0">
              <ChartContainer 
                config={{
                  score: { theme: { light: "#0EA5E9", dark: "#0EA5E9" } },
                }}
                className="h-80"
              >
                <BarChart
                  layout="vertical"
                  data={instrumentPrevalence}
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} unit="%" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="score" name="Score" fill="var(--color-score)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Empreinte Instrumentale</CardTitle>
                <CardDescription>Distribution des instruments</CardDescription>
              </div>
              <LineChartIcon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-0">
              <ChartContainer 
                config={{
                  score: { theme: { light: "#9b87f5", dark: "#9b87f5" } },
                }}
                className="h-80"
              >
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={instrumentPrevalence}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Prévalence" dataKey="score" stroke="#9b87f5" fill="#9b87f5" fillOpacity={0.6} />
                  <Legend />
                  <ChartTooltip />
                </RadarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MusicStats;
