'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="text-gray-500 flex items-center space-x-1 hover:text-gray-700 disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </button>

      {[1, 2, 3].map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page > totalPages}
          className={`px-3 py-1 rounded-md ${
            currentPage === page 
              ? 'bg-indigo-50 text-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {page}
        </button>
      ))}

      <span className="text-gray-400">...</span>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages || totalPages === 0}
        className="text-gray-500 flex items-center space-x-1 hover:text-gray-700 disabled:opacity-50"
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}