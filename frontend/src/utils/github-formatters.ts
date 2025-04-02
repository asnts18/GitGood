// utils/github-formatters.ts
import { FILTERS } from './constants';

interface RawRepository {
  id: number;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  open_issues_count: number;
  forks_count: number;
}

interface RawIssue {
  id: number;
  title: string;
  html_url: string;
  repository_url: string;
  created_at: string;
  updated_at: string;
  labels: Array<{
    id: number;
    name: string;
    color: string;
  }>;
  body: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

/**
 * Format raw repository data from GitHub API
 */
export function formatRepository(repo: RawRepository) {
  return {
    id: repo.id,
    full_name: repo.full_name,
    description: repo.description,
    html_url: repo.html_url,
    stargazers_count: repo.stargazers_count,
    language: repo.language,
    topics: repo.topics || [],
    updated_at: repo.updated_at,
    created_at: repo.created_at,
    open_issues_count: repo.open_issues_count,
    forks_count: repo.forks_count,
    issues: undefined,
    isLoading: false,
    // Analyze topics and derive difficulty level if available
    difficultyLevel: deriveRepositoryDifficulty(repo)
  };
}

/**
 * Format raw issue data from GitHub API
 */
export function formatIssue(issue: RawIssue) {
  // Extract repository name from URL
  const repoName = issue.repository_url.replace('https://api.github.com/repos/', '');
  
  return {
    id: issue.id,
    title: issue.title,
    html_url: issue.html_url,
    repository_url: issue.repository_url,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
    labels: issue.labels,
    summary: createSummary(issue.body),
    user: issue.user,
    // Derive difficulty from labels
    difficultyLevel: deriveIssueDifficulty(issue),
    repository: {
      full_name: repoName
    }
  };
}

/**
 * Create a short summary from the issue body
 */
function createSummary(body: string) {
  if (!body) return '';
  
  // Remove Markdown and limit to 150 characters
  const plainText = body
    .replace(/\r?\n|\r/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/[#*_`~]/g, '')
    .trim();
    
  return plainText.length > 150 
    ? plainText.substring(0, 147) + '...'
    : plainText;
}

/**
 * Derive difficulty level from repository topics
 */
function deriveRepositoryDifficulty(repo: RawRepository) {
  const topics = repo.topics || [];
  
  if (topics.includes('beginner') || topics.includes('beginner-friendly') || 
      topics.includes('first-timers-only') || topics.includes('good-first-issue')) {
    return 'beginner';
  }
  
  if (topics.includes('intermediate') || topics.includes('medium')) {
    return 'intermediate';
  }
  
  if (topics.includes('advanced') || topics.includes('hard')) {
    return 'advanced';
  }
  
  return null;
}

/**
 * Derive difficulty level from issue labels
 */
function deriveIssueDifficulty(issue: RawIssue) {
  const labelNames = issue.labels.map(label => label.name.toLowerCase());
  
  // Check for beginner labels
  for (const label of FILTERS.DIFFICULTY_LABELS.beginner) {
    if (labelNames.some(name => name.includes(label))) {
      return 'beginner';
    }
  }
  
  // Check for intermediate labels
  for (const label of FILTERS.DIFFICULTY_LABELS.intermediate) {
    if (labelNames.some(name => name.includes(label))) {
      return 'intermediate';
    }
  }
  
  // Check for advanced labels
  for (const label of FILTERS.DIFFICULTY_LABELS.advanced) {
    if (labelNames.some(name => name.includes(label))) {
      return 'advanced';
    }
  }
  
  return null;
}