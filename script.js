// js/imageService.js
// Previous ImageService class remains the same

// js/emoticonService.js
class EmoticonService {
    constructor() {
        // Initialize all emotions with count 0
        this.emoticons = [
            { id: 1, symbol: '😍', label: 'Love it!', count: 0, userVotes: 0 },
            { id: 2, symbol: '😊', label: 'Happy', count: 0, userVotes: 0 },
            { id: 3, symbol: '🤔', label: 'Interesting', count: 0, userVotes: 0 },
            { id: 4, symbol: '😮', label: 'Wow', count: 0, userVotes: 0 },
            { id: 5, symbol: '😢', label: 'Sad', count: 0, userVotes: 0 },
            { id: 6, symbol: '😴', label: 'Boring', count: 0, userVotes: 0 }
        ];
        this.initializeForToday();
    }

    initializeForToday() {
        const today = new Date().toLocaleDateString();
        const savedData = localStorage.getItem('emoticons');
        const savedDate = localStorage.getItem('lastUpdateDate');

        if (savedData && savedDate === today) {
            // Load today's data if it exists
            this.emoticons = JSON.parse(savedData);
        } else {
            // Reset counts for a new day
            this.emoticons.forEach(emoticon => {
                emoticon.count = 0;
                emoticon.userVotes = 0;
            });
            this.saveReactions();
            localStorage.setItem('lastUpdateDate', today);
        }
    }

    getEmoticons() {
        return this.emoticons;
    }

    updateReaction(emoticonId, increment) {
        const emoticon = this.emoticons.find(e => e.id === emoticonId);
        if (emoticon) {
            if (increment && emoticon.userVotes < 10) { // Limit to 10 votes per emotion
                emoticon.count++;
                emoticon.userVotes++;
            } else if (!increment && emoticon.userVotes > 0) {
                emoticon.count--;
                emoticon.userVotes--;
            }
            this.saveReactions();
            return emoticon;
        }
        return null;
    }

    saveReactions() {
        localStorage.setItem('emoticons', JSON.stringify(this.emoticons));
    }

    clearAllReactions() {
        this.emoticons.forEach(emoticon => {
            emoticon.count = 0;
            emoticon.userVotes = 0;
        });
        this.saveReactions();
    }
}

// js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize services
    const imageService = new ImageService();
    const emoticonService = new EmoticonService();
    
    // Set current date
    const today = new Date();
    document.getElementById('current-date').textContent = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Set daily image
    const todayImage = imageService.getTodayImage();
    const imgElement = document.getElementById('daily-image');
    imgElement.src = `/api/placeholder/${todayImage.width}/${todayImage.height}`;
    imgElement.alt = todayImage.caption;
    document.getElementById('image-caption').textContent = todayImage.caption;
    
    // Setup emoticons
    const emoticonGrid = document.getElementById('emoticon-grid');
    let selectedButton = null;
    
    function updateButtonState(button, emoticon) {
        const decreaseBtn = button.querySelector('.decrease');
        const increaseBtn = button.querySelector('.increase');
        const countSpan = button.querySelector('.emoticon-count');
        const votesLeft = button.querySelector('.votes-left');
        
        decreaseBtn.disabled = emoticon.userVotes === 0;
        increaseBtn.disabled = emoticon.userVotes >= 10;
        countSpan.textContent = emoticon.count;
        votesLeft.textContent = `${10 - emoticon.userVotes} votes left`;
    }

    emoticonService.getEmoticons().forEach(emoticon => {
        const button = document.createElement('button');
        button.className = 'emoticon-button';
        button.dataset.emoticonId = emoticon.id;
        
        button.innerHTML = `
            <span class="emoticon-symbol">${emoticon.symbol}</span>
            <span class="emoticon-label">${emoticon.label}</span>
            <div class="emoticon-count-container">
                <button class="count-button decrease" ${emoticon.count === 0 ? 'disabled' : ''}>-</button>
                <span class="emoticon-count">${emoticon.count}</span>
                <button class="count-button increase">+</button>
            </div>
            <div class="votes-left">${10 - emoticon.userVotes} votes left</div>
        `;
        
        // Handle emoticon selection
        button.addEventListener('click', function(e) {
            if (!e.target.classList.contains('count-button')) {
                if (selectedButton) {
                    selectedButton.classList.remove('selected');
                }
                button.classList.add('selected');
                selectedButton = button;
            }
        });
        
        // Handle count buttons
        const countContainer = button.querySelector('.emoticon-count-container');
        countContainer.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (e.target.classList.contains('count-button')) {
                const increment = e.target.classList.contains('increase');
                const updatedEmoticon = emoticonService.updateReaction(emoticon.id, increment);
                
                if (updatedEmoticon) {
                    updateButtonState(button, updatedEmoticon);
                }
            }
        });
        
        emoticonGrid.appendChild(button);
    });

    // Add reset button
    const resetButton = document.createElement('button');
    resetButton.className = 'reset-button';
    resetButton.textContent = 'Reset All Reactions';
    resetButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all reactions?')) {
            emoticonService.clearAllReactions();
            const buttons = document.querySelectorAll('.emoticon-button');
            buttons.forEach(button => {
                const emoticon = emoticonService.getEmoticons().find(
                    e => e.id === parseInt(button.dataset.emoticonId)
                );
                updateButtonState(button, emoticon);
            });
        }
    });
    emoticonGrid.insertAdjacentElement('afterend', resetButton);
});