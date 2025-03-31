import React from 'react';

interface ProjectTabsProps {
  activeTab: 'issues' | 'projects';
  onTabChange: (tab: 'issues' | 'projects') => void;
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center border-b mb-6">
      <button
        className={`px-6 py-3 flex items-center justify-center ${
          activeTab === 'projects' 
            ? 'border-b-2 border-blue-600 font-medium text-blue-600' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onTabChange('projects')}
      >
        <svg 
          className="w-5 h-5 mr-2" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
        Projects
      </button>
      <button
        className={`px-6 py-3 flex items-center justify-center ${
          activeTab === 'issues' 
            ? 'border-b-2 border-blue-600 font-medium text-blue-600' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onTabChange('issues')}
      >
        <svg 
          className="w-5 h-5 mr-2" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        Issues
      </button>
    </div>
  );
};

export default ProjectTabs;