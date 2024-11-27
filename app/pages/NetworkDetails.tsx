"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { NetworkStationsList } from "./NetworkStationsList";
import { NetworkDetailsMap } from "./NetworkDetailsMap";
import { Building2, MapPin } from "lucide-react";

interface NetworkDetailsProps {
  networkId: string;
}

interface Station {
  id: string;
  name: string;
  free_bikes: number;
  empty_slots: number;
  latitude: number;
  longitude: number;
}

interface NetworkData {
  network: {
    name: string;
    location: {
      city: string;
      country: string;
    };
    company: string[];
    stations: Station[];
  };
}

export function NetworkDetails({ networkId }: NetworkDetailsProps) {
  const [networkData, setNetworkData] = useState<NetworkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNetworkDetails() {
      try {
        const response = await fetch(
          `http://api.citybik.es/v2/networks/${networkId}`
        );
        const data = await response.json();
        setNetworkData(data);
      } catch (err) {
        setError("Failed to fetch network details");
      } finally {
        setLoading(false);
      }
    }

    fetchNetworkDetails();
  }, [networkId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!networkData) return <div>No data found</div>;

  const { network } = networkData;

  return (
    <div className="min-h-screen bg-indigo-900">
      <div className="relative">
        <Link
          href="/"
          className="absolute top-2 left-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>

        <div className="bg-indigo-900 text-white px-4 sm:px-6 lg:px-8 py-8 space-y-4">
          <h1 className="text-3xl font-bold px-8">{network.name}</h1>
          <div className="flex items-center gap-2 px-8">
            <MapPin className="h-4 w-4" />
            <span>
              {network.location.city}, {network.location.country}
            </span>
          </div>
          <div className="flex items-center gap-2 px-8">
            <Building2 className="h-4 w-4" />
            <div className="flex items-center gap-1.5">
              <span className="text-sm">{network.company.join(", ")}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-8">
            <div className="text-sm">
              <span className="font-medium">{network.stations.length}</span>{" "}
              stations
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
          <NetworkStationsList stations={network.stations} />
          <div className="rounded-lg overflow-hidden border border-gray-200 h-[600px]">
            <NetworkDetailsMap
              stations={network.stations}
              center={[
                network.stations[0].longitude,
                network.stations[0].latitude,
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
