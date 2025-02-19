import React, { useState } from 'react';
import { DifficultyButton } from "components/ui/difficulty-tag"
import SearchBar from './components/common/SearchBar';
import GitHubService from './services/github/GithubService';

const githubService = new GitHubService();

const App: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await githubService.searchRepositories(searchTerm);
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
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">GitGood</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <p className="text-lg text-gray-600">
            Welcome to GitGood - Find your next open source contribution!
          </p>
          <SearchBar onSearch={handleSearch} />

          <div className="flex space-x-2">
            <DifficultyButton level="beginner" onClick={() => console.log('Beginner clicked')} />
            <DifficultyButton level="intermediate" onClick={() => console.log('Intermediate clicked')} />
            <DifficultyButton level="advanced" onClick={() => console.log('Advanced clicked')} />
          </div>

          
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

export default App;