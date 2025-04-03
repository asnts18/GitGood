import React from 'react';
import { DropdownDifficulty } from './DropdownDifficulty';
import { DropdownLanguage } from './DropdownLanguage';
import { DropdownTimeframe } from './DropdownTimeframe';

export const FilterContainer: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <DropdownDifficulty />
        <DropdownLanguage />
        <DropdownTimeframe />
      </div>
    </div>
  );
};

export default FilterContainer;