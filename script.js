/* ----- Pages & Container to display/hide/set attribute ----- */
const getStarted = document.querySelector(".get-started");
const mainQuiz = document.querySelector(".main-quiz");
const questionAnswers = document.querySelector(".qa-container");
const finalScore = document.querySelector(".final-score");
const timerContainer = document.querySelector(".timer");
const progressBar = document.querySelector(".progress-bar")
/* ----- Buttons ----- */
const startButton = document.querySelector("#start-btn");
const optionButtons = document.querySelectorAll(".option")
const checkButton = document.querySelector(".check-answer");
const nextButton = document.querySelector(".next-question");
const finishButton = document.querySelector(".finish-quiz");
const restartButton = document.querySelector("#restart-btn");
const quitButton = document.querySelectorAll(".quit-quiz");
/* ----- Variables to manipulate innerText ----- */
let myScore = document.querySelector(".my-score");
let totalScore = document.querySelector(".total-score");
let scoreText = document.querySelector(".display-score h3")
let currentQuestion = document.querySelector(".current-question")
let totalQuestions = document.querySelector(".total-questions")
let timer = document.querySelector(".timer span");
/* ----- Initially declaration ----- */
let displayQuiz;
let timerInterval;
let timeOut = document.createElement("h2");
let calculateProgress;
let selectedButton;
let selectedButtonIndex;
let correctAnswerButton;
let correctButtonIndex;
let scorePercent;
/* ----- Quiz questions ----- */
const quizes = [
    {
      question: "How do we separate each key-value pair in an object literal?",
      options: ["With a comma (,)", "With a semicolon (;)", "With a colon (:)", "With a dot (.)"],
      answers: 0, // array index 0 - so comma is the correct answer here.
    },
    {
      question: "How do we access object keys that have numbers, spaces or special characters in them?",
      options: ["With a comma (,)", "With a dot (.)", "With a bracket ([])", "With a quote('')"],
      answers: 2,
    },
    {
      question: "Are objects mutable?",
      options: ["Yes", "No", "Maybe", "What?"],
      answers: 0,
    },
    {
      question: "What does the underscore (_) before the name of a property mean in objects?",
      options: ["Property should be altered", "I like it there", "Property should not be altered", "Property has been altered"],
      answers: 2,
    },
    {
      question: "When working with objects, you can include commas between methods. Is this true?",
      options: ["Yes, it's true", "No you cannot include commas between methods", "Yes, always separate with commas inside an object", "Maybe"],
      answers: 1,
    },
];


/* ----- Functions to manipulate styles -----*/
const optionClicked = (button) => {
  selectedButton = button
  removeBackgroundStyle();
  button.style.backgroundColor = "rgba(240, 238, 138, 0.29)";
  enableButton(checkButton)
};

const disableButton = (button) => {
  button.setAttribute("disabled", "");
  button.style.cursor = "auto";
};

const enableButton = (button) => {
  button.removeAttribute("disabled", "");
  button.style.cursor = "pointer";
};

const removeBackgroundStyle = () => {
  // parentOfOptions = button.parentElement;
  // allOptionButtons = parentOfOptions.querySelectorAll("button");
  optionButtons.forEach(eachButton => {
    eachButton.style.backgroundColor = "";
  });
}; 

/* ----- Functions to set Timer -----*/
const insertTimerText = () => {
  timer.innerText = 0;
  timeOut.textContent = 'Time is out';
  questionAnswers.insertAdjacentElement('beforebegin', timeOut);
  timeOut.style.textAlign = "center";
  timeOut.style.color = "rgba(255, 32, 32, 0.8)";
};

const timerCountdown= () => {
  timerInterval = setInterval(() => {
    if(timer.textContent > 0) {
      timer.innerText--;
    } else if (timer.textContent <= 0) {
      clearInterval(timerInterval);
      insertTimerText();
      console.log(selectedButton)
      if(selectedButton == undefined) {
        optionButtons.forEach(eachButton => {
          disableButton(eachButton)
          displayAnswer()
        });
        if(currentQuestion.textContent === totalQuestions.textContent) {
          checkButton.style.display="none";
          finishButton.style.display="inline";
        } else {
          checkButton.style.display="none";
          nextButton.style.display="inline";
        };
      };
  }}, 1000)   
};

