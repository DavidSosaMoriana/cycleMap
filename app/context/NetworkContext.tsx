/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Network } from "../types/network";

interface NetworkContextType {
  networks: Network[];
  loading: boolean;
  error: string | null;
  filteredNetworks: Network[];
}

const NetworkContext = createContext<NetworkContextType>({
  networks: [],
  loading: false,
  error: null,
  filteredNetworks: [],
});

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [networks, setNetworks] = useState<Network[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const countryCode = searchParams.get("country");

  useEffect(() => {
    async function fetchNetworks() {
      try {
        const response = await fetch("http://api.citybik.es/v2/networks");
        const data = await response.json();
        setNetworks(data.networks);
      } catch (err) {
        setError("Failed to fetch networks");
      } finally {
        setLoading(false);
      }
    }

    fetchNetworks();
  }, []);

  const filteredNetworks = networks.filter((network) => {
    const matchesSearch = search
      ? network.name.toLowerCase().includes(search.toLowerCase()) ||
        network.location.city.toLowerCase().includes(search.toLowerCase())
      : true;

    // Match country code against the network's location country code
    const matchesCountry = countryCode
      ? network.location.country === countryCode
      : true;

    return matchesSearch && matchesCountry;
  });

  return (
    <NetworkContext.Provider
      value={{ networks, loading, error, filteredNetworks }}
    >
      {children}
    </NetworkContext.Provider>
  );
}

export const useNetwork = () => useContext(NetworkContext);
