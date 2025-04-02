const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultsContainer = document.getElementById('results-container');
const badgeDisplay = document.getElementById('badge-display');
const scoreDisplay = document.getElementById('score-display');
const discountOffer = document.getElementById('discount-offer');

let shuffledQuestions, currentQuestionIndex;
let score = 0;

const questions = [
    // ... (keep your existing questions array exactly as is) ...
];

// ... (keep your existing event listeners) ...

function startGame() {
    score = 0;
    startButton.classList.add('hide');
    resultsContainer.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// ===== NEW ANSWER HANDLING =====
function selectAnswer(e) {
    const selectedButton = e.target;
    
    // For the last question (all answers correct)
    if (currentQuestionIndex === questions.length - 1) {
        score += 5;
    } 
    // For other questions
    else if (selectedButton.dataset.correct) {
        score += 5;
    }

    // Immediately go to next question without feedback
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        showResults();
    }
}

// ===== UPDATED RESULTS DISPLAY =====
function showResults() {
    questionContainerElement.classList.add('hide');
    resultsContainer.classList.remove('hide');
    
    let badge, discount;
    
    if (score >= 20) {
        badge = 'crusader';
        discount = 'Get 5% off on your next order—Claim your reward now!';
    } else if (score >= 15) {
        badge = 'enthusiast';
        discount = 'Get 10% off on your next order—Claim your reward now!';
    } else if (score >= 10) {
        badge = 'lover';
        discount = 'Get 15% off on your next order—Claim your reward now!';
    } else {
        badge = 'noob';
        discount = 'Get 20% off on your next order—Claim your reward now!';
    }
    
    badgeDisplay.innerHTML = `
        <h3>You are a Coffee ${badge.charAt(0).toUpperCase() + badge.slice(1)}!</h3>
        <div class="badge-image">
            <img src="images/${badge}.png" alt="${badge} badge">
        </div>
    `;
    
    scoreDisplay.textContent = `You scored ${score} points!`;
    discountOffer.textContent = discount;
}
// Event listeners must be at the END of the file
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});
restartButton.addEventListener('click', startGame);
