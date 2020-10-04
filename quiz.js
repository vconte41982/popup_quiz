const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const ScoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: "<script>",
    choice2: "js",
    choice3: "scripting",
    choice4: "javascript",
    answer: 1,
  },
  {
    question: "Where is the correct place to insert JavaScript?",
    choice1: "The body section",
    choice2: "The head section",
    choice3: "The <p> section",
    choice4: "Both the head section and the body section",
    answer: 4,
  },
  {
    question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    choice1: 'script name="xxx.js"',
    choice2: 'script src="xxx.js"',
    choice3: 'script href="xxx.js"',
    choice4: "Both the head section and the body section",
    answer: 2,
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    choice1: 'alert("Hello World");',
    choice2: 'msg("Hello World");',
    choice3: 'msgBox("Hello World");>',
    choice4: 'alertBox("Hello World");',
    answer: 1,
  },
  {
    question: "How to create a function in JavaScript?",
    choice1: "function = myFunction()",
    choice2: "function myFunction()",
    choice3: "function:myfunction",
    choice4: "function()myFunction",
    answer: 2,
  },
  {
    question: "How does a WHILE loop start?",
    choice1: "while (i,<= 10; i++)",
    choice2: "while i = 1 to 10",
    choice3: "while (i <= 10)",
    choice4: "while (i <= 1)0",
    answer: 3,
  },
  {
    question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
    choice1: "if i=! 5 then",
    choice2: "if(i<> 5)",
    choice3: "if (i!=5)",
    choice4: "if<>5",
    answer: 3,
  },
];
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 7;

startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  endQuiz();
};
endQuiz = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);

    return window.location.assign('end.html');
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);
  acceptingAnswers = true;
};
choices.forEach((choice) => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      endQuiz();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  ScoreText.innerText = score;
};

startQuiz();

