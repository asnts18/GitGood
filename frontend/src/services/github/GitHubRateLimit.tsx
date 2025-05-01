import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import GitHubService from '../../services/github/GithubService';

interface RateLimitData {
  resources: {
    core: {
      limit: number;
      remaining: number;
      reset: number;
    }
  }
}

const githubService = new GitHubService();

const GitHubRateLimit: React.FC = () => {
  const [rateLimit, setRateLimit] = useState<RateLimitData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRateLimit = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await githubService.getRateLimit();
        setRateLimit(response);
      } catch (err) {
        console.error('Error fetching rate limit:', err);
        setError('Failed to fetch rate limit info');
      } finally {
        setLoading(false);
      }
    };

    fetchRateLimit();
    
    // Refresh rate limit data every 5 minutes
    const intervalId = setInterval(fetchRateLimit, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return null;
  if (error || !rateLimit) return null;

  const { limit, remaining, reset } = rateLimit.resources.core;

  // Calculate remaining percentage
  const remainingPercentage = (remaining / limit) * 100;
  
  // Format reset time
  const resetTime = new Date(reset * 1000).toLocaleTimeString();
  
  // Determine color based on remaining requests
  const getColor = () => {
    if (remainingPercentage > 50) return 'text-green-500';
    if (remainingPercentage > 25) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-secondary-50 rounded-lg p-3 text-sm">
      <div className="flex items-center mb-1">
        <AlertCircle className={`${getColor()} h-4 w-4 mr-1`} />
        <span className="font-medium">GitHub API Rate Limit</span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>Remaining:</span>
          <span className={getColor()}>
            {remaining} / {limit}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`${getColor().replace('text', 'bg')} h-2 rounded-full`}
            style={{ width: `${remainingPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Resets at: {resetTime}</span>
          <span>Using application token</span>
        </div>
      </div>
    </div>
  );
};

export default GitHubRateLimit;