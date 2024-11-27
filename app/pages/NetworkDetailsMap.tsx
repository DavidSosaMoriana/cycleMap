'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Station {
  id: string;
  name: string;
  free_bikes: number;
  empty_slots: number;
  latitude: number;
  longitude: number;
}

interface NetworkDetailsMapProps {
  stations: Station[];
  center: [number, number];
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

export function NetworkDetailsMap({ stations, center }: NetworkDetailsMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: center,
      zoom: 12
    });

    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, 'top-right');

    const bounds = new mapboxgl.LngLatBounds();
    stations.forEach((station) => {
      bounds.extend([station.longitude, station.latitude]);
    });

    map.current.fitBounds(bounds, {
      padding: 50,
      maxZoom: 15
    });

    return () => {
      map.current?.remove();
    };
  }, [center, stations]);

  useEffect(() => {
    if (!map.current) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    stations.forEach((station) => {
      const el = document.createElement('div');
      el.className = 'station-marker';
      el.style.width = '12px';
      el.style.height = '12px';
      el.style.backgroundColor = '#FF6B3D';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 0 0 2px rgba(255, 107, 61, 0.2)';
      el.style.cursor = 'pointer';

      const popup = new mapboxgl.Popup({
        offset: 8,
        closeButton: false,
        className: 'station-popup'
      }).setHTML(
        `<div class="p-3">
          <h3 class="font-semibold text-gray-900">${station.name}</h3>
          <div class="mt-2 space-y-1 text-sm text-gray-600">
            <p>Free bikes: ${station.free_bikes}</p>
            <p>Empty slots: ${station.empty_slots}</p>
          </div>
        </div>`
      );

      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'center'
      })
        .setLngLat([station.longitude, station.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  }, [stations]);

  return (
    <>
      <style>
        {`
          .station-marker {
            transition: transform 0.2s;
          }
          .station-marker:hover {
            transform: scale(1.2);
          }
          .station-popup .mapboxgl-popup-content {
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 0;
          }
        `}
      </style>
      <div ref={mapContainer} className="w-full h-full" />
    </>
  );
}