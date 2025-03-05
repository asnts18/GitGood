import React from 'react';

interface HeaderProps {
  // Optional props if you want to customize the header
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'GitGood' }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      </div>
    </header>
  );
};

export default Header;