/* ----- Function to update Progress Bar -----*/
const updateProgressBar = () => {
  calculateProgress = ((currentQuestion.textContent - 1) / totalQuestions.textContent)*100;
  progressBar.setAttribute("value", calculateProgress);
};

/* ----- Logical process functions -----*/
const startQuiz = () => {
  getStarted.style.display="none";
  timerContainer.style.display = "inline";
  disableButton(checkButton);
  totalQuestions.innerText = quizes.length;
  mainQuiz.style.display="inline";
  timerCountdown();
  question.innerText = quizes[0].question;
  for(i = 0; i < optionButtons.length; i++) {
      optionButtons.item(i).innerText = quizes[0].options[i]
  }
  currentQuestion.innerText++;
};

const checkAnswer = () => {
  if(currentQuestion.textContent >= quizes.length) {
    nextButton.style.display="none";
    checkButton.style.display="none";
    finishButton.style.display="inline";
  } else {
    checkButton.style.display="none";
    nextButton.style.display="inline";
  };
  selectedButton.style.backgroundColor = "rgba(255, 0, 26, 0.3)"
  displayAnswer();
  clearInterval(timerInterval);
  addScore();
  // If after clicking 'next' will be last question of quiz, execute this:
  optionButtons.forEach(eachButton => {
    disableButton(eachButton)
  });
  timeOut.textContent = '';
};

const displayAnswer = () => {
  correctAnswerButton = document.querySelector(`[data-index="${quizes[currentQuestion.textContent-1].answers}"]`)
  correctButtonIndex = quizes[currentQuestion.textContent-1].answers
  correctAnswerButton.style.backgroundColor = "rgba(40, 247, 40, 0.3)";
}

const nextQuestion = () => {
  totalQuestions.innerText = quizes.length;
  mainQuiz.style.display="inline";
  timeOut.textContent = '';
  timer.innerText = 15;
  nextButton.style.display="none";
  checkButton.style.display="inline";
  currentQuestion.innerText++;
  disableButton(checkButton);
  updateProgressBar();
  timerCountdown();
  question.innerText = quizes[currentQuestion.textContent - 1].question;
  for(i = 0; i < optionButtons.length; i++) {
    optionButtons.item(i).innerText = quizes[currentQuestion.textContent - 1].options[i]
  }
};

const addScore = () => {
  selectedButtonIndex = selectedButton.getAttribute("data-index")
  if(selectedButtonIndex == correctButtonIndex) {
    myScore.innerText++;
    scorePercent = (myScore.textContent / totalQuestions.textContent)*100
  } else {
    myScore;
  };
  if(scorePercent < 50) {
    scoreText.innerText = "Better luck next time!"
  } else {
    scoreText.innerText = "Well done, you nailed it!"
  }
  totalScore.innerText = totalQuestions.textContent;
};

const restartQuiz = () => {
  myScore.innerText = 0;
  currentQuestion.innerText = 0;
  timer.innerText = 15;
  optionButtons.forEach(eachButton => {
    enableButton(eachButton)
    removeBackgroundStyle(eachButton)
  });
  checkButton.style.display="inline";
  finishButton.style.display="none";
  enableButton(checkButton);
  finalScore.style.display = 'none';
  startQuiz();
  updateProgressBar();
};

/* ----- Buttons event listeners -----*/
// When get started button is clicked, execute this:
startButton.addEventListener("click", () => {startQuiz()});

// When check answer button is clicked, execute this:
checkButton.addEventListener("click", () => {checkAnswer();});

// When next question button is clicked, execute this:
nextButton.addEventListener("click", () => {
  nextQuestion();
  removeBackgroundStyle()
  optionButtons.forEach(eachButton => {
    enableButton(eachButton)
  })
  // Remove 'Time Out' warning text
});

// When finish quiz button is clicked, execute this:
finishButton.addEventListener("click", () => {
  timeOut.textContent = '';
  finalScore.style.display = 'flex';
  mainQuiz.style.display="none";
  clearInterval(timerInterval);
});

// When restart button is clicked, execute this:
restartButton.addEventListener("click", () => {restartQuiz()});

// When quit quiz button is clicked, execute this:
quitButton.forEach(button => {
  button.addEventListener("click", () => {
    getStarted.style.display="flex";
    mainQuiz.style.display="none";
    finalScore.style.display="none";
    location.reload();
  });
});