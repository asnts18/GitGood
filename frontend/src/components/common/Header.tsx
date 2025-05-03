import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HelpCircle, Home, Search, Info, Menu, X } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'GitGood' }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Function to check if the link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Nav item component for cleaner markup
  const NavItem = ({ to, icon, label }: { to: string; icon?: React.ReactNode; label: string }) => (
    <Link 
      to={to} 
      className={`group relative px-4 py-2 rounded-lg transition-all duration-300 ${
        isActive(to) 
          ? 'text-primary font-semibold' 
          : 'text-primary-light hover:text-primary font-medium'
      }`}
      onClick={() => setMobileMenuOpen(false)}
    >
      <div className="flex items-center space-x-1.5">
        {icon}
        <span>{label}</span>
      </div>
      
      {/* Active indicator line */}
      <div 
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 rounded-full ${
          isActive(to) ? 'w-3/4 opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-70'
        }`}
      ></div>
    </Link>
  );

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-secondary-100 shadow-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="group flex items-center transition-transform duration-300 hover:scale-105"
            >
              {/* You could add a logo image here */}
              <div className="bg-primary rounded-lg p-2 mr-2 shadow-sm group-hover:shadow-md transition-all duration-300">
                <span className="text-white font-bold text-xl">GG</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-heading text-primary group-hover:text-primary-dark transition-colors duration-300">
                {title}
              </h1>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-primary hover:bg-secondary-200/70 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavItem to="/" icon={<Home className="h-4 w-4" />} label="HOME" />
            <NavItem to="/search" icon={<Search className="h-4 w-4" />} label="SEARCH" />
            <NavItem to="/getting-started" icon={<HelpCircle className="h-4 w-4" />} label="GUIDE" />
            <NavItem to="/about" icon={<Info className="h-4 w-4" />} label="ABOUT" />
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-60 mt-4 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-2 py-2">
            <NavItem to="/" icon={<Home className="h-4 w-4" />} label="HOME" />
            <NavItem to="/search" icon={<Search className="h-4 w-4" />} label="SEARCH" />
            <NavItem to="/getting-started" icon={<HelpCircle className="h-4 w-4" />} label="GUIDE" />
            <NavItem to="/about" icon={<Info className="h-4 w-4" />} label="ABOUT" />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;