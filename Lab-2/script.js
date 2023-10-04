const quizData = [{
        question: "Which is the biggest continent in the world?", //question1
        answers: [{
                text: "North America",
                correct: false,
            },
            {
                text: "Asia",
                correct: true,
            },
            {
                text: "Africa",
                correct: false,
            },
            {
                text: "Australia",
                correct: false,
            },
        ],
    },
    {
        question: "Which is the longest river in the world?", //question2
        answers: [{
                text: "Great Ganges",
                correct: false,
            },
            {
                text: "Nile",
                correct: true,
            },
            {
                text: "Amazon",
                correct: false,
            },
            {
                text: "Niger",
                correct: false,
            },
        ],
    },
    {
        question: "Which is the largest ocean in the world?", //question3
        answers: [{
                text: "Indian Ocean",
                correct: false,
            },
            {
                text: "Pacific Ocean",
                correct: true,
            },
            {
                text: "Arctic Ocean",
                correct: false,
            },
            {
                text: "Atlantic Ocean",
                correct: false,
            },
        ],
    },

    {
        question: "Which is India’s first super computer?", //question4
        answers: [{
                text: "Param8000",
                correct: true,
            },
            {
                text: "param80000",
                correct: false,
            },
            {
                text: "param800",
                correct: false,
            },
            {
                text: "param8",
                correct: false,
            },
        ],
    },

    {
        question: "Which bank is called bankers Bank of India?", //question5
        answers: [{
                text: "Reserve Bank of India",
                correct: true,
            },
            {
                text: "Punjab National Bank",
                correct: false,
            },
            {
                text: "State Bank of India",
                correct: false,
            },
            {
                text: "ICICI Bank",
                correct: false,
            },
        ],
    },

    {
        question: "Which is the largest animal in the world?", //question6
        answers: [{
                text: "Shark",
                correct: false,
            },
            {
                text: "Blue whale",
                correct: true,
            },
            {
                text: "Elephant",
                correct: false,
            },
            {
                text: "Giraffe",
                correct: false,
            },
        ],
    },

    {
        question: "Which is largest animal on land?", //question7
        answers: [{
                text: "Tiger",
                correct: false,
            },
            {
                text: "White Elephant",
                correct: false,
            },
            {
                text: "African Elephant",
                correct: true,
            },
            {
                text: "Crocodile",
                correct: false,
            },
        ],
    },

    {
        question: "Which is largest island in the world?", //question8
        answers: [{
                text: "New Guinea",
                correct: false,
            },
            {
                text: "Andaman Nicobar",
                correct: false,
            },
            {
                text: "Greenland",
                correct: true,
            },
            {
                text: "Hawaii",
                correct: false,
            },
        ],
    },

    {
        question: "Which is the largest flower in the world?", //question9
        answers: [{
                text: "Rafflesia",
                correct: true,
            },
            {
                text: "Jasmine",
                correct: false,
            },
            {
                text: "Balloon Flower",
                correct: false,
            },
            {
                text: "Camellia",
                correct: false,
            },
        ],
    },

    {
        question: "Tsunami is a word in which language?", //question10
        answers: [{
                text: "Hindi",
                correct: false,
            },
            {
                text: "Urdu",
                correct: false,
            },
            {
                text: "Japanese",
                correct: true,
            },
            {
                text: "French",
                correct: false,
            },
        ],
    },
];

//Accessing and storing html elements into JS variables.
const questionElement = document.getElementById("question"); //#question.
const answerButtons = document.getElementById("answer-buttons"); //#answer-buttons
const nextButton = document.getElementById("next-btn"); //#next-btn
let quesDetails = document.getElementById("quesDetails"); //#quesDetails

let currentQuestionIndex = 0; // initializing and declaring question index at first
let score = 0; // initializing and declaring scores at first

function startQuiz() {
    //starting quiz app
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function resetState() {
    //Resetting state of the quiz app
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showQuestion() {
    //displaying question from quiz data and options display.
    resetState();

    let currentQuestion = quizData[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question; //displaying question

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text; //displaying options against each question.
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        if (questionNo === quizData.length) {
            nextButton.innerText = "SUBMIT"; //changing next btn to submit btn at the end of the question.
        }
        button.addEventListener("click", selectAnswer); //click event on options selected
    });
    quesDetails.innerText = `| Question ${questionNo} of ${quizData.length} |`;
    quesDetails.style.display = "block";
}

function selectAnswer(e) {
    //actions taken on options selected
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct"); // for changing background this class is needed as per user choice selection.
        }
        button.disabled = true; //after selecting answer, button gets disabled
    });
    nextButton.style.display = "block";
    quesDetails.style.display = "none";
}
nextButton.addEventListener("click", () =>
    //next button click event
    {
        if (currentQuestionIndex < quizData.length) {
            handleNextButton();
        }
    }
);

function handleNextButton() {
    //handling next button features
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    //score,score percentage calculation and displaying score.
    resetState();
    let scorePercent = `${(score / quizData.length) * 100}`; //score percentage calculation
    questionElement.innerText = `You scored ${score} out of ${quizData.length}!\n Your Score Percentage is : ${scorePercent}% .`;

    //styling for displaying score
    questionElement.style.height = "350px";
    questionElement.style.width = "400px";
    questionElement.style.paddingTop = "20px";

    nextButton.style.display = "none";
}

startQuiz();