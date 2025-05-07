import React from 'react';
import FilterChip from './FilterChip';
import { DifficultyLevel, useFilters } from '../../contexts/FilterContext';

export const DropdownDifficulty: React.FC = () => {
  const { 
    difficultyLevels,
    selectedDifficulty,
    setSelectedDifficulty
  } = useFilters();
  
  const getDifficultyColor = (selected: boolean) => {
    if (!selected) {
      return {
        textColor: 'text-neutral-black',
        bgColor: 'bg-white',
        hoverColor: 'bg-secondary-50',
        borderColor: 'border-secondary-300'
      };
    }
    
    const level = selectedDifficulty || 'beginner';
    
    switch (level) {
      case 'beginner':
        return {
          textColor: selected ? 'text-white' : 'text-green-700',
          bgColor: selected ? 'bg-green-600' : 'bg-green-50',
          hoverColor: 'bg-green-700',
          borderColor: 'border-green-500'
        };
      case 'intermediate':
        return {
          textColor: selected ? 'text-white' : 'text-amber-700',
          bgColor: selected ? 'bg-indigo-500' : 'bg-indigo-50',
          hoverColor: 'bg-indigo-600',
          borderColor: 'border-indigo-500'
        };
      case 'advanced':
        return {
          textColor: selected ? 'text-white' : 'text-red-700',
          bgColor: selected ? 'bg-red-600' : 'bg-red-50',
          hoverColor: 'bg-red-700',
          borderColor: 'border-red-500'
        };
      default:
        return {
          textColor: selected ? 'text-white' : 'text-green-700',
          bgColor: selected ? 'bg-green-600' : 'bg-green-50',
          hoverColor: 'bg-green-700',
          borderColor: 'border-green-500'
        };
    }
  };
  
  const formatDifficulty = (level: DifficultyLevel): string => {
    if (!level) return 'All'; // Or whatever default you want to show
    return level.charAt(0).toUpperCase() + level.slice(1);
  };
  
  return (
    <FilterChip
      type="difficulty"
      label="Difficulty"
      value={selectedDifficulty}
      options={difficultyLevels}
      onSelect={setSelectedDifficulty}
      getColor={getDifficultyColor}
      formatOption={formatDifficulty}
    />
  );
};

export default DropdownDifficulty;