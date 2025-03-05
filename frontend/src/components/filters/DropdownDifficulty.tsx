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
        textColor: 'text-gray-700',
        bgColor: 'bg-white',
        hoverColor: 'bg-gray-50',
        borderColor: 'border-gray-300'
      };
    }
    
    const level = selectedDifficulty || 'beginner';
    
    switch (level) {
      case 'beginner':
        return {
          textColor: selected ? 'text-white' : 'text-green-600',
          bgColor: selected ? 'bg-green-600' : 'bg-green-50',
          hoverColor: 'bg-green-700',
          borderColor: 'border-green-600'
        };
      case 'intermediate':
        return {
          textColor: selected ? 'text-white' : 'text-blue-600',
          bgColor: selected ? 'bg-blue-600' : 'bg-blue-50',
          hoverColor: 'bg-blue-700',
          borderColor: 'border-blue-600'
        };
      case 'advanced':
        return {
          textColor: selected ? 'text-white' : 'text-purple-600',
          bgColor: selected ? 'bg-purple-600' : 'bg-purple-50',
          hoverColor: 'bg-purple-700',
          borderColor: 'border-purple-600'
        };
      default:
        return {
          textColor: selected ? 'text-white' : 'text-green-600',
          bgColor: selected ? 'bg-green-600' : 'bg-green-50',
          hoverColor: 'bg-green-700',
          borderColor: 'border-green-600'
        };
    }
  };
  
  const formatDifficulty = (level: DifficultyLevel): string => {
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