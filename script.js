class ImageGuessingGame {
    constructor() {
        this.currentImage = null;
        this.currentScore = 0;
        this.attemptsLeft = 5;
        this.images = [];
        this.currentImageIndex = -1;

        // DOM Elements
        this.mainImage = document.getElementById('mainImage');
        this.coverImage = document.getElementById('coverImage');
        this.guessInput = document.getElementById('guessInput');
        this.submitButton = document.getElementById('submitGuess');
        this.nextButton = document.getElementById('nextImage');
        this.scoreElement = document.getElementById('score');
        this.attemptsElement = document.getElementById('attempts');
        this.messageElement = document.getElementById('message');

        // Event Listeners
        this.submitButton.addEventListener('click', () => this.checkGuess());
        this.nextButton.addEventListener('click', () => this.loadNextImage());
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkGuess();
        });

        // Initialize
        this.loadImages();
    }

    async loadImages() {
        // Pokemon image database with English and French names
        this.images = [
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/charizard.png',
                answers: ['charizard', 'dracaufeu']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/pikachu.png',
                answers: ['pikachu', 'pikachu']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/mewtwo.png',
                answers: ['mewtwo', 'mewtwo']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/gyarados.png',
                answers: ['gyarados', 'leviator']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/snorlax.png',
                answers: ['snorlax', 'ronflex']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/dragonite.png',
                answers: ['dragonite', 'dracolosse']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/gengar.png',
                answers: ['gengar', 'ectoplasma']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/alakazam.png',
                answers: ['alakazam', 'alakazam']
            }
        ];
        this.loadNextImage();
    }

    loadNextImage() {
        this.currentImageIndex++;
        if (this.currentImageIndex >= this.images.length) {
            this.currentImageIndex = 0; // Loop back to start
        }

        this.currentImage = this.images[this.currentImageIndex];
        this.mainImage.src = this.currentImage.path;
        this.resetAttempts();
        this.updateCoverImage();
        this.guessInput.value = '';
        this.messageElement.textContent = '';
        this.messageElement.className = '';
    }

    resetAttempts() {
        this.attemptsLeft = 5;
        this.updateAttemptsDisplay();
    }

    updateCoverImage() {
        this.coverImage.src = `covers/${this.attemptsLeft}.png`;
    }

    updateAttemptsDisplay() {
        this.attemptsElement.textContent = this.attemptsLeft;
    }

    updateScore(points) {
        this.currentScore += points;
        this.scoreElement.textContent = this.currentScore;
    }

    checkGuess() {
        const guess = this.guessInput.value.trim().toLowerCase();
        
        if (!guess) {
            this.showMessage('Please enter a guess!', 'error');
            return;
        }

        const correctAnswers = this.currentImage.answers.map(answer => 
            answer.toLowerCase().replace(/-/g, '')
        );

        if (correctAnswers.includes(guess)) {
            // Correct guess
            this.updateScore(this.attemptsLeft);
            this.showMessage('Correct! You earned ' + this.attemptsLeft + ' points!', 'success');
            this.coverImage.style.display = 'none';
            this.submitButton.disabled = true;
            this.guessInput.disabled = true;
        } else {
            // Wrong guess
            this.attemptsLeft--;
            this.updateAttemptsDisplay();
            this.updateCoverImage();
            
            if (this.attemptsLeft <= 0) {
                this.showMessage('Game Over! The correct answer was: ' + this.currentImage.answers[0], 'error');
                this.submitButton.disabled = true;
                this.guessInput.disabled = true;
            } else {
                this.showMessage('Wrong guess! Try again.', 'error');
            }
        }
    }

    showMessage(text, type) {
        this.messageElement.textContent = text;
        this.messageElement.className = type;
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ImageGuessingGame();
});