"use client";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "./Pagination";

interface Station {
  id: string;
  name: string;
  free_bikes: number;
  empty_slots: number;
}

interface NetworkStationsListProps {
  stations: Station[];
}

type SortField = "free_bikes" | "empty_slots";
type SortOrder = "asc" | "desc";

export function NetworkStationsList({ stations }: NetworkStationsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("free_bikes");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const stationsPerPage = 7;

  const sortStations = (a: Station, b: Station) => {
    const multiplier = sortOrder === "asc" ? 1 : -1;
    return (a[sortField] - b[sortField]) * multiplier;
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const indexOfLastStation = currentPage * stationsPerPage;
  const indexOfFirstStation = indexOfLastStation - stationsPerPage;
  const currentStations = [...stations]
    .sort(sortStations)
    .slice(indexOfFirstStation, indexOfLastStation);
  const totalPages = Math.ceil(stations.length / stationsPerPage);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900">
            All {stations.length} stations
          </h2>
        </div>

        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Station name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("free_bikes")}
                    className={`flex items-center gap-1 ${
                      sortField === "free_bikes" ? "text-indigo-600" : ""
                    }`}
                  >
                    Free bikes
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("empty_slots")}
                    className={`flex items-center gap-1 ${
                      sortField === "empty_slots" ? "text-indigo-600" : ""
                    }`}
                  >
                    Empty slots
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentStations.map((station) => (
                <tr key={station.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {station.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {station.free_bikes}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {station.empty_slots}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
