import React, { useState } from 'react';
import Header from 'components/common/Header';
import EnhancedSearchBar3 from '../components/common/EnhancedSearchBar3';
import GitHubService from 'services/github/GithubService';
import { FilterContainer } from 'components/filters/FilterContainer';
import { UI } from 'utils/constants';

const githubService = new GitHubService();

const HomePage: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSearch = async (searchData: {
    searchTerm: string,
    language?: string,
    organization?: string
  }) => {
    if (!searchData.searchTerm.trim() && !searchData.language && !searchData.organization) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Build GitHub search query with filters
      let query = searchData.searchTerm;
      
      if (searchData.language) {
        query += ` language:${searchData.language}`;
      }
      
      if (searchData.organization) {
        query += ` org:${searchData.organization}`;
      }
      
      const response = await githubService.searchRepositories(query);
      setResults(response.items);
    } catch (err) {
      setError('Failed to fetch repositories');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className={`${UI.MAX_WIDTH} mx-auto ${UI.DEFAULT_PADDING}`}>
        <div className="space-y-6">
          <p className="text-lg text-gray-600">
            {UI.WELCOME_TEXT}
          </p>
          
          <EnhancedSearchBar3 onSearch={handleSearch} />
          
          <FilterContainer />

          {loading && (
            <div className="text-center">
              <p>Loading...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center text-red-500">
              {error}
            </div>
          )}
          
          {results.length > 0 && (
            <div className="space-y-4">
              {results.map((repo) => (
                <div key={repo.id} className="p-4 bg-white rounded-lg shadow">
                  <h2 className="text-xl font-semibold">
                    <a 
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {repo.full_name}
                    </a>
                  </h2>
                  <p className="text-gray-600 mt-2">{repo.description}</p>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span>⭐ {repo.stargazers_count}</span>
                    {repo.language && <span>• {repo.language}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;