const questions = [
    {
        question: 'Which is the largest animal in the world',
        answers: [
            { text: 'Shark', correct: false },
            { text: 'Blue-whale', correct: true },
            { text: 'Elephant', correct: false },
            { text: 'Giraffe', correct: false },
        ],
    },
    {
        question: 'What is 2 + 2 / 2 ',
        answers: [
            { text: '3', correct: 'true' },
            { text: '4', correct: 'false' },
            { text: '1', correct: 'false' },
            { text: '2', correct: 'false' },
        ],
    },
    {
        question: 'When was Blockchain introduced',
        answers: [
            { text: '1991', correct: 'true' },
            { text: '2008', correct: 'false' },
            { text: '2005', correct: 'false' },
            { text: '2002', correct: 'false' },
        ],
    },
    {
        question: 'Which full name of mac',
        answers: [
            { text: 'Macintosh', correct: 'true' },
            { text: 'Macserver', correct: 'false' },
            { text: 'MacOS', correct: 'false' },
            { text: 'MacApple', correct: 'false' },
        ],
    },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
    console.log('StartQuiz');
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + '.' + currentQuestion.question;
    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement('Button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
    console.log('ShowQuestion');
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    console.log('Reset');
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectBtn.classList.add('correct');
        score++;
    } else {
        selectBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
    console.log('selectAnswer');
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}
function handleNextButton() {
    resetState();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
    console.log('handleNextButton');
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
