// Dados de exemplo para os dinossauros
const dinosaurData = [
    {
        id: 1,
        name: "Tiranossauro Rex",
        period: "Cretáceo",
        diet: "Carnívoro",
        interesting_facts: ["ter braços muito pequenos em relação ao corpo", "ser um dos maiores carnívoros terrestres"]
    },
    {
        id: 2,
        name: "Tricerátops",
        period: "Cretáceo",
        diet: "Herbívoro",
        interesting_facts: ["ter três chifres na face", "ser um dinossauro blindado"]
    },
    {
        id: 3,
        name: "Velociraptor",
        period: "Cretáceo",
        diet: "Carnívoro",
        interesting_facts: ["ser menor do que mostram nos filmes", "ser um caçador inteligente em bandos"]
    },
    {
        id: 4,
        name: "Brontossauro",
        period: "Jurássico",
        diet: "Herbívoro",
        interesting_facts: ["ter um pescoço muito longo", "ser um dos maiores dinossauros"]
    },
    {
        id: 5,
        name: "Estegossauro",
        period: "Jurássico",
        diet: "Herbívoro",
        interesting_facts: ["ter placas ósseas nas costas", "usar espinhos na cauda como defesa"]
    },
    {
        id: 6,
        name: "Pterodáctilo",
        period: "Jurássico",
        diet: "Carnívoro",
        interesting_facts: ["não ser realmente um dinossauro, mas um réptil voador", "ter uma envergadura de asas impressionante"]
    },
    {
        id: 7,
        name: "Anquilossauro",
        period: "Cretáceo",
        diet: "Herbívoro",
        interesting_facts: ["ser um tanque blindado vivo", "ter uma clava óssea na cauda"]
    },
    {
        id: 8,
        name: "Espinossauro",
        period: "Cretáceo",
        diet: "Carnívoro",
        interesting_facts: ["ser maior que o Tiranossauro Rex", "provavelmente se alimentar de peixes"]
    },
    {
        id: 9,
        name: "Pteranodon",
        period: "Cretáceo",
        diet: "Carnívoro",
        interesting_facts: ["ter uma crista óssea na cabeça", "não ser um dinossauro, mas um réptil voador"]
    },
    {
        id: 10,
        name: "Diplodoco",
        period: "Jurássico",
        diet: "Herbívoro",
        interesting_facts: ["ter um pescoço extremamente longo", "ser um dos dinossauros mais longos"]
    }
];

// Estado da aplicação
let state = {
    dinosaurs: [],
    currentQuestion: 0,
    score: 0,
    selectedAnswer: null,
    showResult: false,
    quizStarted: false,
    questions: [],
    isLoading: true
};

// Elementos DOM
const loadingState = document.getElementById('loading-state');
const startState = document.getElementById('start-state');
const quizState = document.getElementById('quiz-state');
const resultState = document.getElementById('result-state');
const startQuizBtn = document.getElementById('start-quiz');
const nextQuestionBtn = document.getElementById('next-question');
const restartQuizBtn = document.getElementById('restart-quiz');
const questionNumber = document.getElementById('question-number');
const currentScore = document.getElementById('current-score');
const progressBar = document.getElementById('progress-bar');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionsCount = document.getElementById('questions-count');
const finalScore = document.getElementById('final-score');
const percentage = document.getElementById('percentage');
const scoreMessage = document.getElementById('score-message');
const correctAnswers = document.getElementById('correct-answers');
const incorrectAnswers = document.getElementById('incorrect-answers');
const trophyIcon = document.getElementById('trophy-icon');

// Funções
function generateQuestions(dinos) {
    if (dinos.length < 4) return;

    const questionTypes = [
        { type: 'period', template: 'Em que período viveu o {}?' },
        { type: 'diet', template: 'Qual era a dieta do {}?' },
        { type: 'name', template: 'Qual é o nome deste dinossauro conhecido por {}?' }
    ];

    const generatedQuestions = [];

    // Gerar 10 questões
    for (let i = 0; i < Math.min(10, dinos.length); i++) {
        const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        const correctDino = dinos[i];

        let question, correctAnswer, options;

        switch (questionType.type) {
            case 'period':
                question = `Em que período viveu o ${correctDino.name}?`;
                correctAnswer = correctDino.period;
                options = [...new Set([correctAnswer, 'Triássico', 'Jurássico', 'Cretáceo'])];
                break;

            case 'diet':
                question = `Qual era a dieta do ${correctDino.name}?`;
                correctAnswer = correctDino.diet;
                options = [...new Set([correctAnswer, 'Carnívoro', 'Herbívoro', 'Onívoro'])];
                break;

            case 'name':
                const hint = correctDino.interesting_facts?.[0] || `ser do período ${correctDino.period}`;
                question = `Qual dinossauro é conhecido por ${hint.toLowerCase()}?`;
                correctAnswer = correctDino.name;
                const otherDinos = dinos.filter(d => d.id !== correctDino.id).slice(0, 3);
                options = [correctAnswer, ...otherDinos.map(d => d.name)];
                break;

            default:
                continue;
        }

        // Embaralhar opções
        options = options.slice(0, 4).sort(() => Math.random() - 0.5);

        generatedQuestions.push({
            question,
            options,
            correctAnswer,
            dinosaur: correctDino
        });
    }

    return generatedQuestions;
}

function loadDinosaurs() {
    state.isLoading = true;
    // Simular carregamento assíncrono
    setTimeout(() => {
        state.dinosaurs = dinosaurData;
        state.questions = generateQuestions(dinosaurData);
        questionsCount.textContent = state.questions.length;
        state.isLoading = false;
        showStartScreen();
    }, 1500);
}

