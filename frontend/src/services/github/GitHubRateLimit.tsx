import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock, RefreshCw } from 'lucide-react';
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
  const [isRetrying, setIsRetrying] = useState(false);

  // Fallback data
  const mockData = {
    remaining: 4378,
    limit: 5000,
    resetTime: new Date(Date.now() + 45 * 60000) // 45 min from now
  };

  const fetchRateLimit = async () => {
    try {
      if (!isRetrying) setLoading(true);
      else setIsRetrying(true);
      
      console.log('Attempting to fetch rate limit...');
      const response = await githubService.getRateLimit();
      console.log('Rate limit response:', response);
      setRateLimit(response);
      setError(null);
    } catch (err) {
      // TypeScript-friendly error logging
      console.error('Error fetching rate limit:', err);
      
      // Use type assertion or optional chaining
      const error = err as any;
      console.log('Error message:', error?.message || 'Unknown error');
      console.log('Error response:', error?.response || 'No response data');
      
      setError('Failed to fetch rate limit info');
    } finally {
      setLoading(false);
      setIsRetrying(false);
    }
  };

  const handleRetry = () => {
    setIsRetrying(true);
    fetchRateLimit();
  };

  useEffect(() => {
    fetchRateLimit();
    
    // Refresh rate limit data every 3 minutes
    const intervalId = setInterval(fetchRateLimit, 3 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Determines color based on remaining percentage
  const getColorClass = (remaining: number, limit: number) => {
    const remainingPercentage = (remaining / limit) * 100;
    if (remainingPercentage > 50) return "bg-green-500";
    if (remainingPercentage > 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading && !isRetrying) {
    return (
      <div className="animate-pulse flex flex-col space-y-3">
        <div className="h-4 bg-secondary-200/60 rounded w-full"></div>
        <div className="h-2 bg-secondary-200/60 rounded w-full"></div>
        <div className="h-3 bg-secondary-200/60 rounded w-3/4"></div>
      </div>
    );
  }

  // Use real data if available, otherwise fallback
  if (rateLimit && !error) {
    const { limit, remaining, reset } = rateLimit.resources.core;
    const remainingPercentage = (remaining / limit) * 100;
    const resetTime = new Date(reset * 1000);
    const formattedResetTime = resetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const now = new Date();
    const minutesRemaining = Math.round((resetTime.getTime() - now.getTime()) / 60000);

    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-primary-dark">Remaining Requests:</span>
          <span className={remainingPercentage < 25 ? "text-red-600 font-medium" : "text-primary"}>
            {remaining.toLocaleString()} / {limit.toLocaleString()}
          </span>
        </div>
        
        <div className="w-full bg-secondary-100 rounded-full h-2">
          <div
            className={`${getColorClass(remaining, limit)} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${remainingPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center text-xs text-primary-light">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>Resets at {formattedResetTime}</span>
          </div>
          <span>{minutesRemaining > 0 ? `${minutesRemaining} min remaining` : "Resetting soon..."}</span>
        </div>
      </div>
    );
  }

  // Fallback UI when there's an error
  return (
    <div className="space-y-3">
      <div className="text-red-600 text-sm flex items-center mb-2">
        <AlertCircle className="h-4 w-4 mr-2" />
        Unable to fetch live rate limit data
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-primary-dark">Estimated remaining:</span>
        <span className="text-primary">~{mockData.remaining} / {mockData.limit}</span>
      </div>
      
      <div className="w-full bg-secondary-100 rounded-full h-2 mt-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(mockData.remaining / mockData.limit) * 100}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center mt-2">
      <button 
            onClick={handleRetry} 
            disabled={isRetrying}
            className={`text-xs flex items-center gap-1 transition-colors ${
                isRetrying ? 'text-primary-light cursor-not-allowed' : 'text-primary hover:text-primary-dark'
            }`}
            >
            {isRetrying ? (
                <>
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span>Connecting...</span>
                </>
            ) : (
                <>
                <RefreshCw className="h-3 w-3" />
                <span>Retry connection</span>
                </>
            )}
        </button>

        <span className="text-xs text-primary-light flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          Using fallback data
        </span>
      </div>
    </div>
  );
};

export default GitHubRateLimit;