
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import PlaylistSection from "@/components/music/PlaylistSection";
import { Separator } from "@/components/ui/separator";

const Playlists = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Mes Playlists</h1>
          <p className="text-muted-foreground text-lg">
            Explorez et gérez vos playlists personnalisées
          </p>
        </div>
        
        <Separator />
        
        <div className="pt-4">
          <PlaylistSection />
        </div>
      </div>
    </AppLayout>
  );
};

export default Playlists;
