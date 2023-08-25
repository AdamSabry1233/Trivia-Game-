const questionDiv = document.querySelector('#question');
const answerDiv = document.querySelector('#answer');
const feedbackDiv = document.querySelector('#feedback');
let currentQuestion = null; 
let score = 0;
let correctAnswered = false; 

function getTriviaQuestion() {
return new Promise((resolve, reject) => {
setTimeout(() => {
    const index = Math.floor(Math.random() * questions.length);
    const question = questions[index];
    if (index > questions.length) {
        reject('An error occurred while fetching the trivia question.');
    } else {
        resolve(question);
    }
}, 1000);   
});
}

function displayQuestion(triviaQuestion) {
questionDiv.textContent = triviaQuestion.question;
answerDiv.value = '';
feedbackDiv.textContent = '';
correctAnswered = false;
}
function updateScore(correct) {
    if (correct && !correctAnswered) {
        score++;
        correctAnswered = true;
    }
    document.querySelector('#score').textContent = `Score: ${score}`;
}
document.querySelector('#questionBtn').addEventListener('click', () => {
    getTriviaQuestion().then((question)=> {
        currentQuestion = question;
        displayQuestion(question);
        questions = questions.filter(q => q !== currentQuestion);
    })
    .catch((error) => {
        console.error(error);
    })
})
document.querySelector('#answerBtn').addEventListener('click', () => {
    let feedbackMessage;
    const userAnswer = answerDiv.value.trim().toLowerCase();
    if(currentQuestion && userAnswer === currentQuestion.answer.toLowerCase()){
        feedbackDiv.style.color = "green";
        feedbackMessage = `Great job! Your answer is correct.`;
        updateScore(true);
    } else {
        feedbackDiv.style.color = "red";
        feedbackMessage = `Sorry that is incorrect, the correct answer is: "${currentQuestion.answer}". Try another question!`;
        updateScore(false);
    }
    feedbackDiv.textContent = feedbackMessage;
})
