import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface Issue {
  id: number;
  title: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  labels: Array<{
    id: number;
    name: string;
    color: string;
  }>;
}

export interface Repository {
  id: number;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  issues?: Issue[];
  isLoading?: boolean;
}

interface RepositoryCardProps {
  repository: Repository;
  viewMode: 'issues' | 'projects';
  onRepositoryClick?: (repository: Repository) => void;
}

const MAX_DESCRIPTION_LENGTH = 250; // Maximum characters to display

const RepositoryCard: React.FC<RepositoryCardProps> = ({ 
  repository, 
  viewMode,
  onRepositoryClick
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const handleClick = () => {
    if (viewMode === 'issues') {
      setExpanded(!expanded);
      if (onRepositoryClick && !expanded) {
        onRepositoryClick(repository);
      }
    }
  };

  const navigateToRepo = () => {
    if (viewMode === 'projects') {
      window.open(repository.html_url, '_blank', 'noopener,noreferrer');
    }
  };
  
  // Truncate description if it's too long
  const truncateDescription = (description: string) => {
    if (!description) return "";
    return description.length > MAX_DESCRIPTION_LENGTH 
      ? `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...` 
      : description;
  };

  return (
    <div className="mb-4">
      <div 
        className={`p-4 bg-white rounded-lg shadow cursor-pointer transition-all duration-200 hover:shadow-md`}
        onClick={viewMode === 'issues' ? handleClick : navigateToRepo}
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">
              <span className="text-blue-600 hover:text-blue-800">
                {repository.full_name}
              </span>
            </h2>
            <p className="text-gray-600 mt-2 h-[4.5em] overflow-hidden">
              {truncateDescription(repository.description)}
            </p>
            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
              <span>⭐ {repository.stargazers_count}</span>
              {repository.language && <span>• {repository.language}</span>}
            </div>
          </div>
          {viewMode === 'issues' && (
            <div className="text-gray-500">
              {expanded ? <ChevronUp /> : <ChevronDown />}
            </div>
          )}
        </div>
      </div>
      
      {/* Issues expansion panel */}
      {viewMode === 'issues' && expanded && (
        <div className="mt-1 mb-4 border border-dashed border-gray-300 rounded-lg p-4">
          <h3 className="font-medium text-gray-700 mb-4">Recent Issues:</h3>
          
          {repository.isLoading ? (
            <div className="flex justify-center items-center py-4">
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="ml-2">Loading issues...</span>
            </div>
          ) : repository.issues && repository.issues.length > 0 ? (
            <div className="space-y-4">
              {repository.issues.map(issue => (
                <div key={issue.id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <a
                        href={issue.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {issue.title}
                      </a>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {issue.labels.map(label => (
                          <span 
                            key={label.id} 
                            className="px-2 py-0.5 rounded-full text-xs"
                            style={{ 
                              backgroundColor: `#${label.color}`, 
                              color: parseInt(label.color, 16) > 0xffffff / 2 ? '#000' : '#fff'
                            }}
                          >
                            {label.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Last Activity: {new Date(issue.updated_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No open issues found for this repository
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RepositoryCard;