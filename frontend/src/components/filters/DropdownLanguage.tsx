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
      textColor: selected ? 'text-neutral-white' : 'text-primary',
      bgColor: selected ? 'bg-primary' : 'bg-secondary-100',
      hoverColor: 'bg-primary-dark',
      borderColor: 'border-primary'
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