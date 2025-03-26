import React from 'react';
import FilterChip from './FilterChip';
import { ProgrammingLanguage, useFilters } from '../../contexts/FilterContext';

export const DropdownLanguage: React.FC = () => {
  const { 
    programmingLanguages,
    selectedLanguage,
    setSelectedLanguage
  } = useFilters();
  
  const getLanguageColor = (selected: boolean) => {
    return {
      textColor: selected ? 'text-white' : 'text-cyan-700',
      bgColor: selected ? 'bg-cyan-600' : 'bg-cyan-50',
      hoverColor: 'bg-cyan-700',
      borderColor: 'border-cyan-600'
    };
  };
  
  return (
    <FilterChip
      type="language"
      label="Language"
      value={selectedLanguage}
      options={programmingLanguages}
      onSelect={setSelectedLanguage}
      getColor={getLanguageColor}
    />
  );
};

export default DropdownLanguage;