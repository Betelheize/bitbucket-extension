// Bitbucket Commit Highlighter
// Highlights commit messages with different colors based on prefixes

// Define commit message patterns and their corresponding colors
const commitPatterns = {
  'fix:': '#ffc107',      // Yellow for bug fixes
  'feat:': '#6f42c1',     // Purple for new features
  'docs:': '#17a2b8',     // Blue for documentation
  'style:': '#ffc107',    // Yellow for formatting
  'refactor:': '#6f42c1', // Purple for refactoring
  'test:': '#fd7e14',     // Orange for tests
  'chore:': '#6c757d',    // Gray for maintenance
  'perf:': '#e83e8c',     // Pink for performance
  'ci:': '#20c997',       // Teal for CI/CD
  'build:': '#fd7e14',    // Orange for build
  'revert:': '#6c757d',   // Gray for reverts
  'MERGED': '#28a745',    // Green for merged commits (commits only)
  'feat/': '#6f42c1',     // Purple for new features
  'fix/': '#ffc107',      // Yellow for bug fixes
  'docs/': '#17a2b8',     // Blue for documentation
  'style/': '#ffc107',    // Yellow for formatting
  'refactor/': '#6f42c1', // Purple for refactoring
  'test/': '#fd7e14',     // Orange for tests
  'chore/': '#6c757d',    // Gray for maintenance
  'feature/': '#6f42c1',  // Purple for new features
  'bug/': '#ffc107',      // Yellow for bug fixes
};

// Global page detection variables
let isCommitsPage = false;
let isBranchesPage = false;

// Function to update page detection
function updatePageDetection() {
  isCommitsPage = window.location.href.includes('/commits/');
  isBranchesPage = window.location.href.includes('/branches/');
}

