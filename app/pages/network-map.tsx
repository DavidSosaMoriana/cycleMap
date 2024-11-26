"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNetwork } from "../context/NetworkContext";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { networks } = useNetwork();

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [0, 20],
      zoom: 2,
    });

    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, "top-right");

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current || !networks.length) return;

    // Clear existing markers
    const markers = document.getElementsByClassName("mapboxgl-marker");
    while (markers[0]) {
      markers[0].remove();
    }

    networks.forEach((network) => {
      // Create custom marker element
      const el = document.createElement("div");
      el.className = "custom-marker";
      el.style.width = "12px";
      el.style.height = "12px";
      el.style.backgroundColor = "#FF6B3D";
      el.style.borderRadius = "50%";
      el.style.border = "2px solid white";
      el.style.boxShadow = "0 0 0 2px rgba(255, 107, 61, 0.2)";
      el.style.cursor = "pointer";

      const popup = new mapboxgl.Popup({
        offset: 8,
        closeButton: false,
        className: "custom-popup",
      }).setHTML(
        `<div class="p-2">
          <h3 class="font-semibold text-gray-900">${network.name}</h3>
          <p class="text-gray-600 text-sm">${network.location.city}, ${network.location.country}</p>
        </div>`
      );

      // Add marker to map
      new mapboxgl.Marker({
        element: el,
        anchor: "center",
      })
        .setLngLat([network.location.longitude, network.location.latitude])
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [networks]);

  return (
    <>
      <style>
        {`
          .mapboxgl-popup-content {
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 0;
          }

          .custom-marker {
            transition: transform 0.2s;
          }

          .custom-marker:hover {
            transform: scale(1.2);
          }

          .mapboxgl-popup {
            z-index: 1;
          }
        `}
      </style>
      <div ref={mapContainer} className="w-full h-full" />
    </>
  );
}
