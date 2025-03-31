import React from 'react';
import { X } from 'lucide-react';

// Color constants based on the new theme
export const BADGE_COLORS = {
  // Difficulty levels
  BEGINNER: {
    bgColor: 'bg-secondary-100',
    textColor: 'text-primary'
  },
  INTERMEDIATE: {
    bgColor: 'bg-secondary-200',
    textColor: 'text-primary-light'
  },
  ADVANCED: {
    bgColor: 'bg-secondary-300',
    textColor: 'text-primary-dark'
  },
  
  // Other filter types
  LANGUAGE: {
    bgColor: 'bg-secondary-200',
    textColor: 'text-primary'
  },
  ORGANIZATION: {
    bgColor: 'bg-secondary-300',
    textColor: 'text-primary-light'
  },
  TIMEFRAME: {
    bgColor: 'bg-accent',
    textColor: 'text-neutral-navy'
  },
  TOPIC: {
    bgColor: 'bg-accent',
    textColor: 'text-neutral-navy'
  },
  
  // Default
  DEFAULT: {
    bgColor: 'bg-secondary-100',
    textColor: 'text-primary'
  }
};

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