// Function to highlight commit messages
function highlightCommitMessages() {
  // Update page detection
  updatePageDetection();
  
  // Look for commit message elements in different contexts
  const selectors = [
    // Commits page - main commit messages
    'a[data-testid="commit-message"]',
    'a[href*="/commits/"]',
    // Branch page - commit messages in table
    'td a[href*="/commits/"]',
    'td a[href*="/commits/"] span',
    // Pull request commits
    'a[data-testid="commit-message"] span',
    // General commit links
    'a[href*="/commits/"]:not([data-testid])',
    // Specific Bitbucket table structure - Summary column
    '.css-1tcga9b span',
    // Specific Bitbucket table structure - Message column
    '.css-19mqx9h .css-1tcga9b span',
    // Alternative selectors for commit messages in tables
    'td .css-1tcga9b span',
    'td .css-19mqx9h span',
    // Branch names in branches table - multiple possible selectors
    '.css-1nso09x',
    'a[href*="/branch/"]',
    'a[href*="/branch/"]:not([data-testid])',
    // Additional branch selectors
    'td a[href*="/branch/"]',
    'td .css-1dsov5g a',
    '.css-1dsov5g a[href*="/branch/"]'
  ];

  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      const text = element.textContent || element.innerText;
      
      // Check if this element has already been processed
      if (element.classList.contains('commit-highlighted')) {
        return;
      }

      // Check each pattern
      for (const [pattern, color] of Object.entries(commitPatterns)) {
        // Skip MERGED pattern on branches page
        if (pattern === 'MERGED' && isBranchesPage) {
          continue;
        }
        
        if (text.toLowerCase().startsWith(pattern.toLowerCase())) {
          // Add highlighting class and style with enhanced glass morphism effect
          element.classList.add('commit-highlighted');
          
          // Create a more sophisticated glass effect
          element.style.background = `linear-gradient(135deg, ${color}15 0%, ${color}08 50%, ${color}20 100%)`;
          element.style.color = color;
          element.style.padding = '6px 12px';
          element.style.borderRadius = '12px';
          element.style.fontWeight = '600';
          element.style.fontSize = '0.9em';
          element.style.letterSpacing = '0.3px';
          element.style.textShadow = '0 1px 3px rgba(0,0,0,0.2)';
          element.style.display = 'inline-block';
          element.style.margin = '3px 6px';
          element.style.backdropFilter = 'blur(16px) saturate(180%)';
          element.style.webkitBackdropFilter = 'blur(16px) saturate(180%)';
          element.style.border = `1px solid ${color}35`;
          element.style.boxShadow = `
            0 8px 32px rgba(0,0,0,0.12),
            0 4px 16px rgba(0,0,0,0.08),
            0 2px 8px rgba(0,0,0,0.06),
            inset 0 1px 0 ${color}40,
            inset 0 -1px 0 rgba(255,255,255,0.1)
          `;
          element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
          element.style.position = 'relative';
          element.style.overflow = 'hidden';
          element.style.isolation = 'isolate';
          
          // Add subtle inner glow
          element.style.setProperty('--glow-color', color);
          element.style.setProperty('--glow-opacity', '0.3');
          
          // Add hover effect with enhanced glass morphism
          element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
            this.style.background = `linear-gradient(135deg, ${color}25 0%, ${color}15 50%, ${color}30 100%)`;
            this.style.boxShadow = `
              0 12px 40px rgba(0,0,0,0.15),
              0 6px 20px rgba(0,0,0,0.1),
              0 3px 12px rgba(0,0,0,0.08),
              inset 0 1px 0 ${color}60,
              inset 0 -1px 0 rgba(255,255,255,0.2),
              0 0 20px ${color}30
            `;
            this.style.border = `1px solid ${color}50`;
            this.style.backdropFilter = 'blur(20px) saturate(200%)';
            this.style.webkitBackdropFilter = 'blur(20px) saturate(200%)';
          });
          
          element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.background = `linear-gradient(135deg, ${color}15 0%, ${color}08 50%, ${color}20 100%)`;
            this.style.boxShadow = `
              0 8px 32px rgba(0,0,0,0.12),
              0 4px 16px rgba(0,0,0,0.08),
              0 2px 8px rgba(0,0,0,0.06),
              inset 0 1px 0 ${color}40,
              inset 0 -1px 0 rgba(255,255,255,0.1)
            `;
            this.style.border = `1px solid ${color}35`;
            this.style.backdropFilter = 'blur(16px) saturate(180%)';
            this.style.webkitBackdropFilter = 'blur(16px) saturate(180%)';
          });
          
          // Add focus effect for accessibility
          element.addEventListener('focus', function() {
            this.style.outline = 'none';
            this.style.boxShadow = `
              0 8px 32px rgba(0,0,0,0.12),
              0 4px 16px rgba(0,0,0,0.08),
              0 2px 8px rgba(0,0,0,0.06),
              inset 0 1px 0 ${color}40,
              inset 0 -1px 0 rgba(255,255,255,0.1),
              0 0 0 3px ${color}30
            `;
          });
          
          break;
        }
      }
    });
  });
}

