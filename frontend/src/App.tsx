import React from 'react';
<<<<<<< HEAD
import SearchBar from './components/common/SearchBar';
=======
import { Button } from './components/ui/button'


>>>>>>> 9d573a6069b8b76983288f2e4605262d0be8bc47

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
<<<<<<< HEAD
        <div className="space-y-6">
          <p className="text-lg text-gray-600">
            Welcome to GitGood - Find your next open source contribution!
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
=======
        <p>Welcome to GitGood - Find your next open source contribution!</p>
        <Button variant="outline">Button</Button>

>>>>>>> 9d573a6069b8b76983288f2e4605262d0be8bc47
      </main>
    </div>
  );
};

export default App;