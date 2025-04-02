import React from 'react';

type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | null;

interface DifficultyBadgeProps {
  difficulty: DifficultyLevel;
  className?: string;
  small?: boolean;
}

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ 
  difficulty, 
  className = '', 
  small = false 
}) => {
  if (!difficulty) return null;
  
  const getStyles = () => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  const formatDifficulty = (level: DifficultyLevel): string => {
    if (!level) return '';
    return level.charAt(0).toUpperCase() + level.slice(1);
  };
  
  return (
    <span 
      className={`
        ${getStyles()} 
        ${small ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
        inline-flex items-center rounded-full border
        font-medium
        ${className}
      `}
    >
      {formatDifficulty(difficulty)}
    </span>
  );
};

export default DifficultyBadge;