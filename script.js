let questions = [
    {
        question: "",
        options: ["Distribuição de combustíveis", "Logística Multimodal", "Exploração e Produção de Petróleo"],
        answer: "Logística Multimodal",
        image: "images/pergunta1.jpg"
    },
    {
        question: "",
        options: ["Inovação, Comprometimento, Cuidado com as Pessoas, Sustentabilidade e Integridade", "Inovação, Segurança, Direitos Humanos, Integridade e Cuidado com as Pessoas", "Cuidado com as pessoas, Saúde, Integridade, Comprometimento e Sustentabilidade"],
        answer: "Inovação, Segurança, Direitos Humanos, Integridade e Cuidado com as Pessoas",
        image: "images/pergunta2.jpg"
    },
    {
        question: "",
        options: ["Profeta", "Perfil de compras", "Starlink"],
        answer: "Starlink",
        image: "images/pergunta3.jpg"
    },
    {
        question: "",
        options: ["Aproximar as pessoas", "Propiciar a interação nas atividades corporativas", "Todas as opções estão corretas"],
        answer: "Todas as opções estão corretas",
        image: "images/pergunta4.jpg"
    },
    {
        question: "",
        options: ["200", "1000", "100"],
        answer: "1000",
        image: "images/pergunta5.jpg"
    },
    {
        question: "",
        options: ["8,5 mil", "7,4 mil", "5,3 mil"],
        answer: "8,5 mil",
        image: "images/pergunta6.jpg"
    },
    {
        question: "",
        options: ["Rio Grande do Sul e Espírito Santo", "São Paulo e Pernambuco", "Rio Grande do Norte e Rio Grande do Sul"],
        answer: "Rio Grande do Norte e Rio Grande do Sul",
        image: "images/pergunta7.jpg"
    },
    // Adicione mais perguntas aqui com a propriedade 'image'
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let timer;

function startQuiz() {
    shuffleQuestions();
    currentQuestionIndex = 0;
    correctAnswers = 0;
    document.getElementById('start-screen').style.display = 'none';
    showNextInfoScreen(1);
}

function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
}

function showNextInfoScreen(screenNumber) {
    clearTimeout(timer);
    const screens = document.querySelectorAll('.info-screen');
    screens.forEach(screen => screen.style.display = 'none');
    
    const currentScreen = document.getElementById(`info-screen-${screenNumber}`);
    if (currentScreen) {
        currentScreen.style.display = 'flex';
        timer = setTimeout(() => {
            if (screenNumber < screens.length) {
                showNextInfoScreen(screenNumber + 1);
            } else {
                showQuestionScreen();
            }
        }, 10000); // 10 segundos
    }
}

function showQuestionScreen() {
    document.querySelectorAll('.info-screen').forEach(screen => screen.style.display = 'none');
    document.getElementById('question-screen').style.display = 'flex';
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex < 3) { // Mostrar 3 perguntas por vez
        let question = questions[currentQuestionIndex];
        document.getElementById('question-screen').style.backgroundImage = `url(${question.image})`;
        document.getElementById('question-content').innerText = question.question;
        let optionsDiv = document.getElementById('options');
        optionsDiv.innerHTML = '';

        question.options.forEach(option => {
            let button = document.createElement('button');
            button.innerText = option;
            button.onclick = () => checkAnswer(option);
            optionsDiv.appendChild(button);
        });

        timer = setTimeout(nextQuestion, 10000); // 10 segundos
    } else {
        showResultScreen();
    }
}

function checkAnswer(selectedOption) {
    clearTimeout(timer);
    let question = questions[currentQuestionIndex];
    if (selectedOption === question.answer) {
        correctAnswers++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < 3) {
        displayQuestion();
    } else {
        showResultScreen();
    }
}

function showResultScreen() {
    document.getElementById('question-screen').style.display = 'none';
    const positiveResultScreen = document.getElementById('positive-result-screen');
    const negativeResultScreen = document.getElementById('negative-result-screen');
    
    if (correctAnswers >= 2) {
        positiveResultScreen.style.display = 'flex';
        negativeResultScreen.style.display = 'none';
    } else {
        positiveResultScreen.style.display = 'none';
        negativeResultScreen.style.display = 'flex';
    }
}

function returnToStart() {
    clearTimeout(timer);
    document.querySelectorAll('.screen').forEach(screen => screen.style.display = 'none');
    document.getElementById('start-screen').style.display = 'flex';
}
