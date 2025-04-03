// Enhanced utility for English language detection with improved accuracy

/**
 * Check if a string is likely in English
 * Uses multiple heuristics to reduce false negatives while still filtering non-English content
 */
export function isEnglishText(text: string | null | undefined): boolean {
    if (!text || text.trim().length === 0) return true; // Empty text passes by default
    
    // If text is very short (like "CLI" or "API"), assume it's valid
    if (text.length < 10) return true;
    
    // Convert to lowercase for easier comparison
    const lowerText = text.toLowerCase();
    
    // Expanded list of common English words
    const commonEnglishWords = [
      'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'in', 'on', 'at',
      'to', 'for', 'with', 'by', 'as', 'of', 'this', 'that', 'it', 'from', 'be',
      'have', 'has', 'had', 'do', 'does', 'did', 'can', 'could', 'will', 'would',
      'should', 'not', 'you', 'use', 'using', 'used', 'simple', 'easy', 'library',
      'project', 'code', 'data', 'time', 'app', 'application', 'web', 'make',
      'create', 'build', 'tool', 'api', 'cli', 'user', 'github', 'repository', 'repo'
    ];
    
    // Count how many common words appear in the text
    let commonWordCount = 0;
    for (const word of commonEnglishWords) {
      const pattern = new RegExp(`\\b${word}\\b`, 'i');
      if (pattern.test(lowerText)) {
        commonWordCount++;
      }
    }
    
    // Extract words to analyze text structure
    const words = text.split(/\s+/);
    
    // Check if text contains code snippets or URLs which might lack natural language patterns
    const hasCodeOrUrls = /[{}\[\]<>\/\\=]/.test(text) || 
                           /https?:\/\//.test(text) ||
                           text.includes('`') ||
                           text.includes('/*') ||
                           text.includes('*/');
    
    // Check for Latin alphabet character ratio
    const latinChars = (text.match(/[a-zA-Z]/g) || []).length;
    const totalChars = text.length;
    const latinRatio = latinChars / totalChars;
    
    // Check for presence of non-Latin scripts
    const hasCJK = /[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/g.test(text);
    const hasCyrillic = /[\u0400-\u04FF]/g.test(text);
    const hasArabic = /[\u0600-\u06FF]/g.test(text);
    const hasNonLatin = hasCJK || hasCyrillic || hasArabic;
    
    // Technical terms often use camelCase or snake_case
    const hasTechNaming = /[a-z][A-Z]/.test(text) || /_[a-z]/.test(text);
    
    // Calculate percentage of non-Latin characters
    const nonLatinRatio = hasNonLatin ? 1 - latinRatio : 0;
    
    // Check if the text appears to be code or technical documentation
    const isTechnical = hasCodeOrUrls || hasTechNaming;
    
    // A more nuanced approach to determining if text is English:
    
    // If it's clearly dominated by non-Latin scripts, it's likely not English
    if (nonLatinRatio > 0.5) {
      return false;
    }
    
    // Technical content gets more lenient treatment
    if (isTechnical) {
      // For technical content, require fewer common words
      return commonWordCount >= 1 || latinRatio > 0.6;
    }
    
    // For regular natural language text
    // Accept if enough common English words are found OR high Latin character ratio
    return commonWordCount >= 2 || latinRatio > 0.7;
  }