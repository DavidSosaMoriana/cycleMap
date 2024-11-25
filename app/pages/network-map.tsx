"use client";

import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react";

export function NetworkMap() {
  return (
    <>
      <div className="absolute left-4 top-4 z-10">
        <Button variant="secondary" className="gap-2">
          <MapPin className="h-4 w-4" />
          Near me
        </Button>
      </div>
      <div className="h-full w-full bg-muted" />
    </>
  );
}
