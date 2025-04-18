import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  // Optional props if you want to customize the header
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'GitGood' }) => {
  const location = useLocation();
  
  // Function to check if the link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-secondary-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Centered title container */}
        <div className="flex justify-center mb-4">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold font-heading text-primary">{title}</h1>
          </Link>
        </div>
        
        {/* Navigation links (already centered) */}
        <nav className="flex justify-center space-x-8">
          <Link 
            to="/" 
            className={`${isActive('/') ? 'text-primary' : 'text-primary-light'} hover:text-primary font-medium`}
          >
            HOME
          </Link>
          <Link 
            to="/search" 
            className={`${isActive('/search') ? 'text-primary' : 'text-primary-light'} hover:text-primary font-medium`}
          >
            SEARCH
          </Link>
          <Link 
            to="/about" 
            className={`${isActive('/about') ? 'text-primary' : 'text-primary-light'} hover:text-primary font-medium`}
          >
            ABOUT
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;