// Function to observe DOM changes and highlight new commit messages
function observeAndHighlight() {
  const observer = new MutationObserver((mutations) => {
    let shouldHighlight = false;
    
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Check if any added nodes contain commit-related content
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.querySelector && (
              node.querySelector('a[href*="/commits/"]') ||
              node.querySelector('a[data-testid="commit-message"]') ||
              node.querySelector('.css-1tcga9b') ||
              node.querySelector('.css-19mqx9h') ||
              node.querySelector('.css-1nso09x') ||
              node.querySelector('a[href*="/branch/"]')
            )) {
              shouldHighlight = true;
            }
          }
        });
      }
    });
    
    if (shouldHighlight) {
      setTimeout(highlightCommitMessages, 100);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Initialize highlighting
function init() {
  // Initial highlight
  highlightCommitMessages();
  
  // Set up observer for dynamic content
  observeAndHighlight();
  
  // Re-highlight periodically for safety (in case of missed mutations)
  setInterval(highlightCommitMessages, 2000);
  
  // Additional periodic check specifically for branches page
  setInterval(() => {
    if (window.location.href.includes('/branches/')) {
      highlightCommitMessages();
    }
  }, 3000);
  
  // Additional highlighting for Bitbucket-specific structure
  setTimeout(() => {
    // Look specifically for commit messages in the table structure
    const commitSpans = document.querySelectorAll('.css-1tcga9b span, .css-19mqx9h .css-1tcga9b span');
    commitSpans.forEach(span => {
      const text = span.textContent || span.innerText;
      
      // Skip if already processed
      if (span.classList.contains('commit-highlighted')) {
        return;
      }
      
      // Check each pattern
      for (const [pattern, color] of Object.entries(commitPatterns)) {
        // Skip MERGED pattern on branches page
        if (pattern === 'MERGED' && isBranchesPage) {
          continue;
        }
        
        if (text.toLowerCase().startsWith(pattern.toLowerCase())) {
          span.classList.add('commit-highlighted');
          
          // Create a more sophisticated glass effect
          span.style.background = `linear-gradient(135deg, ${color}15 0%, ${color}08 50%, ${color}20 100%)`;
          span.style.color = color;
          span.style.padding = '6px 12px';
          span.style.borderRadius = '12px';
          span.style.fontWeight = '600';
          span.style.fontSize = '0.9em';
          span.style.letterSpacing = '0.3px';
          span.style.textShadow = '0 1px 3px rgba(0,0,0,0.2)';
          span.style.display = 'inline-block';
          span.style.margin = '3px 6px';
          span.style.backdropFilter = 'blur(16px) saturate(180%)';
          span.style.webkitBackdropFilter = 'blur(16px) saturate(180%)';
          span.style.border = `1px solid ${color}35`;
          span.style.boxShadow = `
            0 8px 32px rgba(0,0,0,0.12),
            0 4px 16px rgba(0,0,0,0.08),
            0 2px 8px rgba(0,0,0,0.06),
            inset 0 1px 0 ${color}40,
            inset 0 -1px 0 rgba(255,255,255,0.1)
          `;
          span.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
          span.style.position = 'relative';
          span.style.overflow = 'hidden';
          span.style.isolation = 'isolate';
          
          // Add hover effect with enhanced glass morphism
          span.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
            this.style.background = `linear-gradient(135deg, ${color}25 0%, ${color}15 50%, ${color}30 100%)`;
            this.style.boxShadow = `
              0 12px 40px rgba(0,0,0,0.15),
              0 6px 20px rgba(0,0,0,0.1),
              0 3px 12px rgba(0,0,0,0.08),
              inset 0 1px 0 ${color}60,
              inset 0 -1px 0 rgba(255,255,255,0.2),
              0 0 20px ${color}30
            `;
            this.style.border = `1px solid ${color}50`;
            this.style.backdropFilter = 'blur(20px) saturate(200%)';
            this.style.webkitBackdropFilter = 'blur(20px) saturate(200%)';
          });
          
          span.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.background = `linear-gradient(135deg, ${color}15 0%, ${color}08 50%, ${color}20 100%)`;
            this.style.boxShadow = `
              0 8px 32px rgba(0,0,0,0.12),
              0 4px 16px rgba(0,0,0,0.08),
              0 2px 8px rgba(0,0,0,0.06),
              inset 0 1px 0 ${color}40,
              inset 0 -1px 0 rgba(255,255,255,0.1)
            `;
            this.style.border = `1px solid ${color}35`;
            this.style.backdropFilter = 'blur(16px) saturate(180%)';
            this.style.webkitBackdropFilter = 'blur(16px) saturate(180%)';
          });
          
          // Add focus effect for accessibility
          span.addEventListener('focus', function() {
            this.style.outline = 'none';
            this.style.boxShadow = `
              0 8px 32px rgba(0,0,0,0.12),
              0 4px 16px rgba(0,0,0,0.08),
              0 2px 8px rgba(0,0,0,0.06),
              inset 0 1px 0 ${color}40,
              inset 0 -1px 0 rgba(255,255,255,0.1),
              0 0 0 3px ${color}30
            `;
          });
          
          break;
        }
      }
    });

    // Look specifically for branch names in the branches table
    const branchSelectors = [
      '.css-1nso09x',
      'a[href*="/branch/"]',
      'a[href*="/branch/"]:not([data-testid])',
      'td a[href*="/branch/"]',
      'td .css-1dsov5g a',
      '.css-1dsov5g a[href*="/branch/"]'
    ];
    
    branchSelectors.forEach(selector => {
      const branchLinks = document.querySelectorAll(selector);
      branchLinks.forEach(link => {
        const text = link.textContent || link.innerText;
        
        // Skip if already processed
        if (link.classList.contains('commit-highlighted')) {
          return;
        }
        
        // Check each pattern for branch names (feat/, fix/, etc.)
        for (const [pattern, color] of Object.entries(commitPatterns)) {
          const branchPattern = pattern.replace(':', '/'); // Convert commit: to commit/
          if (text.toLowerCase().startsWith(branchPattern.toLowerCase())) {
            link.classList.add('commit-highlighted');
            
            // Create a more sophisticated glass effect
            link.style.background = `linear-gradient(135deg, ${color}15 0%, ${color}08 50%, ${color}20 100%)`;
            link.style.color = color;
            link.style.padding = '6px 12px';
            link.style.borderRadius = '12px';
            link.style.fontWeight = '600';
            link.style.fontSize = '0.9em';
            link.style.letterSpacing = '0.3px';
            link.style.textShadow = '0 1px 3px rgba(0,0,0,0.2)';
            link.style.display = 'inline-block';
            link.style.margin = '3px 6px';
            link.style.backdropFilter = 'blur(16px) saturate(180%)';
            link.style.webkitBackdropFilter = 'blur(16px) saturate(180%)';
            link.style.border = `1px solid ${color}35`;
            link.style.boxShadow = `
              0 8px 32px rgba(0,0,0,0.12),
              0 4px 16px rgba(0,0,0,0.08),
              0 2px 8px rgba(0,0,0,0.06),
              inset 0 1px 0 ${color}40,
              inset 0 -1px 0 rgba(255,255,255,0.1)
            `;
            link.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            link.style.position = 'relative';
            link.style.overflow = 'hidden';
            link.style.isolation = 'isolate';
            link.style.textDecoration = 'none';
            
            // Add hover effect with enhanced glass morphism
            link.addEventListener('mouseenter', function() {
              this.style.transform = 'translateY(-2px) scale(1.02)';
              this.style.background = `linear-gradient(135deg, ${color}25 0%, ${color}15 50%, ${color}30 100%)`;
              this.style.boxShadow = `
                0 12px 40px rgba(0,0,0,0.15),
                0 6px 20px rgba(0,0,0,0.1),
                0 3px 12px rgba(0,0,0,0.08),
                inset 0 1px 0 ${color}60,
                inset 0 -1px 0 rgba(255,255,255,0.2),
                0 0 20px ${color}30
              `;
              this.style.border = `1px solid ${color}50`;
              this.style.backdropFilter = 'blur(20px) saturate(200%)';
              this.style.webkitBackdropFilter = 'blur(20px) saturate(200%)';
            });
            
            link.addEventListener('mouseleave', function() {
              this.style.transform = 'translateY(0) scale(1)';
              this.style.background = `linear-gradient(135deg, ${color}15 0%, ${color}08 50%, ${color}20 100%)`;
              this.style.boxShadow = `
                0 8px 32px rgba(0,0,0,0.12),
                0 4px 16px rgba(0,0,0,0.08),
                0 2px 8px rgba(0,0,0,0.06),
                inset 0 1px 0 ${color}40,
                inset 0 -1px 0 rgba(255,255,255,0.1)
              `;
              this.style.border = `1px solid ${color}35`;
              this.style.backdropFilter = 'blur(16px) saturate(180%)';
              this.style.webkitBackdropFilter = 'blur(16px) saturate(180%)';
            });
            
            // Add focus effect for accessibility
            link.addEventListener('focus', function() {
              this.style.outline = 'none';
              this.style.boxShadow = `
                0 8px 32px rgba(0,0,0,0.12),
                0 4px 16px rgba(0,0,0,0.08),
                0 2px 8px rgba(0,0,0,0.06),
                inset 0 1px 0 ${color}40,
                inset 0 -1px 0 rgba(255,255,255,0.1),
                0 0 0 3px ${color}30
              `;
            });
            
            break;
          }
        }
      });
    });

    // More aggressive approach - look for any text that matches branch patterns
    const allTextElements = document.querySelectorAll('a, span, div');
    allTextElements.forEach(element => {
      const text = element.textContent || element.innerText;
      
      // Skip if already processed or if element has children
      if (element.classList.contains('commit-highlighted') || element.children.length > 0) {
        return;
      }
      
      // Only process if this looks like a branch name (contains / and is in a table context)
      if (text.includes('/') && (element.closest('table') || element.closest('td'))) {
        for (const [pattern, color] of Object.entries(commitPatterns)) {
          // Skip MERGED pattern on branches page
          if (pattern === 'MERGED' && isBranchesPage) {
            continue;
          }
          
          const branchPattern = pattern.replace(':', '/');
          if (text.toLowerCase().startsWith(branchPattern.toLowerCase())) {
            element.classList.add('commit-highlighted');
            
            // Create a more sophisticated glass effect
            element.style.background = `linear-gradient(135deg, ${color}15 0%, ${color}08 50%, ${color}20 100%)`;
            element.style.color = color;
            element.style.padding = '6px 12px';
            element.style.borderRadius = '12px';
            element.style.fontWeight = '600';
            element.style.fontSize = '0.9em';
            element.style.letterSpacing = '0.3px';
            element.style.textShadow = '0 1px 3px rgba(0,0,0,0.2)';
            element.style.display = 'inline-block';
            element.style.margin = '3px 6px';
            element.style.backdropFilter = 'blur(16px) saturate(180%)';
            element.style.webkitBackdropFilter = 'blur(16px) saturate(180%)';
            element.style.border = `1px solid ${color}35`;
            element.style.boxShadow = `
              0 8px 32px rgba(0,0,0,0.12),
              0 4px 16px rgba(0,0,0,0.08),
              0 2px 8px rgba(0,0,0,0.06),
              inset 0 1px 0 ${color}40,
              inset 0 -1px 0 rgba(255,255,255,0.1)
            `;
            element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            element.style.isolation = 'isolate';
            
            if (element.tagName === 'A') {
              element.style.textDecoration = 'none';
            }
            
            // Add hover effect with enhanced glass morphism
            element.addEventListener('mouseenter', function() {
              this.style.transform = 'translateY(-2px) scale(1.02)';
              this.style.background = `linear-gradient(135deg, ${color}25 0%, ${color}15 50%, ${color}30 100%)`;
              this.style.boxShadow = `
                0 12px 40px rgba(0,0,0,0.15),
                0 6px 20px rgba(0,0,0,0.1),
                0 3px 12px rgba(0,0,0,0.08),
                inset 0 1px 0 ${color}60,
                inset 0 -1px 0 rgba(255,255,255,0.2),
                0 0 20px ${color}30
              `;
              this.style.border = `1px solid ${color}50`;
              this.style.backdropFilter = 'blur(20px) saturate(200%)';
              this.style.webkitBackdropFilter = 'blur(20px) saturate(200%)';
            });
            
            element.addEventListener('mouseleave', function() {
              this.style.transform = 'translateY(0) scale(1)';
              this.style.background = `linear-gradient(135deg, ${color}15 0%, ${color}08 50%, ${color}20 100%)`;
              this.style.boxShadow = `
                0 8px 32px rgba(0,0,0,0.12),
                0 4px 16px rgba(0,0,0,0.08),
                0 2px 8px rgba(0,0,0,0.06),
                inset 0 1px 0 ${color}40,
                inset 0 -1px 0 rgba(255,255,255,0.1)
              `;
              this.style.border = `1px solid ${color}35`;
              this.style.backdropFilter = 'blur(16px) saturate(180%)';
              this.style.webkitBackdropFilter = 'blur(16px) saturate(180%)';
            });
            
            // Add focus effect for accessibility
            element.addEventListener('focus', function() {
              this.style.outline = 'none';
              this.style.boxShadow = `
                0 8px 32px rgba(0,0,0,0.12),
                0 4px 16px rgba(0,0,0,0.08),
                0 2px 8px rgba(0,0,0,0.06),
                inset 0 1px 0 ${color}40,
                inset 0 -1px 0 rgba(255,255,255,0.1),
                0 0 0 3px ${color}30
              `;
            });
            
            break;
          }
        }
      }
    });
  }, 500);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Also run when navigating in SPA (for Bitbucket's single-page app behavior)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(init, 500); // Wait for new content to load
  }
}).observe(document, { subtree: true, childList: true }); 