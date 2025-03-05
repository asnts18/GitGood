import React from 'react';
import FilterBadge from './FilterBadge';
import { useFilters, DifficultyLevel } from '../../contexts/FilterContext';

export const ActiveFilters: React.FC = () => {
  const {
    selectedDifficulty,
    selectedLanguage,
    selectedTimeframe,
    setSelectedDifficulty,
    setSelectedLanguage,
    setSelectedTimeframe
  } = useFilters();
  
  const formatDifficulty = (level: DifficultyLevel): string => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };
  
  const getDifficultyColors = () => {
    if (!selectedDifficulty) return { bg: '', text: '' };
    
    switch (selectedDifficulty) {
      case 'beginner':
        return { bg: 'bg-green-100', text: 'text-green-800' };
      case 'intermediate':
        return { bg: 'bg-blue-100', text: 'text-blue-800' };
      case 'advanced':
        return { bg: 'bg-purple-100', text: 'text-purple-800' };
      default:
        return { bg: 'bg-green-100', text: 'text-green-800' };
    }
  };
  
  const difficultyColors = getDifficultyColors();
  const hasActiveFilters = selectedDifficulty || selectedLanguage || selectedTimeframe;
  
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h3>
      <div className="flex flex-wrap gap-2">
        {selectedDifficulty && (
          <FilterBadge
            label={`Difficulty: ${formatDifficulty(selectedDifficulty)}`}
            bgColor={difficultyColors.bg}
            textColor={difficultyColors.text}
            onRemove={() => setSelectedDifficulty(null)}
          />
        )}
        
        {selectedLanguage && (
          <FilterBadge
            label={`Language: ${selectedLanguage}`}
            bgColor="bg-cyan-100"
            textColor="text-cyan-800"
            onRemove={() => setSelectedLanguage(null)}
          />
        )}
        
        {selectedTimeframe && (
          <FilterBadge
            label={`Last Updated: ${selectedTimeframe}`}
            bgColor="bg-amber-100"
            textColor="text-amber-800"
            onRemove={() => setSelectedTimeframe(null)}
          />
        )}
        
        {!hasActiveFilters && (
          <span className="text-sm text-gray-500">No filters selected</span>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;