import axios from 'axios';
import { GITHUB_API } from 'utils/constants';
import { isEnglishText } from 'utils/language-detection-utility';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';


class GitHubService {
  // Use proxied API with our token for all requests
  private api = axios.create({
    baseURL: `${API_BASE_URL}/api/github`,
  });

  /**
   * Search for repositories with improved parameters and error handling
   */
  async searchRepositories({
    searchTerm, 
    language,
    organization,
    topic,
    difficultyLevel,
    sort = GITHUB_API.SEARCH.DEFAULT_SORT as 'stars' | 'forks' | 'help-wanted-issues' | 'updated',
    order = GITHUB_API.SEARCH.DEFAULT_ORDER as 'desc'| 'asc',
    perPage = GITHUB_API.SEARCH.DEFAULT_PER_PAGE,
    page = 1
  }: {
    searchTerm: string,
    language?: string,
    organization?: string,
    topic?: string,
    difficultyLevel?: string,
    sort?: 'stars' | 'forks' | 'help-wanted-issues' | 'updated',
    order?: 'desc' | 'asc',
    perPage?: number,
    page?: number
  }) {
    try {
      // Construct a more effective query
      let enhancedQuery = searchTerm.trim();
      
      // If the search term doesn't have qualifiers, enhance it
      if (!enhancedQuery.includes(':')) {
        // Check if this might be a specific repository search (contains a slash)
        if (enhancedQuery.includes('/')) {
          // For repo searches like "vuejs/vue", prioritize exact repo name matches
          const [owner, repo] = enhancedQuery.split('/');
          enhancedQuery = `${enhancedQuery} OR ${repo} in:name,description user:${owner}`;
        } else {
          // For term searches like "vue", search in name, description, and readme
          enhancedQuery = `${enhancedQuery} in:name,description`;
        }
      }
      
      // Add filters if they're not already in the query
      if (language && !enhancedQuery.includes(`language:`)) {
        enhancedQuery += ` language:${language}`;
      }
      
      if (organization && !enhancedQuery.includes(`org:`)) {
        enhancedQuery += ` org:${organization}`;
      }
      
      if (topic && !enhancedQuery.includes(`topic:`)) {
        enhancedQuery += ` topic:${topic}`;
      }
      
      if (difficultyLevel && !enhancedQuery.includes(`topic:${difficultyLevel}`)) {
        enhancedQuery += ` topic:${difficultyLevel}`;
      }
      
      // Parameters for the API request
      const params = {
        q: enhancedQuery,
        sort,
        order,
        per_page: perPage,
        page
      };

      const response = await this.api.get('search/repositories', { params });
      
      // Add debugging information in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`GitHub Search: "${enhancedQuery}" returned ${response.data.total_count} results`);
      }
      
      // Filter out repositories with majority non-Latin characters in description
      if (response.data && response.data.items) {
        response.data.items = response.data.items.filter((repo: any) => 
          isEnglishText(repo.description)
        );
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Error searching repositories:', error?.response?.data || error);
      
      // Check for rate limiting
      if (error.response?.status === 403 && error.response?.data?.message?.includes('rate limit')) {
        throw new Error('GitHub API rate limit exceeded. Please try again later.');
      }
      
      throw error;
    }
  }

  /**
   * Get issues for a repository with improved parameters
   */
  async getRepositoryIssues(
    owner: string, 
    repo: string, 
    options: {
      state?: 'open' | 'closed' | 'all',
      labels?: string, 
      sort?: 'created' | 'updated' | 'comments',
      direction?: 'asc' | 'desc',
      limit?: number
    } = {}
  ) {
    const { 
      state = 'open',
      labels,
      sort = 'updated',
      direction = 'desc',
      limit = 5
    } = options;
    
    try {
      const params: Record<string, any> = {
        state,
        sort,
        direction,
        per_page: limit
      };
      
      // Only add labels if specified
      if (labels) {
        params.labels = labels;
      }
      
      const response = await this.api.get(`repos/${owner}/${repo}/issues`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching issues for ${owner}/${repo}:`, error);
      throw error;
    }
  }
  
  /**
   * Get information about a specific repository
   */
  async getRepository(owner: string, repo: string) {
    try {
      const response = await this.api.get(`repos/${owner}/${repo}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching repository ${owner}/${repo}:`, error);
      throw error;
    }
  }

  /**
   * Get the current rate limit
   */
  async getRateLimit() {
    try {
      const response = await axios.get(`${API_BASE_URL}/rate-limit`);
      return response.data;
    } catch (error) {
      console.error('Error fetching rate limit:', error);
      throw error;
    }
  }
}

export default GitHubService;