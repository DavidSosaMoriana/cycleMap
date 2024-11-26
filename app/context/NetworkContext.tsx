/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { createContext, useContext, useState, useEffect } from 'react';

interface NetworkContextType {
  networks: Network[];
  loading: boolean;
  error: string | null;
}

const NetworkContext = createContext<NetworkContextType>({
  networks: [],
  loading: false,
  error: null,
});

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [networks, setNetworks] = useState<Network[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNetworks() {
      try {
        const response = await fetch('http://api.citybik.es/v2/networks');
        const data = await response.json();
        setNetworks(data.networks);
      } catch (err) {
        setError('Failed to fetch networks');
      } finally {
        setLoading(false);
      }
    }

    fetchNetworks();
  }, []);

  return (
    <NetworkContext.Provider value={{ networks, loading, error }}>
      {children}
    </NetworkContext.Provider>
  );
}

export const useNetwork = () => useContext(NetworkContext);