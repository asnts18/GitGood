import axios from 'axios';
import { GITHUB_API } from 'utils/constants';
import { DifficultyLevel, ProgrammingLanguage, TimeframeOption } from 'contexts/FilterContext'

// interface for filter options 
interface FilterOptions {
  difficulty?: DifficultyLevel | null;
  language?: ProgrammingLanguage | null;
  timeframe?: TimeframeOption | null;
}

class GitHubService {
  private api = axios.create({
    baseURL: GITHUB_API.BASE_URL,
    headers: GITHUB_API.DEFAULT_HEADERS,
  });

  async searchRepositories(searchTerm: string, filters?: FilterOptions) {
    try {
      // start with basic search term 
      let query = searchTerm;

      // add language filter if specified 
      if (filters?.language) {
        query += ` language:>${filters.language}`;
      }

      if (filters?.timeframe) {
        const dateRange = this.getDateRangeFromTimeframe(filters.timeframe);
        query += ` pushed:>${dateRange}`;
      }

      // add difficulty filter if specified 
      if (filters?.difficulty) {
        query += this.getDifficultyQueryParam(filters.difficulty);
      }


      const response = await this.api.get('/search/repositories', {
        params: {
          q: query,
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

  // Helper to convert timeframe to date string 
  private getDateRangeFromTimeframe(timeframe: TimeframeOption): string {
    const now = new Date(); 

    switch(timeframe) {
      case 'Last week':
        const lastWeek = new Date(now);
        lastWeek.setDate(now.getDate() - 7);
        return lastWeek.toISOString().split('T')[0];

        case 'Last'
    }
  }


}

export default GitHubService;