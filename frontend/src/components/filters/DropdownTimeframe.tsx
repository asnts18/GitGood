import React from 'react';
import FilterChip from './FilterChip';
import { TimeframeOption, useFilters } from '../../contexts/FilterContext';
import DropdownDifficulty from './DropdownDifficulty';

export const DropdownTimeframe: React.FC = () => {
  const { 
    timeframeOptions,
    selectedTimeframe,
    setSelectedTimeframe
  } = useFilters();
  
  const getTimeframeColor = (selected: boolean) => {
    return {
      textColor: selected ? 'text-white' : 'text-amber-700',
      bgColor: selected ? 'bg-amber-600' : 'bg-amber-50',
      hoverColor: 'bg-amber-700',
      borderColor: 'border-amber-600'
    };
  };
  
  return (
    <FilterChip
      type="timeframe"
      label="Last Updated"
      value={selectedTimeframe}
      options={timeframeOptions}
      onSelect={setSelectedTimeframe}
      getColor={getTimeframeColor}
    />
  );
};

export default DropdownTimeframe;