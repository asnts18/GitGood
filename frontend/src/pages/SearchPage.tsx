import React, { useState } from 'react';
import Header from 'components/common/Header';
import EnhancedSearchBar from '../components/common/EnhancedSearchBar';
import GitHubService from 'services/github/GithubService';
import { FilterContainer } from 'components/filters/FilterContainer';
import { UI } from 'utils/constants';
import ProjectTabs from 'components/common/ProjectTabs';
import RepositoryCard, { Repository, Issue } from 'components/common/RepositoryCard';
import { useFilters } from 'contexts/FilterContext';

const githubService = new GitHubService();

const SearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'issues' | 'projects'>('projects');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Access filter context
  const { 
    selectedDifficulty, 
    selectedLanguage, 
    selectedTimeframe 
  } = useFilters();
  
  const handleSearch = async (searchData: {
    searchTerm: string,
    language?: string,
    organization?: string,
    topic?: string
  }) => {
    // Allow empty search terms for broader filtering
    setLoading(true);
    setError(null);
    
    try {
      // Use the improved searchRepositories method that accepts an object
      const response = await githubService.searchRepositories({
        searchTerm: searchData.searchTerm.trim(),
        language: searchData.language || selectedLanguage || undefined,
        organization: searchData.organization,
        topic: searchData.topic,
        difficultyLevel: selectedDifficulty || undefined,
        // Ensure we sort by stars to get the most popular repos first
        sort: 'stars',
        order: 'desc',
        perPage: 20
      });
      
      // Reset any previously loaded issues
      const cleanRepositories = response.items.map((repo: any) => ({
        id: repo.id,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        issues: undefined,
        isLoading: false
      }));
      
      setRepositories(cleanRepositories);
    } catch (err) {
      setError('Failed to fetch repositories');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRepositoryClick = async (repository: Repository) => {
    // If issues are already loaded, don't fetch again
    if (repository.issues) return;
    
    // Update the repository to show loading state
    setRepositories(prev => 
      prev.map(repo => 
        repo.id === repository.id 
          ? { ...repo, isLoading: true } 
          : repo
      )
    );
    
    try {
      // Extract owner and repo name from full_name (format: "owner/repo")
      const [owner, repo] = repository.full_name.split('/');
      const issues = await githubService.getRepositoryIssues(owner, repo);
      
      // Update the repository with the fetched issues
      setRepositories(prev => 
        prev.map(repo => 
          repo.id === repository.id 
            ? { ...repo, issues, isLoading: false } 
            : repo
        )
      );
    } catch (err) {
      console.error(`Error fetching issues for ${repository.full_name}:`, err);
      
      // Update the repository to show an error state
      setRepositories(prev => 
        prev.map(repo => 
          repo.id === repository.id 
            ? { ...repo, issues: [], isLoading: false } 
            : repo
        )
      );
    }
  };
  
  const handleTabChange = (tab: 'issues' | 'projects') => {
    setActiveTab(tab);
  };
  
  return (
    <div className="min-h-screen bg-secondary-100">
      <Header />
      
      <main className={`${UI.MAX_WIDTH} mx-auto ${UI.DEFAULT_PADDING}`}>
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white shadow-sm mb-8">
            <h1 className="text-2xl font-heading text-primary mb-2">Search Projects & Issues</h1>
            <p className="text-lg text-neutral-black">
              Find open source projects and issues that match your skills and interests.
            </p>
          </div>
          
          <EnhancedSearchBar onSearch={handleSearch} />
          
          <FilterContainer />
          
          {/* Tabs component */}
          <ProjectTabs activeTab={activeTab} onTabChange={handleTabChange} />
          
          {loading && (
            <div className="text-center py-8">
              <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-2 text-primary-light">Loading repositories...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center text-red-500 py-8">
              {error}
            </div>
          )}
          
          {repositories.length > 0 && !loading && (
            <div className="space-y-4">
              {repositories.map((repo) => (
                <RepositoryCard 
                  key={repo.id} 
                  repository={repo} 
                  viewMode={activeTab}
                  onRepositoryClick={handleRepositoryClick}
                />
              ))}
            </div>
          )}
          
          {repositories.length === 0 && !loading && !error && (
            <div className="text-center py-8 text-primary-light">
              Search for repositories to get started
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;