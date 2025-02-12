// src/services/githubService.ts
import axios from 'axios';

class GitHubService {
  private api = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  async searchRepositories(searchTerm: string) {
    try {
      const response = await this.api.get('/search/repositories', {
        params: {
          q: searchTerm,
          sort: 'stars',
          order: 'desc',
          per_page: 10
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching repositories:', error);
      throw error;
    }
  }
}

export default GitHubService;