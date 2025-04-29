
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Separator } from "@/components/ui/separator";
import TrackDetail from "@/components/music/TrackDetail";

const Tracks = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Morceaux</h1>
          <p className="text-muted-foreground text-lg">
            Explorez vos morceaux reconnus
          </p>
        </div>
        
        <Separator />
        
        <div className="pt-4">
          <TrackDetail />
        </div>
      </div>
    </AppLayout>
  );
};

export default Tracks;
