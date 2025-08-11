class CareerRandomizer {
    constructor() {
        this.cardsContainer = document.getElementById('cardsContainer');
        this.randomizeButton = document.getElementById('randomizeButton');
        this.careers = [];
        this.currentCards = [];
        this.isAnimating = false;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.randomizeButton.addEventListener('click', () => this.startRandomization());
    }

    async initialize(careers) {
        console.log('Initializing randomizer with careers:', careers);
        this.careers = careers || [];
        if (this.careers.length === 0) {
            console.error('No careers provided for initialization');
        }
        await this.createInitialCards();
    }

    async createInitialCards() {
        this.cardsContainer.innerHTML = '';
        this.currentCards = [];
        
        // Create placeholder cards
        for (let i = 0; i < 3; i++) {
            const card = document.createElement('div');
            card.className = 'career-option-card pixel-border';
            card.innerHTML = `
                <div class="card-content">
                    <div class="card-title">???</div>
                    <div class="card-category">Loading...</div>
                </div>
            `;
            this.cardsContainer.appendChild(card);
            this.currentCards.push(card);
        }
    }

    async startRandomization() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.randomizeButton.disabled = true;

        // Hide any existing career card
        const careerCard = document.getElementById('careerCard');
        careerCard.style.display = 'none';

        // Start the glitch effect on all cards
        this.currentCards.forEach(card => {
            card.classList.remove('selected', 'highlight-animation');
            card.classList.add('glitching');
        });

        // Randomize for a few seconds with increasing delays
        for (let i = 0; i < 20; i++) {
            await this.updateCardsContent();
            await this.delay(50 + (i * 30));
        }

        // Final selection
        const selectedCareer = this.careers[Math.floor(Math.random() * this.careers.length)];
        await this.showFinalSelection(selectedCareer);

        this.isAnimating = false;
        this.randomizeButton.disabled = false;
    }

    async updateCardsContent() {
        this.currentCards.forEach(card => {
            const randomCareer = this.careers[Math.floor(Math.random() * this.careers.length)];
            if (randomCareer) {
                const title = card.querySelector('.card-title');
                const category = card.querySelector('.card-category');
                
                title.textContent = randomCareer.name.split(' ')[0]; // Show first word to fit
                category.textContent = randomCareer.category;
            }
        });

        // Hide the career card during animation
        const careerCard = document.getElementById('careerCard');
        if (careerCard) {
            careerCard.style.display = 'none';
        }
    }

    async startRandomization() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.randomizeButton.disabled = true;

        // Hide any existing career card
        const careerCard = document.getElementById('careerCard');
        if (careerCard) {
            careerCard.style.display = 'none';
        }

        // Reset all cards
        this.currentCards.forEach(card => {
            card.classList.remove('selected', 'highlight-animation');
            card.classList.add('glitching');
        });

        try {
            // Randomize for a few seconds with increasing delays
            for (let i = 0; i < 20; i++) {
                await this.updateCardsContent();
                await this.delay(50 + (i * 30));
            }

            // Select final career
            const selectedCareer = this.careers[Math.floor(Math.random() * this.careers.length)];
            if (selectedCareer) {
                await this.showFinalSelection(selectedCareer);
            } else {
                console.error('No career selected');
            }
        } catch (error) {
            console.error('Error during randomization:', error);
        } finally {
            this.isAnimating = false;
            this.randomizeButton.disabled = false;
        }
    }

    async showFinalSelection(selectedCareer) {
        // Stop the glitch effect and remove any existing selections
        this.currentCards.forEach(card => {
            card.classList.remove('glitching', 'selected', 'highlight-animation');
        });

        // Highlight the middle card with special effects
        const middleCard = this.currentCards[1];
        middleCard.classList.add('selected', 'highlight-animation');

        // Update middle card content
        const title = middleCard.querySelector('.card-title');
        const category = middleCard.querySelector('.card-category');
        title.textContent = selectedCareer.name.split(' ')[0]; // Show first word to fit
        category.textContent = selectedCareer.category;

        // Add dramatic pause before showing career info
        await this.delay(600);

        // Show the career card with full information
        const careerCard = document.getElementById('careerCard');
        const careerContent = `
            <div class="card-content pixel-border">
                <h2 id="careerTitle" class="glow-text">${selectedCareer.name}</h2>
                <div class="category" id="careerCategory">${selectedCareer.category}</div>
                
                <div class="details-grid">
                    <div class="detail-section pixel-border">
                        <h3>🎯 Required Skills</h3>
                        <ul>
                            ${selectedCareer.skills.map(skill => `<li class="fade-in">${skill}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="detail-section pixel-border">
                        <h3>🛠️ Tools & Technologies</h3>
                        <ul>
                            ${selectedCareer.tools.map(tool => `<li class="fade-in">${tool}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="detail-section pixel-border">
                        <h3>💰 Salary Range</h3>
                        <p class="fade-in salary-text">India: ${selectedCareer.salaryINR}</p>
                        <p class="fade-in salary-text">USA: ${selectedCareer.salaryUSD}</p>
                    </div>

                    <div class="fun-fact pixel-border">
                        <h3>✨ Fun Fact</h3>
                        <p class="fade-in">${selectedCareer.funFact}</p>
                    </div>

                    <div class="fun-fact pixel-border">
                        <h3>🏢 Example Companies</h3>
                        <ul class="companies-list">
                            ${selectedCareer.companies ? selectedCareer.companies.map(company => `<li class="fade-in">${company}</li>`).join('') : '<li>Information not available</li>'}
                        </ul>
                    </div>

                    <div class="actions">
                        <a href="${selectedCareer.resourceLink}" target="_blank" class="learn-more pixel-button glow-text">Learn More</a>
                        <button onclick="window.careerRandomizer.startRandomization()" class="spin-again pixel-button">Try Again</button>
                    </div>
                </div>
            </div>
        `;
        
        careerCard.innerHTML = careerContent;
        careerCard.style.display = 'block';
        careerCard.style.visibility = 'visible';
        careerCard.style.opacity = '1';
        
        // Re-enable the randomize button
        this.randomizeButton.disabled = false;
        this.isAnimating = false;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the randomizer when the page loads
window.addEventListener('load', () => {
    window.careerRandomizer = new CareerRandomizer();
    // Initialize with careers data
    window.careerRandomizer.initialize(careers);
});
