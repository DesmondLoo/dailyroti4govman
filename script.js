// js/imageService.js
class ImageService {
    constructor() {
        this.imageDatabase = [
            { width: 600, height: 400, caption: "Mountain Landscape" },
            { width: 500, height: 500, caption: "Urban Scene" },
            { width: 600, height: 300, caption: "Ocean View" },
            { width: 400, height: 600, caption: "Forest Path" },
            { width: 550, height: 450, caption: "Desert Sunset" },
            { width: 500, height: 400, caption: "Snow Peak" },
            { width: 600, height: 350, caption: "City Skyline" }
        ];
    }

    getTodayImage() {
        const today = new Date();
        const dayOfYear = Math.floor(
            (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
        );
        return this.imageDatabase[dayOfYear % this.imageDatabase.length];
    }
}

// js/emoticonService.js
class EmoticonService {
    constructor() {
        this.emoticons = [
            { id: 1, symbol: '😍', label: 'Love it!', count: 42 },
            { id: 2, symbol: '😊', label: 'Happy', count: 38 },
            { id: 3, symbol: '🤔', label: 'Interesting', count: 25 },
            { id: 4, symbol: '😮', label: 'Wow', count: 18 },
            { id: 5, symbol: '😢', label: 'Sad', count: 12 },
            { id: 6, symbol: '😴', label: 'Boring', count: 8 }
        ];
    }

    getEmoticons() {
        return this.emoticons;
    }

    submitReaction(emoticonId) {
        const emoticon = this.emoticons.find(e => e.id === emoticonId);
        if (emoticon) {
            emoticon.count++;
            this.saveReactions();
            return emoticon;
        }
        return null;
    }

    saveReactions() {
        // In a real application, this would save to a backend
        localStorage.setItem('emoticons', JSON.stringify(this.emoticons));
    }

    loadReactions() {
        const saved = localStorage.getItem('emoticons');
        if (saved) {
            this.emoticons = JSON.parse(saved);
        }
    }
}

// js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize services
    const imageService = new ImageService();
    const emoticonService = new EmoticonService();
    
    // Load saved reactions
    emoticonService.loadReactions();
    
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
    
    emoticonService.getEmoticons().forEach(emoticon => {
        const button = document.createElement('button');
        button.className = 'emoticon-button';
        button.dataset.emoticonId = emoticon.id;
        
        button.innerHTML = `
            <span class="emoticon-symbol">${emoticon.symbol}</span>
            <span class="emoticon-label">${emoticon.label}</span>
            <span class="emoticon-count">${emoticon.count}</span>
        `;
        
        button.addEventListener('click', function() {
            if (selectedButton) {
                selectedButton.classList.remove('selected');
            }
            
            button.classList.add('selected');
            selectedButton = button;
            
            const updatedEmoticon = emoticonService.submitReaction(emoticon.id);
            if (updatedEmoticon) {
                button.querySelector('.emoticon-count').textContent = updatedEmoticon.count;
            }
        });
        
        emoticonGrid.appendChild(button);
    });
});