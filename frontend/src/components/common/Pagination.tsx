import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/ButtonComponent';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  // Generate an array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Add ellipsis if needed
    if (currentPage > 3) {
      pages.push('...');
    }
    
    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i < totalPages) {
        pages.push(i);
      }
    }
    
    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      pages.push('...');
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex items-center justify-center mt-6 space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {getPageNumbers().map((page, i) => (
        <React.Fragment key={i}>
          {page === '...' ? (
            <span className="px-2 py-1 text-primary-light">...</span>
          ) : (
            <Button
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(Number(page))}
              className={`min-w-8 ${currentPage === page ? 'bg-primary' : ''}`}
            >
              {page}
            </Button>
          )}
        </React.Fragment>
      ))}
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;