"use client";

import { Building2, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import { Network } from "../types/network";
import { Badge } from "@/components/ui/badge";

interface NetworkListProps {
  networks?: Network[];
}

export function NetworkList({ networks = [] }: NetworkListProps) {
  return (
    <div className="space-y-4">
      {networks.map((network) => (
        <Link
          key={network.id}
          href={`/network/${network.id}`}
          className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-semibold text-lg">{network.name}</h2>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                <span>
                  {network.location.city}, {network.location.country}
                </span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <Building2 className="h-4 w-4" />
                <div className="flex items-center gap-2">
                  {network.companies.slice(0, 2).map((company, i) => (
                    <span key={i}>{company.name}</span>
                  ))}
                  {network.companies.length > 2 && (
                    <Badge variant="secondary">
                      +{network.companies.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Link>
      ))}
    </div>
  );
}
