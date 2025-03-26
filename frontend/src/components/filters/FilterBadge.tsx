import React from 'react';
import { X } from 'lucide-react';

interface FilterBadgeProps {
  label: string;
  bgColor: string;
  textColor: string;
  onRemove: () => void;
}

export const FilterBadge: React.FC<FilterBadgeProps> = ({
  label,
  bgColor,
  textColor,
  onRemove
}) => {
  return (
    <div className={`${bgColor} ${textColor} px-3 py-1 rounded-full flex items-center text-sm`}>
      <span>{label}</span>
      <button 
        onClick={onRemove} 
        className={`ml-2 ${textColor} hover:opacity-80`}
        aria-label="Remove filter"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default FilterBadge;