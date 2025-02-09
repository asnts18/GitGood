import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">GitGood</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <p>Welcome to GitGood - Find your next open source contribution!</p>
      </main>
    </div>
  );
};

export default App;