import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* You can uncomment this when you create the repository detail page */}
        {/* <Route path="/repository/:id" element={<RepositoryDetailPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;