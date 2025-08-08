// Bitbucket Commit Highlighter + Controls
// Highlights commit messages and offers filtering/copy controls

// Rules describing categories, colors and patterns (commit and branch)
const bbchRules = [
  { type: 'feat', label: 'feat', color: '#6f42c1', patterns: ['feat:', 'feature:', 'feat/', 'feature/'] },
  { type: 'fix', label: 'fix', color: '#ffc107', patterns: ['fix:', 'bug:', 'fix/', 'bug/'] },
  { type: 'docs', label: 'docs', color: '#17a2b8', patterns: ['docs:', 'docs/'] },
  { type: 'style', label: 'style', color: '#ffc107', patterns: ['style:', 'style/'] },
  { type: 'refactor', label: 'refactor', color: '#6f42c1', patterns: ['refactor:', 'refactor/'] },
  { type: 'test', label: 'test', color: '#fd7e14', patterns: ['test:', 'tests:', 'test/'] },
  { type: 'chore', label: 'chore', color: '#6c757d', patterns: ['chore:', 'chore/'] },
  { type: 'perf', label: 'perf', color: '#e83e8c', patterns: ['perf:', 'perf/'] },
  { type: 'ci', label: 'ci', color: '#20c997', patterns: ['ci:', 'ci/'] },
  { type: 'build', label: 'build', color: '#fd7e14', patterns: ['build:', 'build/'] },
  { type: 'revert', label: 'revert', color: '#6c757d', patterns: ['revert:'] },
  { type: 'merged', label: 'MERGED', color: '#28a745', patterns: ['MERGED'] },
];

const bbchTypeToRule = bbchRules.reduce((acc, r) => { acc[r.type] = r; return acc; }, {});

// Global page detection variables
let isCommitsPage = false;
let isBranchesPage = false;

// Simple filter state (no persistence)
let bbchFilterType = 'all';

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

      // Determine matching rule
      for (const rule of bbchRules) {
        // Skip MERGED on branches page
        if (rule.type === 'merged' && isBranchesPage) continue;

        const matched = rule.patterns.some(p => text.toLowerCase().startsWith(p.toLowerCase()));
        if (matched) {
          // Add highlighting class and style with enhanced glass morphism effect
          element.classList.add('commit-highlighted');
          element.dataset.bbchType = rule.type;
          
          // Create a more sophisticated glass effect
          const color = rule.color;
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
      // If no rule matched, mark as other
      if (!element.dataset.bbchType) {
        element.dataset.bbchType = 'other';
      }
    });
  });

  // After highlighting, apply filters
  applyFilters();
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
      
      // Determine matching rule
      for (const rule of bbchRules) {
        if (rule.type === 'merged' && isBranchesPage) continue;
        const color = rule.color;
        const matched = rule.patterns.some(p => text.toLowerCase().startsWith(p.toLowerCase()));
        if (matched) {
          span.classList.add('commit-highlighted');
          span.dataset.bbchType = rule.type;
          
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
      if (!span.dataset.bbchType) {
        span.dataset.bbchType = 'other';
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
        
        // Check each rule for branch names (feat/, fix/, etc.)
        for (const rule of bbchRules) {
          if (rule.type === 'merged') continue; // not for branches
          const color = rule.color;
          const matched = rule.patterns.some(p => {
            const branchPattern = p.replace(':', '/');
            return text.toLowerCase().startsWith(branchPattern.toLowerCase());
          });
          if (matched) {
            link.classList.add('commit-highlighted');
            link.dataset.bbchType = rule.type;
            
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
        if (!link.dataset.bbchType) {
          link.dataset.bbchType = 'other';
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
        for (const rule of bbchRules) {
          if (rule.type === 'merged') continue;
          const color = rule.color;
          const matched = rule.patterns.some(p => text.toLowerCase().startsWith(p.replace(':','/').toLowerCase()));
          if (matched) {
            element.classList.add('commit-highlighted');
            element.dataset.bbchType = rule.type;
            
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
        if (!element.dataset.bbchType) {
          element.dataset.bbchType = 'other';
        }
      }
    });
  }, 500);

  // Ensure controls and filters are ready
  bbchEnsureControls();
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

// ---------------------
// Controls + Filtering
// ---------------------

function bbchEnsureControls() {
  if (document.querySelector('.bbch-controls')) return;

  const panel = document.createElement('div');
  panel.className = 'bbch-controls';
  panel.innerHTML = `
    <h4>Commit Filter</h4>
    <div class="bbch-row" style="margin-bottom:6px">
      <label style="font-size:12px; opacity:0.9;">Filter:</label>
      <select data-bbch-select style="font-size:12px; padding:4px 8px; border-radius:8px; background:rgba(255,255,255,0.06); color:#e6edf3; border:1px solid rgba(255,255,255,0.15);">
        <option value="all">All</option>
      </select>
    </div>
  `;

  document.body.appendChild(panel);

  // Populate select options
  const select = panel.querySelector('select[data-bbch-select]');
  if (select) {
    bbchRules.forEach(rule => {
      const opt = document.createElement('option');
      opt.value = rule.type;
      opt.textContent = rule.label;
      select.appendChild(opt);
    });
    select.addEventListener('change', (e) => {
      const target = e.target;
      bbchFilterType = target.value || 'all';
      applyFilters();
    });
  }
}

function getRowContainer(element) {
  const container = element.closest('tr') || element.closest('li') || element.closest('[role="row"]');
  return container || element;
}

function applyFilters() {
  const all = document.querySelectorAll('.commit-highlighted');
  all.forEach(el => {
    const type = el.dataset.bbchType || 'other';
    const row = getRowContainer(el);
    const shouldShow = bbchFilterType === 'all' || type === bbchFilterType;
    if (!shouldShow) {
      row.classList.add('bbch-hidden');
    } else {
      row.classList.remove('bbch-hidden');
    }
  });
}
