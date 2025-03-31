import axios from 'axios';
import { GITHUB_API } from 'utils/constants';

class GitHubService {
  private api = axios.create({
    baseURL: GITHUB_API.BASE_URL,
    headers: GITHUB_API.DEFAULT_HEADERS,
  });

  async searchRepositories(searchTerm: string) {
    try {
      const response = await this.api.get('/search/repositories', {
        params: {
          q: searchTerm,
          sort: GITHUB_API.SEARCH.DEFAULT_SORT,
          order: GITHUB_API.SEARCH.DEFAULT_ORDER,
          per_page: GITHUB_API.SEARCH.DEFAULT_PER_PAGE
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching repositories:', error);
      throw error;
    }
  }

  async getRepositoryIssues(owner: string, repo: string, limit: number = 5) {
    try {
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