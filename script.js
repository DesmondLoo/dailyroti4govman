// Configuration
const pictureDatabase = [
    { 
        id: 1, 
        title: "Breaking Rules",
        imageUrl: "/images/1.png", 
        alt: "Thinking of breaking some rules - wisdom quote" 
    },
    { 
        id: 2, 
        title: "Rocking the Boat",
        imageUrl: "/images/2.png", 
        alt: "Rocking the boat - wisdom quote" 
    },
    { 
        id: 3, 
        title: "Group Think",
        imageUrl: "/images/3.png", 
        alt: "Group think - wisdom quote" 
    }
];

const bannerImages = {
    title: '/images/top-banner.png',
    resources: '/images/resources-banner.png',
    feedback: '/images/feedback-banner.png'
};

const resources = [
    {
        title: "Resource 1",
        url: "#",
        description: "Resource description goes here"
    },
    {
        title: "Resource 2",
        url: "#",
        description: "Resource description goes here"
    },
    {
        title: "Resource 3",
        url: "#",
        description: "Resource description goes here"
    }
];

// State
let userRated = false;
const ratings = {
    awesome: 0,
    boring: 0,
    reflective: 0
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupBanners();
    setupDate();
    setupWisdomImage();
    setupRatingButtons();
    setupResources();
});

// Setup banner images
function setupBanners() {
    document.getElementById('mainBanner').src = bannerImages.title;
    document.getElementById('resourcesBanner').src = bannerImages.resources;
    document.getElementById('feedbackBanner').src = bannerImages.feedback;
}

// Setup date display
function setupDate() {
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(currentDate);
    document.getElementById('currentDate').textContent = formattedDate;
}

// Setup wisdom image
function setupWisdomImage() {
    const currentDate = new Date();
    const dayOfYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const pictureIndex = dayOfYear % pictureDatabase.length;
    const todaysPicture = pictureDatabase[pictureIndex];

    const wisdomImage = document.getElementById('wisdomImage');
    wisdomImage.src = todaysPicture.imageUrl;
    wisdomImage.alt = todaysPicture.alt;
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
    event.currentTarget.querySelector('.count').textContent = ratings[ratingType];

    // Disable all buttons
    document.querySelectorAll('.rating-button').forEach(button => {
        button.disabled = true;
    });

    // Show thank you message
    document.getElementById('thankYouMessage').classList.remove('hidden');
}

// Setup resources grid
function setupResources() {
    const resourcesGrid = document.querySelector('.resources-grid');
    resourcesGrid.innerHTML = resources.map(resource => `
        <a href="${resource.url}" class="resource-link">
            <h3 class="resource-title">${resource.title}</h3>
            <p class="resource-description">${resource.description}</p>
        </a>
    `).join('');
}