function showStartScreen() {
    loadingState.classList.add('hidden');
    startState.classList.remove('hidden');
    quizState.classList.add('hidden');
    resultState.classList.add('hidden');
}

function showQuizScreen() {
    loadingState.classList.add('hidden');
    startState.classList.add('hidden');
    quizState.classList.remove('hidden');
    resultState.classList.add('hidden');

    renderQuestion();
}

function showResultScreen() {
    loadingState.classList.add('hidden');
    startState.classList.add('hidden');
    quizState.classList.add('hidden');
    resultState.classList.remove('hidden');

    renderResults();
}

function renderQuestion() {
    const currentQ = state.questions[state.currentQuestion];

    questionNumber.textContent = `Pergunta ${state.currentQuestion + 1} de ${state.questions.length}`;
    currentScore.textContent = `Pontuação: ${state.score}`;
    progressBar.style.width = `${(state.currentQuestion / state.questions.length) * 100}%`;
    questionText.textContent = currentQ.question;

    // Limpar opções anteriores
    optionsContainer.innerHTML = '';

    // Adicionar novas opções
    currentQ.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.className = `option-button w-full p-4 text-left rounded-lg border-2 ${
            state.selectedAnswer === option
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-stone-200 hover:border-stone-300 text-stone-700'
        }`;
        optionButton.innerHTML = `<span class="font-medium">${String.fromCharCode(65 + index)}.</span> ${option}`;

        optionButton.addEventListener('click', () => {
            // Remover seleção anterior
            document.querySelectorAll('.option-button').forEach(btn => {
                btn.classList.remove('border-purple-500', 'bg-purple-50', 'text-purple-700');
                btn.classList.add('border-stone-200', 'text-stone-700');
            });

            // Aplicar seleção atual
            optionButton.classList.add('border-purple-500', 'bg-purple-50', 'text-purple-700');
            optionButton.classList.remove('border-stone-200', 'text-stone-700');

            state.selectedAnswer = option;
            nextQuestionBtn.disabled = false;
        });

        optionsContainer.appendChild(optionButton);
    });

    // Atualizar texto do botão
    nextQuestionBtn.textContent = state.currentQuestion + 1 === state.questions.length
        ? 'Ver Resultado'
        : 'Próxima Pergunta';

    nextQuestionBtn.disabled = state.selectedAnswer === null;

    // Aplicar animação
    const slideInElement = document.querySelector('#quiz-state .slide-in');
    slideInElement.classList.remove('active');
    setTimeout(() => {
        slideInElement.classList.add('active');
    }, 10);
}

function renderResults() {
    const scorePercentage = Math.round((state.score / state.questions.length) * 100);

    finalScore.textContent = `${state.score}/${state.questions.length}`;
    percentage.textContent = `${scorePercentage}% de acertos`;
    scoreMessage.textContent = getScoreMessage(scorePercentage);
    correctAnswers.textContent = state.score;
    incorrectAnswers.textContent = state.questions.length - state.score;

    // Atualizar cor do troféu com base na pontuação
    if (scorePercentage >= 80) {
        trophyIcon.className = 'w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center';
        finalScore.className = 'text-6xl font-bold mb-2 text-green-600';
    } else if (scorePercentage >= 60) {
        trophyIcon.className = 'w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center';
        finalScore.className = 'text-6xl font-bold mb-2 text-amber-600';
    } else {
        trophyIcon.className = 'w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center';
        finalScore.className = 'text-6xl font-bold mb-2 text-red-600';
    }

    // Aplicar animação
    const scaleInElement = document.querySelector('#result-state .scale-in');
    scaleInElement.classList.remove('active');
    setTimeout(() => {
        scaleInElement.classList.add('active');
    }, 10);
}

function getScoreMessage(percentage) {
    if (percentage >= 80) return "Excelente! Você é um verdadeiro especialista em dinossauros! 🦕";
    if (percentage >= 60) return "Muito bom! Você tem um bom conhecimento sobre dinossauros! 👏";
    if (percentage >= 40) return "Não está mal! Continue estudando sobre dinossauros! 📚";
    return "Continue explorando o mundo dos dinossauros para aprender mais! 🔍";
}

function startQuiz() {
    state.quizStarted = true;
    state.currentQuestion = 0;
    state.score = 0;
    state.selectedAnswer = null;
    state.showResult = false;

    showQuizScreen();
}

function handleNextQuestion() {
    if (state.selectedAnswer === state.questions[state.currentQuestion].correctAnswer) {
        state.score++;
    }

    if (state.currentQuestion + 1 < state.questions.length) {
        state.currentQuestion++;
        state.selectedAnswer = null;
        renderQuestion();
    } else {
        state.showResult = true;
        showResultScreen();
    }
}

function resetQuiz() {
    state.quizStarted = false;
    state.currentQuestion = 0;
    state.score = 0;
    state.selectedAnswer = null;
    state.showResult = false;

    showStartScreen();
}

// Event Listeners
startQuizBtn.addEventListener('click', startQuiz);
nextQuestionBtn.addEventListener('click', handleNextQuestion);
restartQuizBtn.addEventListener('click', resetQuiz);

// Inicializar a aplicação
window.addEventListener('DOMContentLoaded', () => {
    // Aplicar animação de entrada na tela inicial
    const fadeInElement = document.querySelector('.fade-in');
    setTimeout(() => {
        fadeInElement.classList.add('active');
    }, 100);

    loadDinosaurs();
});

// Navbar Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        navbarToggle.classList.toggle('active');
    });
    
    // Fechar o menu ao clicar em um link (em dispositivos móveis)
    const navbarLinks = document.querySelectorAll('.navbar-link');
    navbarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        });
    });
    
    // Adicionar efeito de scroll na navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '0';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});
