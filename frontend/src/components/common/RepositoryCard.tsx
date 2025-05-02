import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Star, GitBranch, ExternalLink } from 'lucide-react';

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
  
  // Get language color
  const getLanguageColor = (language: string | null) => {
    if (!language) return 'bg-gray-200';
    
    const colorMap: Record<string, string> = {
      JavaScript: 'bg-yellow-300',
      TypeScript: 'bg-blue-400',
      Python: 'bg-green-400',
      Java: 'bg-red-500',
      'C++': 'bg-pink-500',
      C: 'bg-gray-500',
      'C#': 'bg-purple-500',
      PHP: 'bg-indigo-400',
      Ruby: 'bg-red-600',
      Go: 'bg-blue-300',
      Rust: 'bg-orange-500',
      Swift: 'bg-orange-400',
      Kotlin: 'bg-purple-400',
      Dart: 'bg-blue-500',
      HTML: 'bg-orange-600',
      CSS: 'bg-blue-600',
    };
    
    return colorMap[language] || 'bg-gray-400';
  };

  return (
    <div className="mb-6 transition-all duration-200 transform hover:translate-y-[-2px]">
    <div 
      className="p-5 bg-white rounded-xl border border-secondary-200/30 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200"
      onClick={viewMode === 'issues' ? handleClick : navigateToRepo}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-primary hover:text-primary-dark transition-colors">
              {repository.full_name}
            </h2>
            {viewMode === 'projects' && (
              <ExternalLink className="ml-2 h-4 w-4 text-primary-light" />
            )}
          </div>
          <p className="text-neutral-black/70 mt-3 mb-3 leading-relaxed">
            {truncateDescription(repository.description)}
          </p>
          <div className="mt-3 flex items-center flex-wrap gap-3">
            <div className="flex items-center text-primary-light font-medium">
              <Star className="h-4 w-4 mr-1 text-accent" />
              <span>{repository.stargazers_count.toLocaleString()}</span>
            </div>
            
            {repository.language && (
              <div className="flex items-center">
                <span className={`h-3 w-3 rounded-full ${getLanguageColor(repository.language)} mr-1.5`}></span>
                <span className="text-primary-light font-medium">{repository.language}</span>
              </div>
            )}
          </div>
        </div>
        
        {viewMode === 'issues' && (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-secondary-50 text-primary transition-colors duration-200 ${expanded ? 'bg-primary/10' : ''}`}>
            {expanded ? 
              <ChevronUp className="h-5 w-5" /> : 
              <ChevronDown className="h-5 w-5" />
            }
          </div>
        )}
      </div>
    </div>
  

  {viewMode === 'issues' && expanded && (
    <div className="mt-1 mb-4 border border-purple-300 rounded-xl p-6 bg-purple-100 text-purple-900 shadow-inner">
      <h3 className="font-medium text-purple-800 text-lg mb-4 flex items-center">
        <GitBranch className="h-5 w-5 mr-2 text-purple-600" />
        Recent Issues
      </h3>
      
      {repository.isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="relative">
            <div className="w-10 h-10 border-4 border-purple-300 border-t-purple-700 rounded-full animate-spin"></div>
          </div>
          <span className="ml-3 text-purple-600">Loading issues...</span>
        </div>
      ) : repository.issues && repository.issues.length > 0 ? (
        <div className="space-y-4">
          {repository.issues.map(issue => (
            <div key={issue.id} className="p-4 border-b border-purple-300 hover:bg-purple-200 rounded-lg transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-900 font-medium hover:text-purple-600 hover:underline transition-colors"
                  >
                    {issue.title}
                  </a>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {issue.labels.map(label => (
                      <span 
                        key={label.id} 
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium shadow-sm"
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
                <div className="text-xs whitespace-nowrap ml-4 bg-purple-200 px-2 py-1 rounded-md text-purple-700">
                  Last updated: {new Date(issue.updated_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-purple-200 rounded-lg">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-purple-400 mx-auto mb-3" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.5" 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M7 16a7 7 0 1114 0H7z" 
            />
          </svg>
          <p className="text-purple-700">No open issues found for this repository</p>
        </div>
      )}
    </div>
  )}
</div>

  );
};

export default RepositoryCard;