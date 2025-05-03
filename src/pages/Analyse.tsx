
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Separator } from "@/components/ui/separator";
import MusicAnalysis from "@/components/music/MusicAnalysis";

const Analyse = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Analyse Musicale</h1>
          <p className="text-muted-foreground text-lg">
            Explorez les caractéristiques détaillées de vos morceaux
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

export default Analyse;
