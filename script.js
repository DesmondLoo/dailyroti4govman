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
        },
        { 
            id: 2, 
            imageUrl: '/images/2.png', 
            alt: 'Rocking the Boat' 
        },
        { 
            id: 3, 
            imageUrl: '/images/3.png', 
            alt: 'Group Think' 
        }
    ]
};

// State Management
let currentPicture = null;
let userRated = false;
const ratings = {
    thoughtprovoking: 0,
    neutral: 0,
    meh: 0
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

// Setup Reactions
function setupReactions() {
    elements.reactionButtons.forEach(button => {
        button.addEventListener('click', handleReaction);
    });
}

// Handle Reaction
function handleReaction(event) {
    if (userRated) return;

    const button = event.currentTarget;
    const reactionType = button.dataset.reaction;
    const countElement = button.querySelector('.count');

    ratings[reactionType]++;
    countElement.textContent = ratings[reactionType];
    userRated = true;

    // Disable all buttons
    elements.reactionButtons.forEach(btn => {
        btn.disabled = true;
    });

    // Show thank you message
    elements.thankYouMessage.classList.remove('hidden');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);