import React from 'react';
import SearchBar from './components/common/SearchBar';

const App: React.FC = () => {
  const handleSearch = (searchTerm: string) => {
    // Handle search logic here
    console.log('Searching for:', searchTerm);
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
        </div>
      </main>
    </div>
  );
};

export default App;