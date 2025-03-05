import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FILTER_OPTIONS } from 'utils/constants';

// Filter types
export type DifficultyLevel = typeof FILTER_OPTIONS.DIFFICULTY[number];
export type ProgrammingLanguage = typeof FILTER_OPTIONS.LANGUAGES[number];
export type TimeframeOption = typeof FILTER_OPTIONS.TIMEFRAMES[number];

interface FiltersContextType {
  // Available options
  difficultyLevels: DifficultyLevel[];
  programmingLanguages: ProgrammingLanguage[];
  timeframeOptions: TimeframeOption[];
  
  // Selected values
  selectedDifficulty: DifficultyLevel | null;
  selectedLanguage: ProgrammingLanguage | null;
  selectedTimeframe: TimeframeOption | null;
  
  // Actions
  setSelectedDifficulty: (difficulty: DifficultyLevel | null) => void;
  setSelectedLanguage: (language: ProgrammingLanguage | null) => void;
  setSelectedTimeframe: (timeframe: TimeframeOption | null) => void;
  
  // Dropdown state
  openDropdown: string | null;
  setOpenDropdown: (dropdown: string | null) => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const useFilters = (): FiltersContextType => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersProvider: React.FC<FiltersProviderProps> = ({ children }) => {
  // Available options
  const difficultyLevels = [...FILTER_OPTIONS.DIFFICULTY];
  const programmingLanguages = [...FILTER_OPTIONS.LANGUAGES];
  const timeframeOptions = [...FILTER_OPTIONS.TIMEFRAMES];
  
  // Selected values state
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeOption | null>(null);
  
  // Track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
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
    openDropdown,
    setOpenDropdown
  };
  
  return (
    <FiltersContext.Provider value={value}>
      {children}
    </FiltersContext.Provider>
  );
};

// Export to make it a module
export default FiltersProvider;