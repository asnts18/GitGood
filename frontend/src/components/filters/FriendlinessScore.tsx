import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface FriendlinessScoreProps {
  scores: {
    documentation: number;
    activity: number;
    community: number;
    issues: number;
  };
  className?: string;
}

const FriendlinessScore: React.FC<FriendlinessScoreProps> = ({ scores, className = '' }) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  
  // Calculate overall score (weighted average)
  const calculateOverallScore = () => {
    const weights = {
      documentation: 0.35, // Most important for beginners
      activity: 0.25,      // Active projects are better for beginners
      community: 0.25,     // Responsive community helps beginners
      issues: 0.15         // Good issue organization helps beginners
    };
    
    const weightedSum = 
      scores.documentation * weights.documentation +
      scores.activity * weights.activity +
      scores.community * weights.community +
      scores.issues * weights.issues;
    
    // Round to nearest half point
    return Math.round(weightedSum * 2) / 2;
  };
  
  const overall = calculateOverallScore();
  
  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-500';
    if (score >= 3) return 'text-blue-500';
    if (score >= 2) return 'text-amber-500';
    return 'text-red-500';
  };
  
  // Get label based on score
  const getFriendlinessLabel = (score: number) => {
    if (score >= 4.5) return 'Excellent';
    if (score >= 3.5) return 'Very Good';
    if (score >= 2.5) return 'Good';
    if (score >= 1.5) return 'Fair';
    return 'Poor';
  };
  
  // Get description for each score category
  const getTooltipContent = (category: string) => {
    switch (category) {
      case 'documentation':
        return 'Quality and completeness of README, contributing guidelines, and setup instructions';
      case 'activity':
        return 'How active the project is based on recent commits, merged PRs, and maintainer responsiveness';
      case 'community':
        return 'Community engagement, response time on issues, and helpfulness to newcomers';
      case 'issues':
        return 'Organization of issues, proper labeling, and presence of beginner-friendly issues';
      default:
        return '';
    }
  };
  
  // Render stars for a score
  const renderStars = (score: number) => {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-4 h-4 text-accent fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        
        {hasHalfStar && (
          <svg className="w-4 h-4 text-accent" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="halfStarGradient">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill="url(#halfStarGradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };
  
  return (
    <div className={`p-3 bg-secondary-50 rounded-lg ${className}`}>
      <h3 className="text-primary font-medium mb-2 flex items-center">
        Beginner Friendliness
      </h3>
      
      <div className="mb-4 flex items-center">
        <div className={`text-3xl font-bold ${getScoreColor(overall)}`}>
          {overall.toFixed(1)}
        </div>
        <div className="ml-2">
          <div className={`font-medium ${getScoreColor(overall)}`}>
            {getFriendlinessLabel(overall)}
          </div>
          <div className="text-xs text-gray-500">Overall Score</div>
        </div>
      </div>
      
      <div className="space-y-2">
        {Object.entries(scores).map(([category, score]) => (
          <div key={category} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm capitalize mr-1">{category}</span>
              <div 
                className="relative"
                onMouseEnter={() => setShowTooltip(category)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <HelpCircle className="h-3 w-3 text-gray-400" />
                {showTooltip === category && (
                  <div className="absolute z-10 w-48 p-2 bg-neutral-navy text-neutral-white text-xs rounded shadow-lg -left-24 bottom-full mb-1">
                    {getTooltipContent(category)}
                    <div className="absolute w-2 h-2 bg-neutral-navy transform rotate-45 left-24 -bottom-1"></div>
                  </div>
                )}
              </div>
            </div>
            {renderStars(score)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendlinessScore;