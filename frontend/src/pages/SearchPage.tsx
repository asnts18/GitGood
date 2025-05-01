import React, { useState, useEffect } from 'react';
import Header from 'components/common/Header';
import EnhancedSearchBar from '../components/common/EnhancedSearchBar';
import GitHubService from 'services/github/GithubService'; // Use updated service with token
import { FilterContainer } from 'components/filters/FilterContainer';
import { UI } from 'utils/constants';
import ProjectTabs from 'components/common/ProjectTabs';
import RepositoryCard, { Repository, Issue } from 'components/common/RepositoryCard';
import { useFilters } from 'contexts/FilterContext';
import Pagination from 'components/common/Pagination';
import GitHubStatus from 'components/common/GitHubStatus';

const githubService = new GitHubService();

const SearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'issues' | 'projects'>('projects');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const ITEMS_PER_PAGE = 10;
  
  // Active search parameters
  const [activeSearch, setActiveSearch] = useState<{
    searchTerm: string,
    language?: string,
    organization?: string,
    topic?: string,
    difficultyLevel?: string
  } | null>(null);
  
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
    // Reset pagination on new search
    setCurrentPage(1);
    
    // Save active search parameters for pagination
    const searchParams = {
      searchTerm: searchData.searchTerm.trim(),
      language: searchData.language || selectedLanguage || undefined,
      organization: searchData.organization,
      topic: searchData.topic,
      difficultyLevel: selectedDifficulty || undefined
    };
    
    setActiveSearch(searchParams);
    
    // Execute the search
    executeSearch(searchParams, 1);
  };
  
  const executeSearch = async (searchParams: {
    searchTerm: string,
    language?: string,
    organization?: string,
    topic?: string,
    difficultyLevel?: string
  }, page: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Use the improved searchRepositories method that accepts an object
      const response = await githubService.searchRepositories({
        ...searchParams,
        // Ensure we sort by stars to get the most popular repos first
        sort: 'stars',
        order: 'desc',
        perPage: ITEMS_PER_PAGE,
        page
      });
      
      // Update total results and pages
      setTotalResults(response.total_count);
      setTotalPages(Math.ceil(response.total_count / ITEMS_PER_PAGE));
      
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
    } catch (err: any) {
      if (err.message && err.message.includes('rate limit')) {
        setError('GitHub API rate limit exceeded. Please try again later.');
      } else {
        setError('Failed to fetch repositories');
      }
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePageChange = (page: number) => {
    if (page !== currentPage && activeSearch) {
      setCurrentPage(page);
      executeSearch(activeSearch, page);
      
      // Scroll to top of results
      window.scrollTo({
        top: document.getElementById('search-results')?.offsetTop || 0,
        behavior: 'smooth'
      });
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
  
  // Re-execute search when filters change
  useEffect(() => {
    if (activeSearch) {
      const updatedSearch = {
        ...activeSearch,
        language: activeSearch.language || selectedLanguage || undefined,
        difficultyLevel: selectedDifficulty || undefined
      };
      
      setActiveSearch(updatedSearch);
      executeSearch(updatedSearch, currentPage);
    }
  }, [selectedDifficulty, selectedLanguage, selectedTimeframe]);
  
  return (
    <div className="min-h-screen bg-secondary-100">
      <Header />
      
      <main className={`${UI.MAX_WIDTH} mx-auto ${UI.DEFAULT_PADDING}`}>
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-secondary-50 shadow-sm mb-8">
            <h1 className="text-2xl font-heading text-primary mb-2">Search Projects & Issues</h1>
            <p className="text-lg text-neutral-black">
              Find open source projects and issues that match your skills and interests.
            </p>
          </div>
          
          {/* GitHub Status - shows app token information */}
          <GitHubStatus />
          
          <EnhancedSearchBar onSearch={handleSearch} />
          
          <FilterContainer />
          
          {/* Tabs component */}
          <ProjectTabs activeTab={activeTab} onTabChange={handleTabChange} />
          
          {/* Search Results Summary */}
          {totalResults > 0 && !loading && (
            <div className="text-primary-light text-sm mt-4">
              Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, totalResults)} of {totalResults} results
            </div>
          )}
          
          {/* Results container */}
          <div id="search-results" className="min-h-[300px]">
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
          
          {/* Pagination */}
          {repositories.length > 0 && totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;