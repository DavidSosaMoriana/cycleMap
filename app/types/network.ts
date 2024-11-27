interface Location {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

export interface Network {
  id: string;
  name: string;
  company: string[];
  href: string;
  location: Location;
}

export interface Country {
  code: string;
  name: string;
}
