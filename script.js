class ImageGuessingGame {
    constructor() {
        this.currentImage = null;
        this.currentScore = 0;
        this.attemptsLeft = 5;
        this.images = [];
        this.currentImageIndex = -1;
        this.coverImages = {
            5: 'https://raw.githubusercontent.com/Megalonio/pok-guessr/main/images/cover5.png',
            4: 'https://raw.githubusercontent.com/Megalonio/pok-guessr/main/images/cover4.png',
            3: 'https://raw.githubusercontent.com/Megalonio/pok-guessr/main/images/cover3.png',
            2: 'https://raw.githubusercontent.com/Megalonio/pok-guessr/main/images/cover2.png',
            1: 'https://raw.githubusercontent.com/Megalonio/pok-guessr/main/images/cover1.png'
        };

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
        this.updateSuggestions(); // Call this once to populate all suggestions
    }

    async loadImages() {
        // Pokemon image database with English and French names
        this.images = [
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/venusaur.png',
            answers: ['venusaur', 'florizarre']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/charizard.png',
            answers: ['charizard', 'dracaufeu']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/blastoise.png',
            answers: ['blastoise', 'tortank']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/butterfree.png',
            answers: ['butterfree', 'papilusion']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/beedrill.png',
            answers: ['beedrill', 'dardargnan']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/pidgeot.png',
            answers: ['pidgeot', 'roucarnage']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/raticate.png',
            answers: ['raticate', 'rattatac']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/fearow.png',
            answers: ['fearow', 'rapasdepic']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/arbok.png',
            answers: ['arbok', 'arbok']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/raichu.png',
            answers: ['raichu', 'raichu']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/sandslash.png',
            answers: ['sandslash', 'sablaireau']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/nidoqueen.png',
            answers: ['nidoqueen', 'nidoqueen']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/nidoking.png',
            answers: ['nidoking', 'nidoking']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/clefable.png',
            answers: ['clefable', 'melodelfe']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/ninetales.png',
            answers: ['ninetales', 'feunard']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/wigglytuff.png',
            answers: ['wigglytuff', 'grodoudou']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/vileplume.png',
            answers: ['vileplume', 'rafflesia']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/parasect.png',
            answers: ['parasect', 'parasect']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/venomoth.png',
            answers: ['venomoth', 'aéromite']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/dugtrio.png',
            answers: ['dugtrio', 'triopikeur']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/persian.png',
            answers: ['persian', 'persian']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/golduck.png',
            answers: ['golduck', 'akwakwak']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/primeape.png',
            answers: ['primeape', 'colossinge']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/arcanine.png',
            answers: ['arcanine', 'arcanin']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/poliwrath.png',
            answers: ['poliwrath', 'tartard']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/alakazam.png',
            answers: ['alakazam', 'alakazam']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/machamp.png',
            answers: ['machamp', 'mackogneur']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/victreebel.png',
            answers: ['victreebel', 'empiflor']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/tentacruel.png',
            answers: ['tentacruel', 'tentacruel']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/golem.png',
            answers: ['golem', 'grolem']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/rapidash.png',
            answers: ['rapidash', 'galopa']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/slowbro.png',
            answers: ['slowbro', 'flagadoss']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/magneton.png',
            answers: ['magneton', 'magneton']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/farfetchd.png',
            answers: ['farfetchd', 'canarticho']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/dodrio.png',
            answers: ['dodrio', 'dodrio']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/dewgong.png',
            answers: ['dewgong', 'lamantine']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/muk.png',
            answers: ['muk', 'grotadmorv']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/cloyster.png',
            answers: ['cloyster', 'crustabri']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/gengar.png',
            answers: ['gengar', 'ectoplasma']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/onix.png',
            answers: ['onix', 'onix']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/hypno.png',
            answers: ['hypno', 'hypnomade']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/kingler.png',
            answers: ['kingler', 'krabboss']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/electrode.png',
            answers: ['electrode', 'electrode']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/exeggutor.png',
            answers: ['exeggutor', 'noadkoko']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/marowak.png',
            answers: ['marowak', 'ossatueur']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/hitmonlee.png',
            answers: ['hitmonlee', 'kicklee']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/hitmonchan.png',
            answers: ['hitmonchan', 'tygnon']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/lickitung.png',
            answers: ['lickitung', 'excelangue']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/weezing.png',
            answers: ['weezing', 'smogogo']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/rhydon.png',
            answers: ['rhydon', 'rhinoféros']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/chansey.png',
            answers: ['chansey', 'leveinard']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/tangela.png',
            answers: ['tangela', 'saquedeneu']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/kangaskhan.png',
            answers: ['kangaskhan', 'kangourex']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/seadra.png',
            answers: ['seadra', 'hypocéan']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/seaking.png',
            answers: ['seaking', 'poissoroy']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/starmie.png',
            answers: ['starmie', 'staross']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/mr-mime.png',
            answers: ['mr-mime', 'm. mime']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/scyther.png',
            answers: ['scyther', 'insécateur']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/jynx.png',
            answers: ['jynx', 'lippoutou']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/electabuzz.png',
            answers: ['electabuzz', 'élektek']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/magmar.png',
            answers: ['magmar', 'magmar']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/pinsir.png',
            answers: ['pinsir', 'scarabrute']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/tauros.png',
            answers: ['tauros', 'tauros']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/gyarados.png',
            answers: ['gyarados', 'leviator']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/lapras.png',
            answers: ['lapras', 'lokhlass']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/ditto.png',
            answers: ['ditto', 'métamorph']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/eevee.png',
            answers: ['eevee', 'évoli']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/vaporeon.png',
            answers: ['vaporeon', 'aquali']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/jolteon.png',
            answers: ['jolteon', 'voltali']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/flareon.png',
            answers: ['flareon', 'pyroli']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/porygon.png',
            answers: ['porygon', 'porygon']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/omastar.png',
            answers: ['omastar', 'amarinobi']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/kabutops.png',
            answers: ['kabutops', 'kabutops']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/aerodactyl.png',
            answers: ['aerodactyl', 'ptéra']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/snorlax.png',
            answers: ['snorlax', 'ronflex']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/articuno.png',
            answers: ['articuno', 'artikodin']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/zapdos.png',
            answers: ['zapdos', 'électhor']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/moltres.png',
            answers: ['moltres', 'sulfura']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/dragonite.png',
            answers: ['dragonite', 'dracolosse']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/mewtwo.png',
            answers: ['mewtwo', 'mewtwo']
        },
        {
            path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/mew.png',
            answers: ['mew', 'mew']
        }
    ];
        this.loadNextImage();
    }

    updateCoverImage() {
        this.coverImage.src = this.coverImages[this.attemptsLeft];
    }

    loadNextImage() {
        // Get a random index instead of incrementing
        this.currentImageIndex = Math.floor(Math.random() * this.images.length);

        this.currentImage = this.images[this.currentImageIndex];
        this.mainImage.src = this.currentImage.path;
        this.resetAttempts();
        this.updateCoverImage();
        this.guessInput.value = '';
        this.messageElement.textContent = '';
        this.messageElement.className = '';

        // Re-enable controls and show cover image
        this.guessInput.disabled = false;
        this.submitButton.disabled = false;
        this.coverImage.style.display = 'block';
    }

        updateSuggestions() {
            const datalist = document.getElementById('pokemonSuggestions');
            datalist.innerHTML = ''; // Clear previous suggestions

            // Add all possible answers from all Pokémon
            this.images.forEach(image => {
                image.answers.forEach(answer => {
                    const option = document.createElement('option');
                    option.value = answer;
                    datalist.appendChild(option);
                });
            });
        }

    resetAttempts() {
        this.attemptsLeft = 5;
        this.updateAttemptsDisplay();
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
                // Custom error message with the user's guess
                this.showMessage(`"${guess}" was wrong, try again!`, 'error');
            }
        }

        // Clear the input bar after submission
        this.guessInput.value = '';
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