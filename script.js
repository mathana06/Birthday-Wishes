// Birthday Interactive Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeCarousel();
    initializeButtons();
    initializeCake();
    initializeAgeCounter();
    initializeCricketBall();
    
    // Add welcome animation
    setTimeout(() => {
        document.querySelector('.main-container').classList.add('zoom-in');
    }, 500);
});

// Carousel functionality for birthday wishes
function initializeCarousel() {
    const wishCards = document.querySelectorAll('.wish-card');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentWish = 0;
    
    function showWish(index) {
        wishCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });
    }
    
    function nextWish() {
        currentWish = (currentWish + 1) % wishCards.length;
        showWish(currentWish);
    }
    
    function prevWish() {
        currentWish = (currentWish - 1 + wishCards.length) % wishCards.length;
        showWish(currentWish);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextWish);
    prevBtn.addEventListener('click', prevWish);
    
    // Auto-advance carousel every 4 seconds
    setInterval(nextWish, 4000);
}

// Interactive buttons functionality
function initializeButtons() {
    const confettiBtn = document.getElementById('confetti-btn');
    const musicBtn = document.getElementById('music-btn');
    const surpriseBtn = document.getElementById('surprise-btn');
    
    let isPlaying = false;
    
    // Confetti button
    confettiBtn.addEventListener('click', function() {
        createConfetti();
        this.classList.add('shake');
        setTimeout(() => this.classList.remove('shake'), 500);
        
        // Add glow effect to the page
        document.body.style.animation = 'birthday-glow 1s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 1000);
    });
    
    // Music button
    musicBtn.addEventListener('click', function() {
        if (!isPlaying) {
            playBirthdayTune();
            this.textContent = '🔇 Stop Music';
            this.classList.add('birthday-glow');
            isPlaying = true;
        } else {
            stopBirthdayTune();
            this.textContent = '🎵 Party Music';
            this.classList.remove('birthday-glow');
            isPlaying = false;
        }
    });
    
    // Surprise button
    surpriseBtn.addEventListener('click', function() {
        showSurpriseModal();
        this.classList.add('shake');
        setTimeout(() => this.classList.remove('shake'), 500);
    });
}

// Confetti creation function
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8', '#00b894'];
    
    // Clear existing confetti
    confettiContainer.innerHTML = '';
    
    // Create 50 confetti pieces
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confettiContainer.appendChild(confetti);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 5000);
}

// Birthday cake interaction
function initializeCake() {
    const cake = document.getElementById('birthday-cake');
    const flames = document.querySelectorAll('.flame');
    let candlesBlown = 0;
    
    cake.addEventListener('click', function() {
        if (candlesBlown < flames.length) {
            // Blow out candles one by one
            flames[candlesBlown].style.display = 'none';
            candlesBlown++;
            
            // Add shake effect
            this.classList.add('shake');
            setTimeout(() => this.classList.remove('shake'), 500);
            
            // If all candles are blown out
            if (candlesBlown === flames.length) {
                setTimeout(() => {
                    alert('🎉 Happy Birthday! Your wish has been made! 🎂✨');
                    createConfetti();
                    // Relight candles after 3 seconds
                    setTimeout(() => {
                        flames.forEach(flame => flame.style.display = 'block');
                        candlesBlown = 0;
                    }, 3000);
                }, 500);
            }
        }
    });
}

// Age counter animation
function initializeAgeCounter() {
    const ageCounter = document.getElementById('age-counter');
    let count = 0;
    const targetAge = new Date().getFullYear() - 1998; // Adjust birth year as needed
    
    const counter = setInterval(() => {
        count++;
        ageCounter.textContent = count;
        
        if (count >= targetAge) {
            clearInterval(counter);
            ageCounter.textContent = targetAge + '+';
            ageCounter.style.color = '#f9ca24';
            ageCounter.style.fontWeight = 'bold';
        }
    }, 100);
}

// Cricket ball interaction
function initializeCricketBall() {
    const cricketBall = document.getElementById('cricket-ball');
    
    cricketBall.addEventListener('click', function() {
        // Create a "hit" effect
        this.style.transform = 'scale(1.2)';
        this.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8)';
        
        // Show cricket-themed message
        const messages = [
            "That's a SIX! 🏏⚡",
            "What a shot! 🎯",
            "Boundary! 🏏💥",
            "Perfect timing! ⏰",
            "You're my champion! 🏆"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        showTemporaryMessage(randomMessage);
        
        // Reset after animation
        setTimeout(() => {
            this.style.transform = '';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        }, 300);
    });
}

// Surprise modal functionality
function showSurpriseModal() {
    const modal = document.getElementById('surprise-modal');
    const closeBtn = document.getElementById('close-modal');
    
    modal.style.display = 'block';
    createConfetti();
    
    // Close modal functionality
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Temporary message display
function showTemporaryMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        color: white;
        padding: 20px 40px;
        border-radius: 50px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 3000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: zoom-in 0.5s ease-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 500);
    }, 2000);
}

// Simple birthday tune using Web Audio API
let audioContext;
let oscillators = [];

function playBirthdayTune() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Happy Birthday melody (simplified)
    const notes = [
        { freq: 261.63, duration: 0.5 }, // C
        { freq: 261.63, duration: 0.5 }, // C
        { freq: 293.66, duration: 1 },   // D
        { freq: 261.63, duration: 1 },   // C
        { freq: 349.23, duration: 1 },   // F
        { freq: 329.63, duration: 2 },   // E
        { freq: 261.63, duration: 0.5 }, // C
        { freq: 261.63, duration: 0.5 }, // C
        { freq: 293.66, duration: 1 },   // D
        { freq: 261.63, duration: 1 },   // C
        { freq: 392.00, duration: 1 },   // G
        { freq: 349.23, duration: 2 }    // F
    ];
    
    let currentTime = audioContext.currentTime;
    
    notes.forEach((note, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(note.freq, currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + note.duration);
        
        oscillators.push(oscillator);
        currentTime += note.duration;
    });
    
    // Loop the melody
    setTimeout(() => {
        if (oscillators.length > 0) {
            playBirthdayTune();
        }
    }, currentTime * 1000);
}

function stopBirthdayTune() {
    oscillators.forEach(osc => {
        try {
            osc.stop();
        } catch (e) {
            // Oscillator might already be stopped
        }
    });
    oscillators = [];
}

// Add some extra interactive features
document.addEventListener('mousemove', function(e) {
    // Create subtle particle trail on mouse move (throttled)
    if (Math.random() > 0.95) {
        createMouseParticle(e.clientX, e.clientY);
    }
});

function createMouseParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: rgba(255, 107, 107, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
        animation: particle-fade 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            document.body.removeChild(particle);
        }
    }, 1000);
}

// Add particle fade animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-fade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-20px);
        }
    }
    
    @keyframes fadeOut {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);

// Add keyboard shortcuts for fun
document.addEventListener('keydown', function(e) {
    switch(e.key.toLowerCase()) {
        case 'c':
            createConfetti();
            break;
        case 's':
            showSurpriseModal();
            break;
        case 'h':
            showTemporaryMessage('Happy Birthday My Love! 💖🏏');
            break;
    }
});

// Add special birthday message that appears after page loads
setTimeout(() => {
    showTemporaryMessage('Welcome to your special day! 🎉🏏');
}, 2000);

// Cricket-themed easter eggs
let clickCount = 0;
document.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 50) {
        showTemporaryMessage('Century of clicks! You\'re a legend! 💯🏏');
        createConfetti();
        clickCount = 0;
    }
});
