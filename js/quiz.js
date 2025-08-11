// Get DOM elements
const startQuizButton = document.getElementById('startQuizButton');
const quizSection = document.getElementById('quizSection');

// Add click handler for the start button
startQuizButton.addEventListener('click', () => {
    // Hide the description and show the quiz
    document.querySelector('.description').style.display = 'none';
    startQuizButton.style.display = 'none';
    quizSection.classList.add('active');
    // Start the quiz
    startQuiz();
});

// Initialize quiz variables and questions
const quizQuestions = [
    {
        question: "What excites you most about technology?",
        options: [
            { text: "Solving complex mathematical problems", category: "THEORETICAL" },
            { text: "Creating things that people can use", category: "PRACTICAL" },
            { text: "Understanding how things work deeply", category: "ANALYTICAL" },
            { text: "Exploring new and emerging technologies", category: "INNOVATIVE" }
        ]
    },
    {
        question: "How do you prefer to work?",
        options: [
            { text: "Alone, focusing deeply on problems", category: "THEORETICAL" },
            { text: "In teams, building things together", category: "PRACTICAL" },
            { text: "Investigating and researching", category: "ANALYTICAL" },
            { text: "Experimenting with new ideas", category: "INNOVATIVE" }
        ]
    },
    {
        question: "What's your ideal work environment?",
        options: [
            { text: "Research laboratory or academic setting", category: "THEORETICAL" },
            { text: "Fast-paced tech company", category: "PRACTICAL" },
            { text: "Security operations center", category: "ANALYTICAL" },
            { text: "Startup or innovation hub", category: "INNOVATIVE" }
        ]
    },
    {
        question: "Which activity would you enjoy most?",
        options: [
            { text: "Developing new algorithms", category: "THEORETICAL" },
            { text: "Building user interfaces", category: "PRACTICAL" },
            { text: "Finding vulnerabilities in systems", category: "ANALYTICAL" },
            { text: "Creating new technologies", category: "INNOVATIVE" }
        ]
    },
    {
        question: "What's your approach to learning?",
        options: [
            { text: "Deep dive into theoretical concepts", category: "THEORETICAL" },
            { text: "Learning by doing and building", category: "PRACTICAL" },
            { text: "Systematic analysis and research", category: "ANALYTICAL" },
            { text: "Experimenting with cutting-edge tech", category: "INNOVATIVE" }
        ]
    }
];

class CareerQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.scores = {
            THEORETICAL: 0,
            PRACTICAL: 0,
            ANALYTICAL: 0,
            INNOVATIVE: 0
        };
        this.setupQuiz();
    }

    setupQuiz() {
        this.questionText = document.getElementById('questionText');
        this.answerOptions = document.getElementById('answerOptions');
        this.progressFill = document.getElementById('progressFill');
        this.quizSection = document.getElementById('quizSection');
        this.randomizeSection = document.getElementById('randomizeSection');
        
        this.showQuestion();
    }

    showQuestion() {
        const question = quizQuestions[this.currentQuestion];
        this.questionText.textContent = question.question;
        
        this.answerOptions.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'answer-button pixel-border';
            button.textContent = option.text;
            button.addEventListener('click', () => this.handleAnswer(option.category));
            this.answerOptions.appendChild(button);
        });

        this.updateProgress();
    }

    handleAnswer(category) {
        this.scores[category]++;
        this.currentQuestion++;

        if (this.currentQuestion < quizQuestions.length) {
            this.showQuestion();
        } else {
            this.showResults();
        }
    }

    updateProgress() {
        const progress = (this.currentQuestion / quizQuestions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
    }

    showResults() {
        const careerNiche = this.determineCareerNiche();
        window.selectedNiche = careerNiche;
        
        // Hide quiz, show randomizer
        this.quizSection.classList.remove('active');
        this.randomizeSection.classList.add('active');
        
        // Filter careers based on niche and initialize the randomizer
        const filteredCareers = careers.filter(career => 
            careerNiche.some(keyword => 
                career.title.includes(keyword) || 
                career.category.includes(keyword)
            )
        );
        
        // Initialize the randomizer with filtered careers
        if (window.careerRandomizer) {
            window.careerRandomizer.initialize(filteredCareers.length > 0 ? filteredCareers : careers);
        }
    }

    determineCareerNiche() {
        const maxScore = Math.max(...Object.values(this.scores));
        const niche = Object.keys(this.scores).find(key => this.scores[key] === maxScore);
        
        const nicheMap = {
            THEORETICAL: ["Quantum", "Research", "Algorithm"],
            PRACTICAL: ["Development", "Engineering", "Design"],
            ANALYTICAL: ["Security", "Analysis", "Data"],
            INNOVATIVE: ["Emerging", "AI", "Robotics"]
        };
        
        return nicheMap[niche];
    }
}

// Start the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CareerQuiz();
});
