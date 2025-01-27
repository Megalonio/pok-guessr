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
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/torterra.png',
                answers: ['torterra', 'torterra']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/blaziken.png',
                answers: ['blaziken', 'brasegali']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/luxray.png',
                answers: ['luxray', 'luxray']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/staraptor.png',
                answers: ['staraptor', 'etouraptor']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/swampert.png',
                answers: ['swampert', 'laggron']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/aggron.png',
                answers: ['aggron', 'galeking']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/heracross.png',
                answers: ['heracross', 'scarhino']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/garchomp.png',
                answers: ['garchomp', 'carchacrok']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/salamence.png',
                answers: ['salamence', 'drattak']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/metagross.png',
                answers: ['metagross', 'metalosse']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/tyranitar.png',
                answers: ['tyranitar', 'tyranocif']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/empoleon.png',
                answers: ['empoleon', 'pingoleon']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/infernape.png',
                answers: ['infernape', 'simiabraz']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/flygon.png',
                answers: ['flygon', 'libegon']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/electivire.png',
                answers: ['electivire', 'elekable']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/magmortar.png',
                answers: ['magmortar', 'maganon']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/togekiss.png',
                answers: ['togekiss', 'togekiss']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/mamoswine.png',
                answers: ['mamoswine', 'mammochon']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/weavile.png',
                answers: ['weavile', 'dimoret']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/lucario.png',
                answers: ['lucario', 'lucario']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/roserade.png',
                answers: ['roserade', 'roserade']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/gallade.png',
                answers: ['gallade', 'gallame']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/altaria.png',
                answers: ['altaria', 'altaria']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/gliscor.png',
                answers: ['gliscor', 'scorvol']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/spiritomb.png',
                answers: ['spiritomb', 'spiritomb']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/dusknoir.png',
                answers: ['dusknoir', 'noctunoir']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/froslass.png',
                answers: ['froslass', 'momartik']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/porygon-z.png',
                answers: ['porygon-z', 'porygon-z']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/rhyperior.png',
                answers: ['rhyperior', 'rhinastoc']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/tangrowth.png',
                answers: ['tangrowth', 'bouldeneu']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/milotic.png',
                answers: ['milotic', 'milobellus']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/slowbro.png',
                answers: ['slowbro', 'flagadoss']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/gardevoir.png',
                answers: ['gardevoir', 'gardevoir']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/exeggutor.png',
                answers: ['exeggutor', 'noadkoko']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/ambipom.png',
                answers: ['ambipom', 'capidextre']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/donphan.png',
                answers: ['donphan', 'donphan']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/houndoom.png',
                answers: ['houndoom', 'demolosse']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/scizor.png',
                answers: ['scizor', 'cizayox']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/venusaur.png',
                answers: ['venusaur', 'florizarre']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/blastoise.png',
                answers: ['blastoise', 'tortank']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/arcanine.png',
                answers: ['arcanine', 'arcanin']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/nidoking.png',
                answers: ['nidoking', 'nidoking']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/nidoqueen.png',
                answers: ['nidoqueen', 'nidoqueen']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/clefable.png',
                answers: ['clefable', 'melodelfe']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/wigglytuff.png',
                answers: ['wigglytuff', 'grodoudou']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/poliwrath.png',
                answers: ['poliwrath', 'tartard']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/vileplume.png',
                answers: ['vileplume', 'rafflesia']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/victreebel.png',
                answers: ['victreebel', 'empiflor']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/slowking.png',
                answers: ['slowking', 'roigada']
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
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/golem.png',
                answers: ['golem', 'grolem']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/rapidash.png',
                answers: ['rapidash', 'galopa']
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
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/hitmonlee.png',
                answers: ['hitmonlee', 'kicklee']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/hitmonchan.png',
                answers: ['hitmonchan', 'tygnon']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/kangaskhan.png',
                answers: ['kangaskhan', 'kangourex']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/tauros.png',
                answers: ['tauros', 'tauros']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/lapras.png',
                answers: ['lapras', 'lokhlass']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/omastar.png',
                answers: ['omastar', 'amphinobi']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/kabutops.png',
                answers: ['kabutops', 'kabutops']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/aerodactyl.png',
                answers: ['aerodactyl', 'ptera']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/xatu.png',
                answers: ['xatu', 'xatu']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/ampharos.png',
                answers: ['ampharos', 'pharamp']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/bellossom.png',
                answers: ['bellossom', 'joliflor']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/forretress.png',
                answers: ['forretress', 'foretress']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/granbull.png',
                answers: ['granbull', 'granbull']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/qwilfish.png',
                answers: ['qwilfish', 'qwilfish']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/shuckle.png',
                answers: ['shuckle', 'caratroc']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/octillery.png',
                answers: ['octillery', 'octillery']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/mantine.png',
                answers: ['mantine', 'demanta']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/skarmory.png',
                answers: ['skarmory', 'airmure']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/hariyama.png',
                answers: ['hariyama', 'hariyama']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/walrein.png',
                answers: ['walrein', 'kaimorse']
            },
            {
                path: 'https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/alakazam.png',
                answers: ['alakazam', 'alakazam']
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