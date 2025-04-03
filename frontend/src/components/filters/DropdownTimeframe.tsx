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
      textColor: selected ? 'text-neutral-navy' : 'text-accent-foreground',
      bgColor: selected ? 'bg-accent' : 'bg-secondary-50',
      hoverColor: 'bg-accent-hover',
      borderColor: 'border-accent'
    };
  };
  
  return (
    <FilterChip
      type="timeframe"
      label="Last Updated"
      value={selectedTimeframe}
      options={timeframeOptions.filter(Boolean) as string[]}
      onSelect={setSelectedTimeframe}
      getColor={getTimeframeColor}
    />
  );
};

export default DropdownTimeframe;