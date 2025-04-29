
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import PlaylistSection from "@/components/music/PlaylistSection";
import { Separator } from "@/components/ui/separator";

const Playlists = () => {
  return (
    <AppLayout>
      <div className="space-y-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Playlists</h1>
          <p className="text-muted-foreground text-lg">
            Explorez et gérez vos playlists personnalisées
          </p>
        </div>
        
        <Separator />
        
        <div className="space-y-12">
          <div className="pt-4">
            <PlaylistSection suggested={true} />
          </div>
          
          <div className="pt-4">
            <PlaylistSection />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Playlists;
