// Current Affairs Data for RRB Exam - Last 6 Months (March 2025 to August 2025)
const currentAffairsData = [
    // August 2025
    {
        id: 1,
        title: "Union Budget 2025-26 Highlights",
        content: "Key announcements include increased allocation for railways, infrastructure development, and digital initiatives.",
        month: "August 2025",
        category: "Economy",
        importance: "high",
        keywords: ["budget", "railways", "infrastructure", "economy"]
    },
    {
        id: 2,
        title: "India's GDP Growth Rate Q1 2025-26",
        content: "India's GDP growth rate for Q1 2025-26 recorded at 7.2%, making it the fastest-growing major economy.",
        month: "August 2025",
        category: "Economy",
        importance: "high",
        keywords: ["gdp", "growth", "economy", "quarterly"]
    },
    {
        id: 3,
        title: "New Railway Safety Guidelines",
        content: "Railway Ministry introduces advanced safety protocols including automated train protection systems.",
        month: "August 2025",
        category: "Railways",
        importance: "high",
        keywords: ["railway", "safety", "guidelines", "automation"]
    },
    
    // July 2025
    {
        id: 4,
        title: "Padma Awards 2025 Recipients",
        content: "President conferred Padma awards to distinguished personalities from various fields including science, arts, and social work.",
        month: "July 2025",
        category: "Awards",
        importance: "medium",
        keywords: ["padma", "awards", "recipients", "president"]
    },
    {
        id: 5,
        title: "India's Moon Mission Chandrayaan-4 Launch",
        content: "ISRO successfully launched Chandrayaan-4 mission for lunar exploration and sample collection.",
        month: "July 2025",
        category: "Science",
        importance: "high",
        keywords: ["chandrayaan", "isro", "moon", "space", "mission"]
    },
    {
        id: 6,
        title: "New High-Speed Rail Project Announced",
        content: "Government announced Mumbai-Pune high-speed rail corridor project worth ₹35,000 crores.",
        month: "July 2025",
        category: "Railways",
        importance: "high",
        keywords: ["high-speed", "rail", "mumbai", "pune", "project"]
    },
    
    // June 2025
    {
        id: 7,
        title: "International Yoga Day Celebrations",
        content: "21st June marked as International Yoga Day with record participation from 195 countries.",
        month: "June 2025",
        category: "International",
        importance: "medium",
        keywords: ["yoga", "international", "day", "celebration"]
    },
    {
        id: 8,
        title: "India's Renewable Energy Milestone",
        content: "India achieved 200 GW renewable energy capacity, surpassing the target ahead of schedule.",
        month: "June 2025",
        category: "Environment",
        importance: "high",
        keywords: ["renewable", "energy", "milestone", "capacity"]
    },
    {
        id: 9,
        title: "New Railway Electrification Project",
        content: "Indian Railways completed electrification of 5,000 km track, reducing carbon emissions significantly.",
        month: "June 2025",
        category: "Railways",
        importance: "medium",
        keywords: ["electrification", "railway", "carbon", "emissions"]
    },
    
    // May 2025
    {
        id: 10,
        title: "National Technology Day Achievements",
        content: "India celebrated National Technology Day highlighting achievements in AI, quantum computing, and biotechnology.",
        month: "May 2025",
        category: "Technology",
        importance: "medium",
        keywords: ["technology", "ai", "quantum", "biotechnology"]
    },
    {
        id: 11,
        title: "World's Largest Solar Park Inaugurated",
        content: "Rajasthan's 5000 MW solar park becomes world's largest single-location solar installation.",
        month: "May 2025",
        category: "Environment",
        importance: "high",
        keywords: ["solar", "park", "rajasthan", "renewable", "energy"]
    },
    {
        id: 12,
        title: "New Metro Rail Networks Operational",
        content: "Delhi Metro Phase 4 and Bangalore Metro expansion became operational, improving urban connectivity.",
        month: "May 2025",
        category: "Transportation",
        importance: "medium",
        keywords: ["metro", "delhi", "bangalore", "urban", "connectivity"]
    },
    
    // April 2025
    {
        id: 13,
        title: "National Sports Awards 2025",
        content: "Khel Ratna and Arjuna Awards announced recognizing outstanding sports achievements.",
        month: "April 2025",
        category: "Sports",
        importance: "medium",
        keywords: ["sports", "awards", "khel", "ratna", "arjuna"]
    },
    {
        id: 14,
        title: "Digital India 2.0 Initiative Launch",
        content: "Government launched Digital India 2.0 focusing on AI integration and digital governance.",
        month: "April 2025",
        category: "Technology",
        importance: "high",
        keywords: ["digital", "india", "ai", "governance", "technology"]
    },
    {
        id: 15,
        title: "Indian Railways Green Energy Target",
        content: "Indian Railways announces plan to become net-zero carbon emission network by 2030.",
        month: "April 2025",
        category: "Railways",
        importance: "high",
        keywords: ["railways", "green", "energy", "carbon", "neutral"]
    },
    
    // March 2025
    {
        id: 16,
        title: "Holi Festival National Recognition",
        content: "UNESCO recognized Indian Holi festival as Intangible Cultural Heritage of Humanity.",
        month: "March 2025",
        category: "Culture",
        importance: "medium",
        keywords: ["holi", "unesco", "cultural", "heritage", "festival"]
    },
    {
        id: 17,
        title: "India's First Quantum Computer",
        content: "DRDO successfully developed India's first indigenous quantum computer for strategic applications.",
        month: "March 2025",
        category: "Technology",
        importance: "high",
        keywords: ["quantum", "computer", "drdo", "indigenous", "technology"]
    },
    {
        id: 18,
        title: "Railway Station Modernization Program",
        content: "100 railway stations across India completed modernization under Adarsh Station Scheme.",
        month: "March 2025",
        category: "Railways",
        importance: "medium",
        keywords: ["railway", "station", "modernization", "adarsh", "scheme"]
    }
];

// DOM Elements
let searchInput, monthFilter, newsContainer, totalNewsCount, filteredNewsCount, clearSearchBtn;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
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
}

function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Month filter
    monthFilter.addEventListener('change', handleFilter);
    
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
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
            news.content.toLowerCase().includes(searchTerm) ||
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
        <article class="news-card ${news.importance}">
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
            </div>
            <div class="news-content">
                <p>${news.content}</p>
            </div>
            <div class="news-keywords">
                <i class="fas fa-hashtag"></i>
                ${news.keywords.map(keyword => `<span class="keyword">${keyword}</span>`).join('')}
            </div>
        </article>
    `).join('');
    
    newsContainer.innerHTML = newsHTML;
    filteredNewsCount.textContent = newsData.length;
}

function updateStats() {
    totalNewsCount.textContent = currentAffairsData.length;
    filteredNewsCount.textContent = currentAffairsData.length;
}

// Export for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { currentAffairsData, renderNews };
}