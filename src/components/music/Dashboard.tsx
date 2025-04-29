
import React from "react";
import MusicAnalysis from "./MusicAnalysis";
import PlaylistSection from "./PlaylistSection";
import MusicRecognizer from "./MusicRecognizer";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Groove Galaxy</h1>
        <p className="text-muted-foreground text-lg">
          Créez des playlists personnalisées basées sur la reconnaissance musicale
        </p>
      </div>

      <Tabs defaultValue="recognizer" className="space-y-8">
        <TabsList>
          <TabsTrigger value="recognizer">Reconnaissance</TabsTrigger>
          <TabsTrigger value="analysis">Analyse</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
        </TabsList>

        <TabsContent value="recognizer">
          <MusicRecognizer />
        </TabsContent>

        <TabsContent value="analysis">
          <MusicAnalysis />
        </TabsContent>

        <TabsContent value="playlists">
          <PlaylistSection />
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <MusicAnalysis />
        <PlaylistSection className="lg:pt-8" />
      </div>
    </div>
  );
};

export default Dashboard;
