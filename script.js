// Image Configuration
const pictureDatabase = [
    { 
        id: 1, 
        imageUrl: "/images/1.png", 
        alt: "Thinking of breaking some rules - wisdom quote" 
    },
    { 
        id: 2, 
        imageUrl: "/images/2.png", 
        alt: "Rocking the boat - wisdom quote" 
    },
    { 
        id: 3, 
        imageUrl: "/images/3.png", 
        alt: "Group think - wisdom quote" 
    }
];

const bannerImages = {
    title: '/images/banner-top.png',
    resources: '/images/banner-resources.png',
    feedback: '/images/banner-feedback.png'
};

// State Management
let ratings = {
    awesome: 0,
    boring: 0,
    reflective: 0
};
let userRated = false;

// DOM Elements
const mainBanner = document.getElementById('mainBanner');
const currentDateElement = document.getElementById('currentDate');
const wisdomImage = document.getElementById('wisdomImage');
const resourcesBanner = document.getElementById('resourcesBanner');
const feedbackBanner = document.getElementById('feedbackBanner');
const thankYouMessage = document.getElementById('thankYouMessage');
const ratingButtons = document.querySelectorAll('.rating-button');

// Initialize the page
function initializePage() {
    setupBanners();
    setupCurrentDate();
    selectTodaysPicture();
    setupRatingButtons();
}

// Setup banner images
function setupBanners() {
    mainBanner.src = bannerImages.title;
    resourcesBanner.src = bannerImages.resources;
    feedbackBanner.src = bannerImages.feedback;
}

// Setup current date
function setupCurrentDate() {
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date());
    currentDateElement.textContent = formattedDate;
}

// Select today's picture
function selectTodaysPicture() {
    const currentDate = new Date();
    const dayOfYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const pictureIndex = dayOfYear % pictureDatabase.length;
    const todaysPicture = pictureDatabase[pictureIndex];
    
    wisdomImage.src = todaysPicture.imageUrl;
    wisdomImage.alt = todaysPicture.alt;
}

// Setup rating buttons
function setupRatingButtons() {
    ratingButtons.forEach(button => {
        button.addEventListener('click', handleRating);
    });
}

// Handle rating click
function handleRating(event) {
    if (userRated) return;

    const ratingType = event.currentTarget.dataset.rating;
    ratings[ratingType]++;
    userRated = true;

    // Update count display
    const countElement = event.currentTarget.querySelector('.count');
    countElement.textContent = ratings[ratingType];

    // Disable all rating buttons
    ratingButtons.forEach(button => {
        button.disabled = true;
    });

    // Show thank you message
    thankYouMessage.classList.remove('hidden');
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initializePage);