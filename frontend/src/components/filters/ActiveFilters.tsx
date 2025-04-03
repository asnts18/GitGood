import React from 'react';
import FilterBadge from './FilterBadge';
import { useFilters, DifficultyLevel } from '../../contexts/FilterContext';
import { Button } from '../../components/ui/ButtonComponent';

export const ActiveFilters: React.FC = () => {
  const {
    selectedDifficulty,
    selectedLanguage,
    selectedTimeframe,
    setSelectedDifficulty,
    setSelectedLanguage,
    setSelectedTimeframe,
    clearAllFilters
  } = useFilters();
  
  const formatDifficulty = (level: DifficultyLevel): string => {
    if (!level) return 'All'; // Or whatever default you want to show
    return level.charAt(0).toUpperCase() + level.slice(1);
  };
  
  const getDifficultyColors = () => {
    if (!selectedDifficulty) return { bg: '', text: '' };
    
    switch (selectedDifficulty) {
      case 'beginner':
        return { bg: 'bg-secondary-100', text: 'text-primary' };
      case 'intermediate':
        return { bg: 'bg-secondary-200', text: 'text-primary-light' };
      case 'advanced':
        return { bg: 'bg-secondary-300', text: 'text-primary-dark' };
      default:
        return { bg: 'bg-secondary-100', text: 'text-primary' };
    }
  };
  
  const difficultyColors = getDifficultyColors();
  const hasActiveFilters = selectedDifficulty || selectedLanguage || selectedTimeframe;
  
  if (!hasActiveFilters) {
    return (
      <div className="mt-4">
        <h3 className="text-sm font-medium text-primary mb-2 font-heading">Active Filters:</h3>
        <span className="text-sm text-primary-light">No filters selected</span>
      </div>
    );
  }
  
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-primary font-heading">Active Filters:</h3>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-xs text-primary-light hover:text-primary"
          >
            Clear All
          </Button>
        )}
      </div>
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
            bgColor="bg-secondary-200"
            textColor="text-primary"
            onRemove={() => setSelectedLanguage(null)}
          />
        )}
        
        {selectedTimeframe && (
          <FilterBadge
            label={`Last Updated: ${selectedTimeframe}`}
            bgColor="bg-accent"
            textColor="text-neutral-navy"
            onRemove={() => setSelectedTimeframe(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;