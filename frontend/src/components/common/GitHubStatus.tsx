import React from 'react';
import GitHubRateLimit from '../../services/github/GitHubRateLimit';
import { Shield, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const GitHubStatus: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-secondary-200/30 mb-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center mb-4">
        <Shield className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-lg font-heading text-primary font-medium">GitHub API Status</h2>
      </div>
      
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1 bg-secondary-50/70 rounded-xl p-4 border border-secondary-200/40 transition-all duration-300 hover:shadow-sm">
          <div className="flex items-center mb-2">
            <Info className="h-4 w-4 text-primary-light mr-2" />
            <h3 className="text-sm font-medium text-primary">Rate Limit Status</h3>
          </div>
          <GitHubRateLimit />
        </div>
        
        <div className="flex-1 bg-gradient-to-br from-green-50 to-green-100/70 rounded-xl p-4 border border-green-200/40 transition-all duration-300 hover:shadow-sm">
          <div className="flex items-center mb-2">
            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
            <h3 className="text-sm font-medium text-green-700">Token Information</h3>
          </div>
          
          <div className="flex items-start">
            <div className="mt-1">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <div className="ml-3">
              <p className="font-medium text-green-700">
                Using Personal Access Token
              </p>
              <p className="text-green-600/90 text-sm mt-1">
                All requests use the application's token with 5,000 requests/hour limit
              </p>
              <div className="mt-2 text-xs bg-green-200/50 p-2 rounded-md text-green-800 flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1.5 text-green-700" />
                This token provides higher rate limits than unauthenticated requests
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-secondary-200/30 flex justify-between items-center text-xs text-primary-light/70">
        <span>Last checked: {new Date().toLocaleTimeString()}</span>
        <a 
          href="https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-dark transition-colors hover:underline flex items-center"
        >
          Learn more about rate limits
        </a>
      </div>
    </div>
  );
};

export default GitHubStatus;