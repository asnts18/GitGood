// GitHub API settings
export const GITHUB_API = {
    BASE_URL: 'https://api.github.com',
    DEFAULT_HEADERS: {
      Accept: 'application/vnd.github.v3+json',
    },
    SEARCH: {
      DEFAULT_PER_PAGE: 10,
      DEFAULT_SORT: 'stars',
      DEFAULT_ORDER: 'desc'
    }
  };
  
  // Filter options
  export const FILTER_OPTIONS = {
    DIFFICULTY: ['beginner', 'intermediate', 'advanced'] as const,
    LANGUAGES: ['C#', 'C++', 'Java', 'Javascript', 'Python', 'Typescript'] as const,
    TIMEFRAMES: ['Last week', 'Last month', 'Last 3 months', 'Last 6 months'] as const
  };
  
  // UI constants
  export const UI = {
    MAX_WIDTH: 'max-w-7xl',
    DEFAULT_PADDING: 'px-4 py-8',
    WELCOME_TEXT: 'Welcome to GitGood - Find your next open source contribution!'
  };