import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Add more routes here as you create more pages */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* <Route path="/repository/:id" element={<RepositoryDetailPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;