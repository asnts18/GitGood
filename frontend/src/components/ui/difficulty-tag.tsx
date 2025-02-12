import React from 'react';
import { Button } from "components/ui/button"

type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

interface DifficultyButtonProps {
  level: DifficultyLevel;
  onClick?: () => void;
  className?: string;
  selected?: boolean;
}

const getDifficultyStyles = (level: DifficultyLevel, selected: boolean = false) => {
  switch (level) {
    case 'beginner':
      return {
        variant: selected ? 'default' : 'outline',
        className: selected 
          ? 'bg-green-600 hover:bg-green-700 border border-green-600' 
          : 'text-green-600 hover:bg-green-100 border border-green-600'
      };
    case 'intermediate':
      return {
        variant: selected ? 'default' : 'outline',
        className: selected 
          ? 'bg-blue-600 hover:bg-blue-700 border border-blue-600' 
          : 'text-blue-600 hover:bg-blue-100 border border-blue-600'
      };
    case 'advanced':
      return {
        variant: selected ? 'default' : 'outline',
        className: selected 
          ? 'bg-purple-600 hover:bg-purple-700 border border-purple-600' 
          : 'text-purple-600 hover:bg-purple-100 border border-purple-600'
      };
  }
};

const DifficultyButton: React.FC<DifficultyButtonProps> = ({
  level,
  onClick,
  className = '',
  selected = false
}) => {
  const styles = getDifficultyStyles(level, selected);
  const text = level.charAt(0).toUpperCase() + level.slice(1);

  return (
    <Button
      variant={styles.variant as any}
      className={`${styles.className} ${className} min-w-32 transition-all duration-200`}
      onClick={onClick}
      size="sm"
    >
      {text}
    </Button>
  );
};

const DifficultySelector = () => {
  const [selectedLevel, setSelectedLevel] = React.useState<DifficultyLevel | null>(null);

  return (
    <div className="flex items-center justify-center p-4 space-x-8">
      <DifficultyButton
        level="beginner"
        selected={selectedLevel === 'beginner'}
        onClick={() => setSelectedLevel('beginner')}
        className="mr-8"
      />
      <DifficultyButton
        level="intermediate"
        selected={selectedLevel === 'intermediate'}
        onClick={() => setSelectedLevel('intermediate')}
        className="mr-8"
      />
      <DifficultyButton
        level="advanced"
        selected={selectedLevel === 'advanced'}
        onClick={() => setSelectedLevel('advanced')}
      />
    </div>
  );
};

export { DifficultyButton, DifficultySelector };