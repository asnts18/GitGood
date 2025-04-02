// utils/repo-scoring.ts

// This utility calculates friendliness scores for repositories
// based on various metrics like documentation quality, activity, etc.

interface RepoMetrics {
    hasReadme?: boolean;
    readmeLength?: number;
    hasContributing?: boolean;
    hasCodeOfConduct?: boolean;
    hasBeginnersLabel?: boolean;
    openIssuesCount?: number;
    lastCommitDate?: string;
    lastActivityDate?: string;
    issuesWithComments?: number;
    totalIssues?: number;
    responseTime?: number; // Average time to first response in hours
    starsCount?: number;
    forksCount?: number;
    watchersCount?: number;
  }
  
  interface FriendlinessScores {
    documentation: number;
    activity: number;
    community: number;
    issues: number;
  }
  
  /**
   * Calculate beginner-friendliness scores for a repository
   */
  export function calculateRepoFriendlinessScores(metrics: RepoMetrics): FriendlinessScores {
    return {
      documentation: calculateDocumentationScore(metrics),
      activity: calculateActivityScore(metrics),
      community: calculateCommunityScore(metrics),
      issues: calculateIssuesScore(metrics)
    };
  }
  
  /**
   * Calculate documentation score (0-5)
   */
  function calculateDocumentationScore(metrics: RepoMetrics): number {
    let score = 0;
    
    // Has a README
    if (metrics.hasReadme) {
      score += 2;
      
      // README is comprehensive
      if (metrics.readmeLength && metrics.readmeLength > 1000) {
        score += 1;
      }
    }
    
    // Has contributing guidelines
    if (metrics.hasContributing) {
      score += 1;
    }
    
    // Has code of conduct
    if (metrics.hasCodeOfConduct) {
      score += 1;
    }
    
    return Math.min(5, score);
  }
  
  /**
   * Calculate activity score (0-5)
   */
  function calculateActivityScore(metrics: RepoMetrics): number {
    let score = 2.5; // Start at middle
    
    // Check recency of commits
    if (metrics.lastCommitDate) {
      const lastCommit = new Date(metrics.lastCommitDate);
      const now = new Date();
      const daysSinceLastCommit = Math.floor((now.getTime() - lastCommit.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceLastCommit < 7) {
        score += 1.5; // Very active
      } else if (daysSinceLastCommit < 30) {
        score += 1; // Active
      } else if (daysSinceLastCommit < 90) {
        score += 0.5; // Somewhat active
      } else if (daysSinceLastCommit > 365) {
        score -= 1.5; // Very inactive
      } else if (daysSinceLastCommit > 180) {
        score -= 1; // Inactive
      }
    }
    
    // Factor in stars and forks as indicators of activity
    if (metrics.starsCount && metrics.starsCount > 1000) {
      score += 0.5;
    }
    
    if (metrics.forksCount && metrics.forksCount > 100) {
      score += 0.5;
    }
    
    return Math.max(0, Math.min(5, score));
  }
  
  /**
   * Calculate community score (0-5)
   */
  function calculateCommunityScore(metrics: RepoMetrics): number {
    let score = 2.5; // Start at middle
    
    // Response time to issues
    if (metrics.responseTime !== undefined) {
      if (metrics.responseTime < 24) {
        score += 1.5; // Response within a day
      } else if (metrics.responseTime < 72) {
        score += 0.5; // Response within three days
      } else if (metrics.responseTime > 168) {
        score -= 1; // Response takes more than a week
      }
    }
    
    // Percentage of issues with comments
    if (metrics.issuesWithComments !== undefined && metrics.totalIssues !== undefined && metrics.totalIssues > 0) {
      const commentRate = metrics.issuesWithComments / metrics.totalIssues;
      
      if (commentRate > 0.9) {
        score += 1;
      } else if (commentRate > 0.7) {
        score += 0.5;
      } else if (commentRate < 0.3) {
        score -= 0.5;
      }
    }
    
    // Stars as a proxy for community size
    if (metrics.starsCount) {
      if (metrics.starsCount > 5000) {
        score += 0.5;
      }
    }
    
    return Math.max(0, Math.min(5, score));
  }
  
  /**
   * Calculate issues organization score (0-5)
   */
  function calculateIssuesScore(metrics: RepoMetrics): number {
    let score = 2.5; // Start at middle
    
    // Has beginner-friendly labels
    if (metrics.hasBeginnersLabel) {
      score += 1.5;
    }
    
    // Has a healthy number of open issues
    if (metrics.openIssuesCount !== undefined) {
      if (metrics.openIssuesCount > 5 && metrics.openIssuesCount < 500) {
        score += 1; // Enough issues to work on, but not overwhelming
      } else if (metrics.openIssuesCount > 1000) {
        score -= 0.5; // Too many open issues might indicate poor maintenance
      }
    }
    
    return Math.max(0, Math.min(5, score));
  }
  
  /**
   * Generate estimated repo metrics from GitHub API response
   */
  export function generateRepoMetricsFromGitHub(repoData: any): RepoMetrics {
    // Extract all the metrics we can from the GitHub API response
    const metrics: RepoMetrics = {
      hasReadme: true, // Assume true since we can't easily check this from the basic API
      hasContributing: repoData.has_contributing_file || false,
      hasCodeOfConduct: repoData.has_code_of_conduct || false,
      hasBeginnersLabel: repoData.topics?.some((topic: string) => 
        ['beginner', 'beginner-friendly', 'good-first-issue', 'first-timers-only'].includes(topic)
      ) || false,
      openIssuesCount: repoData.open_issues_count,
      lastCommitDate: repoData.pushed_at || repoData.updated_at,
      lastActivityDate: repoData.updated_at,
      starsCount: repoData.stargazers_count,
      forksCount: repoData.forks_count,
      watchersCount: repoData.watchers_count
    };
    
    return metrics;
  }
  
  /**
   * Get estimated friendliness scores for a repo
   */
  export function getEstimatedRepoScores(repoData: any): FriendlinessScores {
    const metrics = generateRepoMetricsFromGitHub(repoData);
    return calculateRepoFriendlinessScores(metrics);
  }