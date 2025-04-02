// utils/constants.ts

// GitHub API Constants
export const GITHUB_API = {
  BASE_URL: 'https://api.github.com',
  DEFAULT_HEADERS: {
    'Accept': 'application/vnd.github.v3+json',
    // Add your GitHub token here if needed:
    // 'Authorization': 'token YOUR_GITHUB_TOKEN'
  },
  SEARCH: {
    DEFAULT_SORT: 'stars', // stars, forks, updated, help-wanted-issues
    DEFAULT_ORDER: 'desc',
    DEFAULT_PER_PAGE: 20,
    MAX_PER_PAGE: 100
  }
};

// UI Constants
export const UI = {
  MAX_WIDTH: 'max-w-6xl',
  DEFAULT_PADDING: 'px-4 py-6',
  WELCOME_TEXT: 'Find open source projects and issues based on your skill level and interests.',
  DIFFICULTY_LEVELS: {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced'
  }
};

// Filter Constants
export const FILTERS = {
  DIFFICULTY_LABELS: {
    [UI.DIFFICULTY_LEVELS.BEGINNER]: [
      'good first issue',
      'good-first-issue',
      'beginner',
      'beginner-friendly',
      'easy'
    ],
    [UI.DIFFICULTY_LEVELS.INTERMEDIATE]: [
      'intermediate',
      'medium'
    ],
    [UI.DIFFICULTY_LEVELS.ADVANCED]: [
      'advanced',
      'hard',
      'complex'
    ]
  },
  STATUS_LABELS: {
    ACTIVE: 'status: active',
    HELP_WANTED: 'help wanted'
  }
};