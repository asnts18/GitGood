import React from 'react';
import { LayoutGrid, AlertCircle } from 'lucide-react';

interface ProjectTabsProps {
  activeTab: 'issues' | 'projects';
  onTabChange: (tab: 'issues' | 'projects') => void;
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="relative flex justify-center mb-6">
      <div className="relative flex border-b border-secondary-200 w-full max-w-md">
        <div className="flex w-full">
          <button
            className={`relative w-1/2 px-6 py-3 flex items-center justify-center font-heading transition-colors ${
              activeTab === 'projects' ? 'text-primary' : 'text-primary-light hover:text-primary'
            }`}
            onClick={() => onTabChange('projects')}
          >
            <LayoutGrid className="w-5 h-5 mr-2" />
            <span>Projects</span>
          </button>

          <button
            className={`relative w-1/2 px-6 py-3 flex items-center justify-center font-heading transition-colors ${
              activeTab === 'issues' ? 'text-primary' : 'text-primary-light hover:text-primary'
            }`}
            onClick={() => onTabChange('issues')}
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>Issues</span>
          </button>
        </div>

        {/* Active indicator */}
        <div
          className={`absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-in-out`}
          style={{
            width: '50%',
            left: activeTab === 'projects' ? '0%' : '50%',
          }}
        />
      </div>
    </div>
  );
};

export default ProjectTabs;
