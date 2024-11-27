"use client";

import { useNetwork } from "../context/NetworkContext";
import { MapPin, Building2, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Pagination } from "./Pagination";
import { useSearchParams } from "next/navigation";

export default function NetworkList() {
  const { filteredNetworks, loading, error } = useNetwork();
  const [currentPage, setCurrentPage] = useState(1);
  const networksPerPage = 5;
  const searchParams = useSearchParams();

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const indexOfLastNetwork = currentPage * networksPerPage;
  const indexOfFirstNetwork = indexOfLastNetwork - networksPerPage;
  const currentNetworks = filteredNetworks.slice(
    indexOfFirstNetwork,
    indexOfLastNetwork
  );
  const totalPages = Math.ceil(filteredNetworks.length / networksPerPage);

  if (filteredNetworks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No bike networks found for the selected filters.
      </div>
    );
  }

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
                        {Array.isArray(network.company)
                          ? network.company.slice(0, 2).join(", ") +
                            (network.company.length > 2 ? "..." : "")
                          : network.company}
                      </span>
                    </div>
                    {Array.isArray(network.company) &&
                      network.company.length > 2 && (
                        <div className="h-5 px-1.5 rounded bg-gray-100 text-gray-500 text-xs flex items-center">
                          +{network.company.length - 2}
                        </div>
                      )}
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
              <div className="h-px bg-gray-200 -mx-4" />
            )}
          </div>
        ))}
      </div>

      {filteredNetworks.length > networksPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
