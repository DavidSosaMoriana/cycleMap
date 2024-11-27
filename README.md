

## CycleMap 🚲

A React application built with Next.js that helps users discover bike-sharing networks worldwide using the CityBikes API.

## Features
- View bike networks on an interactive map
- Search networks by name
- Filter networks by country
- View detailed network information including:
    - Station locations
    - Real-time bike availability
    - Empty slots per station
    - Sortable station list
    - Station-specific information on map markers

## Tech Stack
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Mapping**: Mapbox GL JS
- **State Management**: React Context
- **API**: CityBikes API

- ##Project Structure

```bash
├── app/
│   ├── page.tsx                # Main page
│   └── networks/
│       └── [id]/              # Network details page
├── components/
│   ├── Logo.tsx               # Logo component
│   ├── NetworkList.tsx        # Network listing component
│   ├── NetworkDetails.tsx     # Network details view
│   ├── Pagination.tsx         # Pagination component
│   ├── SearchFilters.tsx      # Search and filter components
│   └── Map.tsx               # Mapbox implementation
├── context/
│   └── NetworkContext.tsx     # Network data management
├── types/
│   └── index.ts              # TypeScript definitions
└── data/
    └── countries.json        # Countries data
```

##Setup Intructions

1. Clone the repository
2. Install dependencies
```bash
npm install
```
3. Create .env.local and add you Mapbox token:
```bash
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here
```
4.Run development server
```bash
npm run dev
```

##Key Features Implementation

##Network List View
- Display all bike networks with pagination
- Shows network details including location and company info
- Implements search and country filtering
- Hover states and interactive elements

##Network Details View
- Sidebar layout with network information
- Interactive map showing all stations
- Sortable station list
- Real-time availability data
- Station markers with popup information

##Map Integration

- Custom markers for stations
- Interactive popups
- Automatic bounds fittins
- Responsive zoom levels
- Custom styling

##Api Integration

Uses CityBiks API endpoints:
  - /networks - List all networks
  - /networks/{network_id} - Get specific network details

##Styling

- Uses Tailwind CSS for styling
- Custom components from shadcn/ui
- Consistent color scheme:
   - Primary: Indigo (#4F46E5)
   - Accent: Orange (#FF6B3D)
   - Various gray scales for text and borders
