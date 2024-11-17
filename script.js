// Configuration for local image paths
const pictureDatabase = [
    { 
        id: 1, 
        title: "Breaking Rules",
        imageUrl: "/images/wisdom/breaking-rules.jpg", 
        alt: "Thinking of breaking some rules - wisdom quote" 
    },
    { 
        id: 2, 
        title: "Rocking the Boat",
        imageUrl: "/images/wisdom/rocking-boat.jpg", 
        alt: "Rocking the boat - wisdom quote" 
    },
    { 
        id: 3, 
        title: "Group Think",
        imageUrl: "/images/wisdom/group-think.jpg", 
        alt: "Group think - wisdom quote" 
    }
];

const bannerImages = {
    title: '/images/banners/main-banner.jpg',
    resources: '/images/banners/resources-banner.jpg',
    feedback: '/images/banners/feedback-banner.jpg'
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

// State management
let currentPicture = null;
const ratings = {
    awesome: 0,
    boring: 0,
    reflective: 0
};
let userRated = false;

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
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
        if (bannerImage) {
            bannerImage.src = bannerImages.title;
        }
        
        // Set resources and feedback banner backgrounds
        const resourcesBanner = document.querySelector('.resources-banner');
        const feedbackBanner = document.querySelector('.feedback-banner');
        
        if (resourcesBanner) {
            resourcesBanner.style.backgroundImage = `url(${bannerImages.resources})`;
        }
        if (feedbackBanner) {
            feedbackBanner.style.backgroundImage = `url(${bannerImages.feedback})`;
        }
    }

    // Setup current date with proper formatting
    function setupCurrentDate() {
        if (currentDateElement) {
            const date = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            currentDateElement.textContent = date.toLocaleDateString('en-GB', options);
        }
    }

    // Select today's picture
    function selectTodaysPicture() {
        if (wisdomImage) {
            const date = new Date();
            const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
            const pictureIndex = dayOfYear % pictureDatabase.length;
            currentPicture = pictureDatabase[pictureIndex];
            wisdomImage.src = currentPicture.imageUrl;
            wisdomImage.alt = currentPicture.alt;
        }
    }

    // Setup rating buttons
    function setupRatingButtons() {
        const buttons = document.querySelectorAll('.rating-button');
        buttons.forEach(button => {
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

        // Disable all buttons
        const buttons = document.querySelectorAll('.rating-button');
        buttons.forEach(button => button.disabled = true);

        // Show thank you message
        if (thankYouMessage) {
            thankYouMessage.classList.remove('hidden');
        }
    }

    // Populate resources grid
    function populateResources() {
        if (resourcesGrid) {
            resourcesGrid.innerHTML = resources.map(resource => `
                <a href="${resource.url}" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="resource-card">
                    <div class="resource-title">
                        <span>${resource.title}</span>
                        <svg class="external-link-icon" viewBox="0 0 24 24" width="16" height="16">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </div>
                    <p class="resource-description">${resource.description}</p>
                </a>
            `).join('');
        }
    }

    // Initialize everything
    initializePage();
});
