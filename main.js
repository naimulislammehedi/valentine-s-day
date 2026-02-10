// Generate falling hearts for background
const background = document.getElementById('background');
for (let i = 0; i < 50; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    // Random properties for each heart
    const size = Math.random() * 20 + 10;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 10 + 10;
    const animationDelay = Math.random() * 5;
    const color = `hsl(${Math.random() * 30 + 330}, 100%, ${Math.random() * 20 + 60}%)`;

    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${left}%`;
    heart.style.animationDuration = `${animationDuration}s`;
    heart.style.animationDelay = `${animationDelay}s`;
    heart.style.backgroundColor = color;
    heart.style.setProperty('--heart-color', color);

    // Set pseudo-element colors
    heart.style.setProperty('--heart-color', color);
    const style = document.createElement('style');
    style.textContent = `
                .heart:nth-child(${i + 1}):before, 
                .heart:nth-child(${i + 1}):after {
                    background-color: ${color};
                }
            `;
    document.head.appendChild(style);

    background.appendChild(heart);
}

// Get elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');

// Yes button click handler
yesBtn.addEventListener('click', function () {
    // Show the message with animation
    message.style.display = 'block';

    // Animate the yes button
    yesBtn.innerHTML = '<i class="fas fa-heart"></i> YES! 💖';
    yesBtn.style.transform = 'scale(1.5)';
    yesBtn.style.transition = 'transform 0.5s ease';

    // Create floating hearts animation
    for (let i = 0; i < 20; i++) {
        createFloatingHeart();
    }

    // Change background color
    document.querySelector('.background').style.background = 'linear-gradient(to bottom, #ffccd5, #ff8fab)';

    // Disable the no button
    noBtn.style.opacity = '0.5';
    noBtn.style.cursor = 'not-allowed';
    noBtn.onmouseover = null;
    noBtn.onclick = null;

    // Play a celebration sound (optional)
    playCelebrationSound();
});

// No button hover/click handler (makes it jump around)
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton);

function moveButton() {
    // Add jump animation
    noBtn.classList.add('jump');

    // Remove the animation class after it completes
    setTimeout(() => {
        noBtn.classList.remove('jump');
    }, 500);

    // Move button to random position
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const buttonRect = noBtn.getBoundingClientRect();

    // Calculate random position within container
    const maxX = containerRect.width - buttonRect.width - 40;
    const maxY = containerRect.height - buttonRect.height - 40;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Apply new position (relative to container)
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    // Change button text temporarily
    const originalText = noBtn.innerHTML;
    const funnyMessages = [
        "Are you sure?",
        "Think again!",
        "Try again!",
        "Please?",
        "Don't click no!",
        "I'm shy!",
        "You can't catch me!"
    ];

    const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    noBtn.innerHTML = `<i class="far fa-heart"></i> ${randomMessage}`;

    // Revert to original text after a short delay
    setTimeout(() => {
        noBtn.innerHTML = originalText;
    }, 1000);
}

// Function to create floating hearts for celebration
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.fontSize = Math.random() * 30 + 20 + 'px';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    heart.style.opacity = '0.8';
    heart.style.zIndex = '9999';
    heart.style.pointerEvents = 'none';

    document.body.appendChild(heart);

    // Animate the heart floating up
    const animation = heart.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 0.8 },
        { transform: `translateY(-${Math.random() * 300 + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
        duration: Math.random() * 2000 + 2000,
        easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    });

    // Remove heart after animation completes
    animation.onfinish = () => {
        document.body.removeChild(heart);
    };
}

// Function to play a celebration sound
function playCelebrationSound() {
    // Try to play a simple celebration sound using the Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // Audio might not be supported, just continue silently
        console.log("Audio not supported in this browser");
    }
}

// Make page responsive on window resize
window.addEventListener('resize', function () {
    // Reset no button position on resize to avoid it being out of bounds
    if (noBtn.style.position === 'absolute') {
        noBtn.style.position = 'relative';
        noBtn.style.left = 'auto';
        noBtn.style.top = 'auto';
    }
});