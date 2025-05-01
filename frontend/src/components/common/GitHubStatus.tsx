import React from 'react';
import GitHubRateLimit from '../../services/github/GitHubRateLimit';

const GitHubStatus: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <h2 className="text-lg font-heading text-primary mb-3">GitHub API Status</h2>
      
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <GitHubRateLimit />
        </div>
        
        <div className="flex-1">
          <div className="bg-green-50 rounded-lg p-3 text-sm">
            <div className="flex items-center">
              <div>
                <p className="font-medium text-green-700">
                  Using Personal Access Token
                </p>
                <p className="text-green-600 text-xs">
                  All requests use the application's token with 5,000 requests/hour limit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubStatus;