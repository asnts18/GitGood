import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Tag, Users, Hash } from 'lucide-react';
import { Button } from '../ui/ButtonComponent';

// Define types for our filters
type ProgrammingLanguage = string;
type Organization = string;
type Topic = string;

// Suggested options (will now be just suggestions)
const SUGGESTED_LANGUAGES: ProgrammingLanguage[] = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'Ruby', 'PHP'
];

const SUGGESTED_ORGANIZATIONS: Organization[] = [
  'Microsoft', 'Google', 'Facebook', 'Apple', 'Amazon', 'Netflix', 'Spotify', 'GitHub'
];

const SUGGESTED_TOPICS: Topic[] = [
  'machine-learning', 'artificial-intelligence', 'game-development', 'mobile-app', 
  'web-development', 'data-science', 'blockchain', 'iot', 'devops', 'cli',
  'api', 'frontend', 'backend', 'database', 'security'
];

interface EnhancedSearchBarProps {
  onSearch: (searchData: {
    searchTerm: string,
    language?: string,
    organization?: string,
    topic?: string
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
  const [topicFilter, setTopicFilter] = useState<string>('');
  const [activeLanguages, setActiveLanguages] = useState<string[]>([]);
  const [activeOrgs, setActiveOrgs] = useState<string[]>([]);
  const [activeTopics, setActiveTopics] = useState<string[]>([]);
  
  // Input refs
  const languageInputRef = useRef<HTMLInputElement>(null);
  const orgInputRef = useRef<HTMLInputElement>(null);
  const topicInputRef = useRef<HTMLInputElement>(null);
  
  // Suggestion state
  const [showLanguageSuggestions, setShowLanguageSuggestions] = useState(false);
  const [showOrgSuggestions, setShowOrgSuggestions] = useState(false);
  const [showTopicSuggestions, setShowTopicSuggestions] = useState(false);
  
  // Filter language suggestions based on input
  const filteredLanguageSuggestions = SUGGESTED_LANGUAGES.filter(
    lang => lang.toLowerCase().includes(languageFilter.toLowerCase())
  );
  
  // Filter organization suggestions based on input
  const filteredOrgSuggestions = SUGGESTED_ORGANIZATIONS.filter(
    org => org.toLowerCase().includes(orgFilter.toLowerCase())
  );
  
  // Filter topic suggestions based on input
  const filteredTopicSuggestions = SUGGESTED_TOPICS.filter(
    topic => topic.toLowerCase().includes(topicFilter.toLowerCase())
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
  
  // Add topic filter
  const addTopicFilter = (topic: string) => {
    if (topic && !activeTopics.includes(topic)) {
      // Convert spaces to hyphens for GitHub topic format
      const formattedTopic = topic.trim().replace(/\s+/g, '-').toLowerCase();
      setActiveTopics([...activeTopics, formattedTopic]);
      setTopicFilter('');
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
  
  // Remove topic filter
  const removeTopicFilter = (topic: string) => {
    setActiveTopics(activeTopics.filter(t => t !== topic));
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
    
    if (topicFilter.trim()) {
      addTopicFilter(topicFilter.trim());
    }
    
    // Construct search data
    const searchData = {
      searchTerm,
      language: activeLanguages.length > 0 ? activeLanguages.join(',') : undefined,
      organization: activeOrgs.length > 0 ? activeOrgs.join(',') : undefined,
      topic: activeTopics.length > 0 ? activeTopics.join(',') : undefined
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
  
  const handleTopicKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && topicFilter.trim()) {
      e.preventDefault(); // Prevent form submission
      addTopicFilter(topicFilter.trim());
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
      
      if (
        topicInputRef.current && 
        !topicInputRef.current.contains(event.target as Node)
      ) {
        setShowTopicSuggestions(false);
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
    
    if (activeTopics.length > 0) {
      parts.push(`topic:${activeTopics.join(' topic:')}`);
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
            className="w-full px-4 py-3 pl-10 text-sm border border-secondary-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Search 
            className="absolute left-3 text-primary-light" 
            size={18}
          />
          <button
            type="submit"
            className="ml-2 px-6 py-3 text-sm font-medium text-neutral-white bg-primary rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Search
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col space-y-3">
          {/* Language filter */}
          <div className="relative" ref={languageInputRef}>
            <div className="flex items-center">
              <Tag className="absolute left-3 text-primary-light" size={16} />
              <input
                type="text"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                onFocus={() => setShowLanguageSuggestions(true)}
                onKeyDown={handleLanguageKeyDown}
                placeholder="Add language filter..."
                className="w-full pl-10 pr-3 py-2 text-sm border border-secondary-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
              <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-secondary-200 py-1 max-h-64 overflow-y-auto">
                {filteredLanguageSuggestions.map((language) => (
                  <div
                    key={language}
                    className="px-4 py-2 cursor-pointer hover:bg-secondary-50 text-neutral-black"
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
          <div className="relative" ref={orgInputRef}>
            <div className="flex items-center">
              <Users className="absolute left-3 text-primary-light" size={16} />
              <input
                type="text"
                value={orgFilter}
                onChange={(e) => setOrgFilter(e.target.value)}
                onFocus={() => setShowOrgSuggestions(true)}
                onKeyDown={handleOrgKeyDown}
                placeholder="Add organization filter..."
                className="w-full pl-10 pr-3 py-2 text-sm border border-secondary-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
              <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-secondary-200 py-1 max-h-64 overflow-y-auto">
                {filteredOrgSuggestions.map((org) => (
                  <div
                    key={org}
                    className="px-4 py-2 cursor-pointer hover:bg-secondary-50 text-neutral-black"
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
          
          {/* Topic filter */}
          <div className="relative" ref={topicInputRef}>
            <div className="flex items-center">
              <Hash className="absolute left-3 text-primary-light" size={16} />
              <input
                type="text"
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                onFocus={() => setShowTopicSuggestions(true)}
                onKeyDown={handleTopicKeyDown}
                placeholder="Add topic filter (e.g., machine-learning, game-development)..."
                className="w-full pl-10 pr-3 py-2 text-sm border border-secondary-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="ml-2"
                onClick={() => {
                  if (topicFilter.trim()) {
                    addTopicFilter(topicFilter.trim());
                  }
                }}
              >
                Add
              </Button>
            </div>
            
            {/* Topic suggestions */}
            {showTopicSuggestions && filteredTopicSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-secondary-200 py-1 max-h-64 overflow-y-auto">
                {filteredTopicSuggestions.map((topic) => (
                  <div
                    key={topic}
                    className="px-4 py-2 cursor-pointer hover:bg-secondary-50 text-neutral-black"
                    onClick={() => {
                      addTopicFilter(topic);
                      setShowTopicSuggestions(false);
                    }}
                  >
                    {topic}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Active filters */}
        {(activeLanguages.length > 0 || activeOrgs.length > 0 || activeTopics.length > 0) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {activeLanguages.map(language => (
              <div key={language} className="bg-secondary-100 text-primary px-3 py-1 rounded-full flex items-center text-sm">
                <span>language: {language}</span>
                <button 
                  type="button"
                  onClick={() => removeLanguageFilter(language)} 
                  className="ml-2 text-primary hover:opacity-80"
                  aria-label={`Remove ${language} filter`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            
            {activeOrgs.map(org => (
              <div key={org} className="bg-secondary-200 text-primary-light px-3 py-1 rounded-full flex items-center text-sm">
                <span>org: {org}</span>
                <button 
                  type="button"
                  onClick={() => removeOrgFilter(org)} 
                  className="ml-2 text-primary-light hover:opacity-80"
                  aria-label={`Remove ${org} filter`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            
            {activeTopics.map(topic => (
              <div key={topic} className="bg-accent text-neutral-navy px-3 py-1 rounded-full flex items-center text-sm">
                <span>topic: {topic}</span>
                <button 
                  type="button"
                  onClick={() => removeTopicFilter(topic)} 
                  className="ml-2 text-neutral-navy hover:opacity-80"
                  aria-label={`Remove ${topic} filter`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Query preview */}
        {(activeLanguages.length > 0 || activeOrgs.length > 0 || activeTopics.length > 0) && (
          <div className="text-sm text-primary-light mt-2">
            <span className="font-medium text-primary">Search query:</span> {searchTerm} {getQueryDisplay()}
          </div>
        )}
      </form>
    </div>
  );
};

export default EnhancedSearchBar;