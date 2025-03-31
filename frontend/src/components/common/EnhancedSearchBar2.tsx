import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Tag, Users } from 'lucide-react';
import { Button } from '../ui/ButtonComponent';

// Define types for our filters
type ProgrammingLanguage = string;
type Organization = string;

// Suggested options (will now be just suggestions)
const SUGGESTED_LANGUAGES: ProgrammingLanguage[] = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'Ruby', 'PHP'
];

const SUGGESTED_ORGANIZATIONS: Organization[] = [
  'Microsoft', 'Google', 'Facebook', 'Apple', 'Amazon', 'Netflix', 'Spotify', 'GitHub'
];

interface EnhancedSearchBarProps {
  onSearch: (searchData: {
    searchTerm: string,
    language?: string,
    organization?: string
  }) => void;
  placeholder?: string;
}

const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search for repositories..."
}) => {
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState<string>('');
  const [orgFilter, setOrgFilter] = useState<string>('');
  const [activeLanguages, setActiveLanguages] = useState<string[]>([]);
  const [activeOrgs, setActiveOrgs] = useState<string[]>([]);
  
  // Input refs
  const languageInputRef = useRef<HTMLInputElement>(null);
  const orgInputRef = useRef<HTMLInputElement>(null);
  
  // Suggestion state
  const [showLanguageSuggestions, setShowLanguageSuggestions] = useState(false);
  const [showOrgSuggestions, setShowOrgSuggestions] = useState(false);
  
  // Filter language suggestions based on input
  const filteredLanguageSuggestions = SUGGESTED_LANGUAGES.filter(
    lang => lang.toLowerCase().includes(languageFilter.toLowerCase())
  );
  
  // Filter organization suggestions based on input
  const filteredOrgSuggestions = SUGGESTED_ORGANIZATIONS.filter(
    org => org.toLowerCase().includes(orgFilter.toLowerCase())
  );
  
  // Add language filter
  const addLanguageFilter = (language: string) => {
    if (language && !activeLanguages.includes(language)) {
      setActiveLanguages([...activeLanguages, language]);
      setLanguageFilter('');
    }
  };
  
  // Add organization filter
  const addOrgFilter = (org: string) => {
    if (org && !activeOrgs.includes(org)) {
      setActiveOrgs([...activeOrgs, org]);
      setOrgFilter('');
    }
  };
  
  // Remove language filter
  const removeLanguageFilter = (language: string) => {
    setActiveLanguages(activeLanguages.filter(lang => lang !== language));
  };
  
  // Remove organization filter
  const removeOrgFilter = (org: string) => {
    setActiveOrgs(activeOrgs.filter(o => o !== org));
  };
  
  // Handle the search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add any pending filters before search
    if (languageFilter.trim()) {
      addLanguageFilter(languageFilter.trim());
    }
    
    if (orgFilter.trim()) {
      addOrgFilter(orgFilter.trim());
    }
    
    // Construct search data
    const searchData = {
      searchTerm,
      language: activeLanguages.length > 0 ? activeLanguages.join(',') : undefined,
      organization: activeOrgs.length > 0 ? activeOrgs.join(',') : undefined
    };
    
    onSearch(searchData);
  };
  
  // Handle keyboard events for filter inputs
  const handleLanguageKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && languageFilter.trim()) {
      e.preventDefault(); // Prevent form submission
      addLanguageFilter(languageFilter.trim());
    }
  };
  
  const handleOrgKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && orgFilter.trim()) {
      e.preventDefault(); // Prevent form submission
      addOrgFilter(orgFilter.trim());
    }
  };
  
  // Close suggestion dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageInputRef.current && 
        !languageInputRef.current.contains(event.target as Node)
      ) {
        setShowLanguageSuggestions(false);
      }
      
      if (
        orgInputRef.current && 
        !orgInputRef.current.contains(event.target as Node)
      ) {
        setShowOrgSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Build the query display string
  const getQueryDisplay = () => {
    const parts = [];
    
    if (activeLanguages.length > 0) {
      parts.push(`language:${activeLanguages.join(' language:')}`);
    }
    
    if (activeOrgs.length > 0) {
      parts.push(`org:${activeOrgs.join(' org:')}`);
    }
    
    return parts.length > 0 ? parts.join(' ') : '';
  };

  return (
    <div className="w-full max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main search input */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 pl-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search 
            className="absolute left-3 text-gray-400" 
            size={18}
          />
          <button
            type="submit"
            className="ml-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap md:flex-nowrap gap-2">
          {/* Language filter */}
          <div className="relative w-full md:w-1/2" ref={languageInputRef}>
            <div className="flex items-center">
              <Tag className="absolute left-3 text-gray-400" size={16} />
              <input
                type="text"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                onFocus={() => setShowLanguageSuggestions(true)}
                onKeyDown={handleLanguageKeyDown}
                placeholder="Add language filter..."
                className="w-full pl-10 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button
                type="button"
                variant="outline"
                size="sm" 
                className="ml-2"
                onClick={() => {
                  if (languageFilter.trim()) {
                    addLanguageFilter(languageFilter.trim());
                  }
                }}
              >
                Add
              </Button>
            </div>
            
            {/* Language suggestions */}
            {showLanguageSuggestions && filteredLanguageSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 py-1 max-h-64 overflow-y-auto">
                {filteredLanguageSuggestions.map((language) => (
                  <div
                    key={language}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      addLanguageFilter(language);
                      setShowLanguageSuggestions(false);
                    }}
                  >
                    {language}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Organization filter */}
          <div className="relative w-full md:w-1/2" ref={orgInputRef}>
            <div className="flex items-center">
              <Users className="absolute left-3 text-gray-400" size={16} />
              <input
                type="text"
                value={orgFilter}
                onChange={(e) => setOrgFilter(e.target.value)}
                onFocus={() => setShowOrgSuggestions(true)}
                onKeyDown={handleOrgKeyDown}
                placeholder="Add organization filter..."
                className="w-full pl-10 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="ml-2"
                onClick={() => {
                  if (orgFilter.trim()) {
                    addOrgFilter(orgFilter.trim());
                  }
                }}
              >
                Add
              </Button>
            </div>
            
            {/* Organization suggestions */}
            {showOrgSuggestions && filteredOrgSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 py-1 max-h-64 overflow-y-auto">
                {filteredOrgSuggestions.map((org) => (
                  <div
                    key={org}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      addOrgFilter(org);
                      setShowOrgSuggestions(false);
                    }}
                  >
                    {org}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Active filters */}
        {(activeLanguages.length > 0 || activeOrgs.length > 0) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {activeLanguages.map(language => (
              <div key={language} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center text-sm">
                <span>language: {language}</span>
                <button 
                  type="button"
                  onClick={() => removeLanguageFilter(language)} 
                  className="ml-2 text-blue-800 hover:opacity-80"
                  aria-label={`Remove ${language} filter`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            
            {activeOrgs.map(org => (
              <div key={org} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center text-sm">
                <span>org: {org}</span>
                <button 
                  type="button"
                  onClick={() => removeOrgFilter(org)} 
                  className="ml-2 text-purple-800 hover:opacity-80"
                  aria-label={`Remove ${org} filter`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Query preview */}
        {(activeLanguages.length > 0 || activeOrgs.length > 0) && (
          <div className="text-sm text-gray-500 mt-2">
            <span className="font-medium">Search query:</span> {searchTerm} {getQueryDisplay()}
          </div>
        )}
      </form>
    </div>
  );
};

export default EnhancedSearchBar;