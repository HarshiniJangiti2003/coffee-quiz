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
    {
        question: 'Where was coffee first discovered?',
        answers: [
            { text: 'A) Ethiopia', correct: true },
            { text: 'B) Brazil', correct: false },
            { text: 'C) Italy', correct: false },
            { text: 'D) Florida', correct: false }
        ]
    },
    {
        question: 'What\'s the best place in the world for a coffee experience?',
        answers: [
            { text: 'A) Colombia', correct: false },
            { text: 'B) Vienna', correct: true },
            { text: 'C) Seattle', correct: false },
            { text: 'D) My Couch', correct: false }
        ]
    },
    {
        question: 'What is the primary flavor difference between Arabica and Robusta beans?',
        answers: [
            { text: 'A) Arabica is more bitter, Robusta is sweeter.', correct: false },
            { text: 'B) Arabica is sweeter and smoother, Robusta is stronger and more bitter.', correct: true },
            { text: 'C) Arabica is fruitier, Robusta is nuttier.', correct: false },
            { text: 'D) There\'s no noticeable difference.', correct: false }
        ]
    },
    {
        question: 'What country is the largest producer of coffee?',
        answers: [
            { text: 'A) Colombia', correct: false },
            { text: 'B) Brazil', correct: true },
            { text: 'C) Vietnam', correct: false },
            { text: 'D) Indonesia', correct: false }
        ]
    },
    {
        question: 'How many cups of Sleepy Owl keep you buzzing daily?',
        answers: [
            { text: 'A) 3+ (I\'m powered by coffee!)', correct: true },
            { text: 'B) 2 (A perfect balance.)', correct: true },
            { text: 'C) 1 (Just enough to wake up.)', correct: true },
            { text: 'D) None yet (But I\'m curious!)', correct: true }
        ]
    }
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', startGame);

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

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    
    // For the last question, all answers are correct
    if (currentQuestionIndex === questions.length - 1) {
        score += 5; // Give 5 points for answering the last question (any answer)
    } else if (correct) {
        score += 5; // Give 5 points for correct answers
    }
    
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showResults();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

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
    
    // In a real implementation, you would use actual image files
    badgeDisplay.innerHTML = `
        <h3>You are a Coffee ${badge.charAt(0).toUpperCase() + badge.slice(1)}!</h3>
        <div class="badge-image" style="font-size: 100px; margin: 20px 0;">☕</div>
    `;
    
    scoreDisplay.textContent = `You scored ${score} points!`;
    discountOffer.textContent = discount;
}
