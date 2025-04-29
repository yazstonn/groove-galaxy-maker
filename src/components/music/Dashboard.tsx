
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <MusicRecognizer />
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Playlists suggérées</h2>
              <PlaylistSection className="lg:pt-0" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <MusicAnalysis />
        </TabsContent>

        <TabsContent value="playlists">
          <PlaylistSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
