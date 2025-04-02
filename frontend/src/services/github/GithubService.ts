import axios from 'axios';
import { GITHUB_API } from 'utils/constants';
import { isEnglishText } from 'utils/language-detection-utility';

// Define interfaces for better type checking
export interface SearchParams {
  searchTerm: string;
  language?: string;
  organization?: string;
  topic?: string;
  customLabels?: string[];
  difficultyLevel?: string;
}

class GitHubService {
  private api = axios.create({
    baseURL: GITHUB_API.BASE_URL,
    headers: GITHUB_API.DEFAULT_HEADERS,
  });

  /**
   * Search for repositories with enhanced filtering
   */
  async searchRepositories(searchParams: SearchParams) {
    try {
      let query = "";
      
      // Add search term as a generic search if it exists
      if (searchParams.searchTerm.trim()) {
        query += searchParams.searchTerm.trim();
      }
      
      // Always include is:open for repositories
      query += " is:open type:repository";
      
      // Add language filter if provided
      if (searchParams.language) {
        query += ` language:${searchParams.language}`;
      }
      
      // Add organization filter if provided
      if (searchParams.organization) {
        query += ` org:${searchParams.organization}`;
      }
      
      // Add topic filter if provided
      if (searchParams.topic) {
        query += ` topic:${searchParams.topic}`;
      }
      
      // Add difficulty level as a topic
      if (searchParams.difficultyLevel) {
        // Add different variations of beginner-friendly topics
        if (searchParams.difficultyLevel === 'beginner') {
          query += ` topic:${searchParams.difficultyLevel} OR topic:beginner-friendly OR topic:good-first-issue OR topic:first-timers-only`;
        } else {
          query += ` topic:${searchParams.difficultyLevel}`;
        }
      }

      // Add custom labels if provided
      if (searchParams.customLabels && searchParams.customLabels.length > 0) {
        searchParams.customLabels.forEach(label => {
          query += ` ${label}`;
        });
      }

      // Filter for repositories with English content
      if (!query.includes("in:name,description,readme")) {
        query += " in:name,description,readme";
      }
      
      // Exclude archived repositories
      query += " archived:false";
      
      console.log("GitHub API Query:", query); // For debugging
      
      const response = await this.api.get('/search/repositories', {
        params: {
          q: query,
          sort: GITHUB_API.SEARCH.DEFAULT_SORT, // stars, forks, updated
          order: GITHUB_API.SEARCH.DEFAULT_ORDER, // desc
          per_page: GITHUB_API.SEARCH.DEFAULT_PER_PAGE * 2 // Fetch more to allow for filtering
        },
      });
      
      // Filter out repositories with non-English descriptions
      const filteredItems = response.data.items.filter((repo: any) => 
        isEnglishText(repo.description)
      ).slice(0, GITHUB_API.SEARCH.DEFAULT_PER_PAGE); // Take only the first N items
      
      return {
        ...response.data,
        items: filteredItems
      };
    } catch (error) {
      console.error('Error searching repositories:', error);
      throw error;
    }
  }

  /**
   * Get issues for a repository with original implementation
   */
  async getRepositoryIssues(owner: string, repo: string, limit: number = 5) {
    try {
      // Use the standard endpoint for better relevance
      const response = await this.api.get(`/repos/${owner}/${repo}/issues`, {
        params: {
          state: 'open',
          sort: 'updated',
          direction: 'desc',
          per_page: limit
        },
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching issues for ${owner}/${repo}:`, error);
      throw error;
    }
  }
}

export default GitHubService;