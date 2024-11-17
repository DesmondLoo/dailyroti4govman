// Configuration
const pictureDatabase = [
    { 
        id: 1, 
        title: "Breaking Rules",
        imageUrl: "/api/placeholder/800/450?text=Breaking+Rules", 
        alt: "Thinking of breaking some rules - wisdom quote" 
    },
    { 
        id: 2, 
        title: "Rocking the Boat",
        imageUrl: "/api/placeholder/800/450?text=Rocking+The+Boat", 
        alt: "Rocking the boat - wisdom quote" 
    },
    { 
        id: 3, 
        title: "Group Think",
        imageUrl: "/api/placeholder/800/450?text=Group+Think", 
        alt: "Group think - wisdom quote" 
    }
];

const bannerImages = {
    title: '/Images/Top Banner.png',
    resources: '/api/placeholder/1200/300?text=Resources',
    feedback: '/api/placeholder/1200/300?text=Feedback'
};

const resources = [
    {
        title: "Nature Photography Tips",
        url: "https://example.com/photo-tips",
        description: "Learn how to capture stunning nature photographs"
    },
    {
        title: "Photography Community",
        url: "https://example.com/community",
        description: "Join our photography community"
    },
    {
        title: "Submit Your Photos",
        url: "https://example.com/submit",
        description: "Share your best shots with us"
    }
];

// State
let currentPicture = null;
const ratings = {
    awesome: 0,
    boring: 0,
    reflective: 0
};
let userRated = false;

// DOM Elements
const wisdomImage = document.getElementById('wisdomImage');
const bannerImage = document.getElementById('bannerImage');
const currentDateElement = document.getElementById('currentDate');
const thankYouMessage = document.getElementById('thankYouMessage');
const resourcesGrid = document.getElementById('resourcesGrid');

// Initialize the page
function initializePage() {
    setupBannerImages();
    setupCurrentDate();
    selectTodaysPicture();
    setupRatingButtons();
    populateResources();
}

// Setup banner images
function setupBannerImages() {
    bannerImage.src = bannerImages.title;
}

// Setup current date
function setupCurrentDate() {
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(currentDate);
    currentDateElement.textContent = formattedDate;
}

// Select today's picture
function selectTodaysPicture() {
    const currentDate = new Date();
    const dayOfYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const pictureIndex = dayOfYear % pictureDatabase.length;
    currentPicture = pictureDatabase[pictureIndex];
    wisdomImage.src = currentPicture.imageUrl;
    wisdomImage.alt = currentPicture.alt;
}

// Setup rating buttons
function setupRatingButtons() {
    const ratingButtons = document.querySelectorAll('.rating-button');
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

    // Update UI
    const countElement = event.currentTarget.querySelector('.count');
    countElement.textContent = ratings[ratingType];

    // Disable all rating buttons
    const ratingButtons = document.querySelectorAll('.rating-button');
    ratingButtons.forEach(button => {
        button.disabled = true;
    });

    // Show thank you message
    thankYouMessage.classList.remove('hidden');
}

// Populate resources
function populateResources() {
    resourcesGrid.innerHTML = resources.map(resource => `
        <a href="${resource.url}" target="_blank" rel="noopener noreferrer"
           class="block p-4 rounded-lg border hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-2 font-medium">
                ${resource.title}
                <i class="icon-external-link"></i>
            </div>
            <p class="text-sm text-gray-500 mt-1">${resource.description}</p>
        </a>
    `).join('');
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initializePage);
