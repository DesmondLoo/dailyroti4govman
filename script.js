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
  
  let ratings = {
    awesome: 0,
    boring: 0,
    reflective: 0
  };
  
  let userRated = false;
  
  window.onload = function() {
    refreshMainBanner();
    refreshDailyPicture();
    updateDate();
  };
  
  function refreshMainBanner() {
    const randomIndex = Math.floor(Math.random() * 3) + 1;
    document.getElementById('main-banner').src = `/images/banners/main-banner-${randomIndex}.jpg`;
  }
  
  function refreshDailyPicture() {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const pictureIndex = dayOfYear % pictureDatabase.length;
    const picture = pictureDatabase[pictureIndex];
    document.getElementById('daily-picture').src = picture.imageUrl;
    document.getElementById('daily-picture').alt = picture.alt;
  }
  
  function updateDate() {
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(currentDate);
    document.getElementById('date').textContent = formattedDate;
  }
  
  function handleRating(type) {
    if (!userRated) {
      ratings[type]++;
      updateRatings();
      userRated = true;
      document.getElementById('rating-message').style.display = 'block';
    }
  }
  
  function updateRatings() {
    document.getElementById('awesome-count').textContent = ratings.awesome;
    document.getElementById('boring-count').textContent = ratings.boring;
    document.getElementById('reflective-count').textContent = ratings.reflective;
  }