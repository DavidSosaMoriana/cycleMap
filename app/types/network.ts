export interface Location {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Company {
  name: string;
  id?: string;
}

export interface Network {
  id: string;
  name: string;
  location: Location;
  companies: Company[];
}

export interface Station {
  id: string;
  name: string;
  free_bikes: number;
  empty_slots: number;
  latitude: number;
  longitude: number;
}

export interface NetworkDetails extends Network {
  stations: Station[];
}
