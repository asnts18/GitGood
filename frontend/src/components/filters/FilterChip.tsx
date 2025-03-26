import React from 'react';
import { Button } from "../../components/ui/ButtonComponent";
import { useFilters } from '../../contexts/FilterContext';
import { ChevronDown, X } from 'lucide-react';

interface FilterChipProps<T> {
  type: 'difficulty' | 'language' | 'timeframe';
  label: string;
  value: T | null;
  options: T[];
  onSelect: (value: T | null) => void;
  getColor: (selected: boolean) => {
    textColor: string;
    bgColor: string;
    hoverColor: string;
    borderColor: string;
  };
  formatOption?: (option: T) => string;
}

export function FilterChip<T>({
  type,
  label,
  value,
  options,
  onSelect,
  getColor,
  formatOption = (option) => String(option)
}: FilterChipProps<T>) {
  const { openDropdown, setOpenDropdown } = useFilters();
  const isOpen = openDropdown === type;
  
  const toggleDropdown = () => {
    setOpenDropdown(isOpen ? null : type);
  };
  
  const handleSelect = (option: T) => {
    onSelect(value === option ? null : option);
    setOpenDropdown(null);
  };
  
  const colors = getColor(!!value);
  
  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className={`
          ${value ? colors.textColor : 'text-gray-700'}
          ${value ? colors.bgColor : 'bg-white'} 
          ${value ? colors.borderColor : 'border-gray-300'}
          hover:${value ? colors.hoverColor : 'bg-gray-50'}
          flex items-center justify-between min-w-32 transition-all duration-200
        `}
        onClick={toggleDropdown}
      >
        <span>{value ? formatOption(value) : label}</span>
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1">
          {options.map((option) => (
            <div
              key={String(option)}
              className={`
                px-4 py-2 cursor-pointer
                ${value === option ? `${colors.bgColor} ${colors.textColor}` : 'hover:bg-gray-50'}
              `}
              onClick={() => handleSelect(option)}
            >
              {formatOption(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterChip;