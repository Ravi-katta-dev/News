// Global variable to store loaded news data
let currentAffairsData = [];

// Function to load news data from JSON file
async function loadNewsData() {
    try {
        // Add cache-busting parameter to prevent stale cache issues
        const cacheBuster = new Date().getTime();
        const response = await fetch(`./data/news.json?v=${cacheBuster}`, {
            cache: 'no-cache',
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newsData = await response.json();
        
        // Convert the structured JSON to flat array
        currentAffairsData = [];
        const months = [
            "August 2025", "July 2025", "June 2025", "May 2025", "April 2025", "March 2025",
            "February 2025", "January 2025", "December 2024", "November 2024", "October 2024", 
            "September 2024", "August 2024", "July 2024", "June 2024", "May 2024", 
            "April 2024", "March 2024", "February 2024"
        ];
        
        months.forEach(month => {
            if (newsData[month]) {
                currentAffairsData.push(...newsData[month]);
            }
        });
        
        return currentAffairsData;
    } catch (error) {
        console.error('Error loading news data:', error);
        // Fallback to empty array if loading fails
        return [];
    }
}

// DOM Elements
let searchInput, monthFilter, newsContainer, totalNewsCount, filteredNewsCount, clearSearchBtn, themeToggle;

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    initializeElements();
    setupEventListeners();
    initializeTheme();
    
    // Load news data from JSON file
    await loadNewsData();
    
    renderAllNews();
    updateStats();
});

function initializeElements() {
    searchInput = document.getElementById('searchInput');
    monthFilter = document.getElementById('monthFilter');
    newsContainer = document.getElementById('newsContainer');
    totalNewsCount = document.getElementById('totalNews');
    filteredNewsCount = document.getElementById('filteredNews');
    clearSearchBtn = document.getElementById('clearSearch');
    themeToggle = document.getElementById('themeToggle');
}

function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Month filter
    monthFilter.addEventListener('change', handleFilter);
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        clearSearchBtn.style.display = 'none';
        renderFilteredNews();
    } else {
        clearSearchBtn.style.display = 'block';
        const filteredData = currentAffairsData.filter(news => 
            news.title.toLowerCase().includes(searchTerm) ||
            (news.summary && news.summary.toLowerCase().includes(searchTerm)) ||
            (news.content && news.content.toLowerCase().includes(searchTerm)) ||
            (news.keyTakeaways && news.keyTakeaways.some(takeaway => takeaway.toLowerCase().includes(searchTerm))) ||
            news.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)) ||
            news.category.toLowerCase().includes(searchTerm)
        );
        renderNews(filteredData);
    }
}

function handleFilter() {
    renderFilteredNews();
}

function clearSearch() {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    renderFilteredNews();
}

function renderFilteredNews() {
    const selectedMonth = monthFilter.value;
    
    let filteredData = currentAffairsData;
    
    if (selectedMonth) {
        filteredData = filteredData.filter(news => news.month === selectedMonth);
    }
    
    renderNews(filteredData);
}

function renderAllNews() {
    renderNews(currentAffairsData);
}

function renderNews(newsData) {
    // Remove loading indicator
    const loading = newsContainer.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
    
    if (newsData.length === 0) {
        newsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No results found</h3>
                <p>Try adjusting your search terms or filters</p>
            </div>
        `;
        filteredNewsCount.textContent = '0';
        return;
    }
    
    const newsHTML = newsData.map(news => `
        <article class="news-card ${news.importance}" data-id="${news.id}">
            <div class="news-header">
                <h2 class="news-title">${news.title}</h2>
                <div class="news-meta">
                    <span class="news-month">
                        <i class="fas fa-calendar"></i> ${news.month}
                    </span>
                    <span class="news-category ${news.category.toLowerCase()}">
                        <i class="fas fa-tag"></i> ${news.category}
                    </span>
                    <span class="importance-badge ${news.importance}">
                        ${news.importance.toUpperCase()}
                    </span>
                </div>
                <button class="toggle-btn" aria-label="Toggle content">
                    <i class="fas fa-chevron-down"></i>
                </button>
            </div>
            <div class="news-content">
                <p class="news-summary">${news.summary || news.content}</p>
                
                ${news.keyTakeaways ? `
                <div class="key-takeaways">
                    <h4><i class="fas fa-lightbulb"></i> Key Takeaways:</h4>
                    <ul>
                        ${news.keyTakeaways.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                
                ${news.source ? `
                <div class="news-source">
                    <i class="fas fa-external-link-alt"></i>
                    <a href="${news.source}" target="_blank" rel="noopener noreferrer">Read More</a>
                </div>
                ` : ''}
            </div>
            <div class="news-keywords">
                <i class="fas fa-hashtag"></i>
                ${news.keywords.map(keyword => `<span class="keyword">${keyword}</span>`).join('')}
            </div>
        </article>
    `).join('');
    
    newsContainer.innerHTML = newsHTML;
    filteredNewsCount.textContent = newsData.length;
    
    // Add click handlers for collapsible cards
    setupCardToggleHandlers();
}

function setupCardToggleHandlers() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.news-card');
            const content = card.querySelector('.news-content');
            const icon = this.querySelector('i');
            
            card.classList.toggle('expanded');
            
            if (card.classList.contains('expanded')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                content.style.maxHeight = '0';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}

function updateStats() {
    totalNewsCount.textContent = currentAffairsData.length;
    filteredNewsCount.textContent = currentAffairsData.length;
}

// Export for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { currentAffairsData, renderNews };
}

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
}

function updateThemeToggleIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
}