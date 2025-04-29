
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import MusicAnalysis from "@/components/music/MusicAnalysis";
import { Separator } from "@/components/ui/separator";

const Analysis = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Analyse</h1>
          <p className="text-muted-foreground text-lg">
            Analyse détaillée de votre musique
          </p>
        </div>
        
        <Separator />
        
        <div className="pt-4">
          <MusicAnalysis />
        </div>
      </div>
    </AppLayout>
  );
};

export default Analysis;
