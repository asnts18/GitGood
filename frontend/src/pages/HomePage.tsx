import React, { useState } from 'react';
import Header from 'components/common/Header';
import SearchBar from 'components/common/SearchBar';
import GitHubService from 'services/github/GithubService';
import { FilterContainer } from 'components/filters/FilterContainer';
import { UI } from 'utils/constants';
import ProjectTabs from 'components/common/ProjectTabs';
import RepositoryCard, { Repository, Issue } from 'components/common/RepositoryCard';

const githubService = new GitHubService();

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'issues' | 'projects'>('projects');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await githubService.searchRepositories(searchTerm);
      
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className={`${UI.MAX_WIDTH} mx-auto ${UI.DEFAULT_PADDING}`}>
        <div className="space-y-6">
          <p className="text-lg text-gray-600">
            {UI.WELCOME_TEXT}
          </p>
          <SearchBar onSearch={handleSearch} />
          
          <FilterContainer />
          
          {/* Add the tabs component */}
          <ProjectTabs activeTab={activeTab} onTabChange={handleTabChange} />
          
          {loading && (
            <div className="text-center py-8">
              <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-2">Loading repositories...</p>
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
            <div className="text-center py-8 text-gray-500">
              Search for repositories to get started
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;