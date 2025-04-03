import React, { createContext, useState, useContext, useCallback } from 'react';
import { UI } from '../utils/constants';

// Define types
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | null;
export type ProgrammingLanguage = string | null;
export type TimeframeOption = string | null;

// Define context interface
interface FiltersContextType {
  difficultyLevels: DifficultyLevel[];
  programmingLanguages: ProgrammingLanguage[];
  timeframeOptions: TimeframeOption[];
  selectedDifficulty: DifficultyLevel;
  selectedLanguage: ProgrammingLanguage;
  selectedTimeframe: TimeframeOption;
  setSelectedDifficulty: (difficulty: DifficultyLevel) => void;
  setSelectedLanguage: (language: ProgrammingLanguage) => void;
  setSelectedTimeframe: (timeframe: TimeframeOption) => void;
  clearAllFilters: () => void;
  openDropdown: string | null;
  setOpenDropdown: (dropdown: string | null) => void;
}

// Create context with default values
const FiltersContext = createContext<FiltersContextType>({
  difficultyLevels: ['beginner', 'intermediate', 'advanced'],
  programmingLanguages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Ruby', 'C++', 'C#', 'PHP', 'Rust'],
  timeframeOptions: ['Last day', 'Last week', 'Last month', 'Last 3 months', 'Last 6 months', 'Last year'],
  selectedDifficulty: null,
  selectedLanguage: null,
  selectedTimeframe: null,
  setSelectedDifficulty: () => {},
  setSelectedLanguage: () => {},
  setSelectedTimeframe: () => {},
  clearAllFilters: () => {},
  openDropdown: null,
  setOpenDropdown: () => {}
});

// Provider component
export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State for selected filters
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeOption>(null);
  
  // State for tracking which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Function to clear all filters
  const clearAllFilters = useCallback(() => {
    setSelectedDifficulty(null);
    setSelectedLanguage(null);
    setSelectedTimeframe(null);
    // Close any open dropdowns when clearing filters
    setOpenDropdown(null);
  }, []);
  
  // Available options
  const difficultyLevels: DifficultyLevel[] = ['beginner', 'intermediate', 'advanced'];
  
  const programmingLanguages: ProgrammingLanguage[] = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Ruby', 'C++', 'C#', 'PHP', 'Rust', 
    'Swift', 'Kotlin', 'Dart', 'Shell', 'HTML', 'CSS', 'R', 'Scala', 'Haskell'
  ];
  
  const timeframeOptions: TimeframeOption[] = [
    'Last day', 'Last week', 'Last month', 'Last 3 months', 'Last 6 months', 'Last year'
  ];
  
  // Context value
  const value = {
    difficultyLevels,
    programmingLanguages,
    timeframeOptions,
    selectedDifficulty,
    selectedLanguage,
    selectedTimeframe,
    setSelectedDifficulty,
    setSelectedLanguage,
    setSelectedTimeframe,
    clearAllFilters,
    openDropdown,
    setOpenDropdown
  };
  
  return (
    <FiltersContext.Provider value={value}>
      {children}
    </FiltersContext.Provider>
  );
};

// Custom hook for using the filters context
export const useFilters = () => useContext(FiltersContext);