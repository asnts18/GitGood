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
          textColor: selected ? 'text-neutral-white' : 'text-primary',
          bgColor: selected ? 'bg-primary' : 'bg-secondary-100',
          hoverColor: 'bg-primary-dark',
          borderColor: 'border-primary'
        };
      case 'intermediate':
        return {
          textColor: selected ? 'text-neutral-white' : 'text-primary-light',
          bgColor: selected ? 'bg-primary-light' : 'bg-secondary-200',
          hoverColor: 'bg-primary',
          borderColor: 'border-primary-light'
        };
      case 'advanced':
        return {
          textColor: selected ? 'text-neutral-white' : 'text-primary-dark',
          bgColor: selected ? 'bg-primary-dark' : 'bg-secondary-300',
          hoverColor: 'bg-primary-dark',
          borderColor: 'border-primary-dark'
        };
      default:
        return {
          textColor: selected ? 'text-neutral-white' : 'text-primary',
          bgColor: selected ? 'bg-primary' : 'bg-secondary-100',
          hoverColor: 'bg-primary-dark',
          borderColor: 'border-primary'
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