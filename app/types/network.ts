interface Location {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

interface Network {
  id: string;
  name: string;
  company: string[];
  href: string;
  location: Location;
}

interface Station {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  free_bikes: number;
  empty_slots: number;
  timestamp: string;
}

interface NetworkDetails {
  network: {
    stations: Station[];
  } & Network;
}
