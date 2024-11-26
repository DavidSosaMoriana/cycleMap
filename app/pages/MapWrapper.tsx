"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./network-map"), {
  ssr: false,
  loading: () => <div className="w-full h-[calc(100vh-4rem)] bg-gray-100" />,
});

export default function MapWrapper() {
  return (
    <div className="relative h-full">
      <div className="absolute top-4 left-4 z-10">
        <button className="flex items-center gap-2 bg-indigo-700 text-white px-4 py-2 rounded-full hover:bg-indigo-800 transition-colors shadow-sm">
          <span className="text-lg leading-none">♢</span>
          <span className="text-sm font-medium">Near me</span>
        </button>
      </div>
      <Map />
    </div>
  );
}
