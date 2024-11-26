"use client";

import { useNetwork } from "../context/NetworkContext";
import { MapPin, Building2, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Pagination } from "./Pagination";

export default function NetworkList() {
  const { networks, loading, error } = useNetwork();
  const [currentPage, setCurrentPage] = useState(1);
  const networksPerPage = 5;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const indexOfLastNetwork = currentPage * networksPerPage;
  const indexOfFirstNetwork = indexOfLastNetwork - networksPerPage;
  const currentNetworks = networks.slice(
    indexOfFirstNetwork,
    indexOfLastNetwork
  );
  const totalPages = Math.ceil(networks.length / networksPerPage);

  return (
    <div className="space-y-6">
      <div className="space-y-0">
        {currentNetworks.map((network, index) => (
          <div key={network.id}>
            <div className="py-4 hover:bg-indigo-50/50 group rounded-lg -mx-4 px-4 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <h3 className="text-indigo-900 font-semibold">
                    {network.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-500 text-sm">
                      {network.location.city}, {network.location.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        Company name 1, Company na...
                      </span>
                    </div>
                    <div className="h-5 px-1.5 rounded bg-gray-100 text-gray-500 text-xs flex items-center">
                      +2
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#FF6B3D] opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                    Details
                  </span>
                  <ChevronRight className="h-5 w-5 text-[#FF6B3D] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
            {index < currentNetworks.length - 1 && (
              <div className="h-px bg-gray-300 -mx-4" />
            )}
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
