import React from 'react';
import { DropdownDifficulty } from './DropdownDifficulty';
import { DropdownLanguage } from './DropdownLanguage';
import { DropdownTimeframe } from './DropdownTimeframe';
import { ActiveFilters } from './ActiveFilters';
import { FiltersProvider } from '../../contexts/FilterContext';

export const FilterContainer: React.FC = () => {
  return (
    <FiltersProvider>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <DropdownDifficulty />
          <DropdownLanguage />
          <DropdownTimeframe />
        </div>
        <ActiveFilters />
      </div>
    </FiltersProvider>
  );
};

export default FilterContainer;