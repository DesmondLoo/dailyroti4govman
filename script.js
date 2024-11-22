// Configuration
const config = {
    banners: {
        title: '/images/banner-top.jpg',
        resources: '/images/banner-resources.png',
        feedback: '/images/banner-feedback.png'
    },
    pictureDatabase: [
        { 
            id: 1, 
            imageUrl: '/images/1.png', 
            alt: 'Breaking Rules' 
        }

    ]
};

// State Management
let currentPicture = null;
let userRated = false;
const ratings = {
    current: {
        thoughtprovoking: 0,
        neutral: 0,
        meh: 0
    },
    total: {
        thoughtprovoking: 0,
        neutral: 0,
        meh: 0
    }
};

// DOM Elements
const elements = {
    mainBanner: document.getElementById('mainBanner'),
    resourcesBanner: document.getElementById('resourcesBanner'),
    feedbackBanner: document.getElementById('feedbackBanner'),
    currentDate: document.getElementById('currentDate'),
    dailyPicture: document.getElementById('dailyPicture'),
    reactionButtons: document.querySelectorAll('.reaction-button'),
    thankYouMessage: document.getElementById('thankYouMessage')
};

// Initialize
function init() {
    setupBanners();
    setupDate();
    selectDailyPicture();
    loadSavedRatings();
    setupReactions();
}

// Setup Banners
function setupBanners() {
    elements.mainBanner.src = config.banners.title;
    elements.resourcesBanner.src = config.banners.resources;
    elements.feedbackBanner.src = config.banners.feedback;
}

// Setup Date
function setupDate() {
    const date = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    elements.currentDate.textContent = date.toLocaleDateString('en-GB', options);
}

// Select Daily Picture
function selectDailyPicture() {
    const date = new Date();
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const pictureIndex = dayOfYear % config.pictureDatabase.length;
    currentPicture = config.pictureDatabase[pictureIndex];
    
    elements.dailyPicture.src = currentPicture.imageUrl;
    elements.dailyPicture.alt = currentPicture.alt;
}

// Load saved ratings from localStorage
function loadSavedRatings() {
    const saved = localStorage.getItem('dailyRoti_ratings');
    if (saved) {
        const savedRatings = JSON.parse(saved);
        ratings.total = savedRatings.total;
        updateReactionCounts();
    }
}

// Save ratings to localStorage
function saveRatings() {
    localStorage.setItem('dailyRoti_ratings', JSON.stringify(ratings));
}

// Update reaction count displays
function updateReactionCounts() {
    elements.reactionButtons.forEach(button => {
        const type = button.dataset.reaction;
        const countElement = button.querySelector('.count');
        countElement.textContent = ratings.total[type].toLocaleString();
    });
}

// Setup Reactions
function setupReactions() {
    elements.reactionButtons.forEach(button => {
        const type = button.dataset.reaction;
        const countElement = button.querySelector('.count');
        // Set initial count from total
        countElement.textContent = ratings.total[type].toLocaleString();
        button.addEventListener('click', handleReaction);
    });
}

// Handle Reaction
function handleReaction(event) {
    if (userRated) return;

    const button = event.currentTarget;
    const reactionType = button.dataset.reaction;
    const countElement = button.querySelector('.count');

    // Update both current and total counts
    ratings.current[reactionType]++;
    ratings.total[reactionType]++;
    
    // Display formatted total
    countElement.textContent = ratings.total[reactionType].toLocaleString();
    userRated = true;

    // Disable all buttons
    elements.reactionButtons.forEach(btn => {
        btn.disabled = true;
    });

    // Show thank you message
    elements.thankYouMessage.classList.remove('hidden');

    // Save updated counts
    saveRatings();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);