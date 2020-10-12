//questions
var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question:
      "Who was the father of Javascript?",
    choices: ["Bill Gates", "Brendan Eich", "Kevin Ferguson", "Steve Jobs"],
    answer: "Brendan Eich",
  },
  {
    question:
      "What is a block of code designed to perform a particular task called?",
    choices: ["function", "arrays", "numbers", "characters"],
    answer: "function",
  },
  {
    question:
      "______ are used to store multiple values in a single variable.",
    choices: ["function", "alerts", "prompts", "arrays"],
    answer: "arrays",
  },
  {
    question:
      "What is the worlds most popular computer programming language?",
    choices: ["javascript", "python", "c++", "html"],
    answer: "javascript",
  },
  {
    question:
      "In what year was the first computer invented?",
    choices: ["last year", "1999", "1985", "1956"],
    answer: "1985",
  },
  {
    question:
      "What language is used to style HTML documents?",
    choices: ["python", "CSS", "index", "Chinese"],
    answer: "CSS",
  },
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");

var questionIndex = 0;
var correctCount = 0;
// add variables to hold the time and intervaliD for the timer
var time = 30;
var intervalId;

function endQuiz() {
  // clear Interval
  // update DOM to indicate game is over
  clearInterval(intervalId);
  var body = document.body;
  body.innerHTML = "Game over, You scored " + correctCount;

  // wait 2 seconds and call showHighScore;
  setTimeout(showHighScore, 2000);
}

function showHighScore() {
  // write code here
  var name = prompt("What is your name?");

  var user = {
    name: name,
    score: correctCount
  }

  var high_score = localStorage.getItem("scores");

  if (!high_score) {
    high_score = []
  } else {
    high_score = JSON.parse(high_score)
  }

  high_score.push(user);

  high_score.sort(function (a, b) {
    return b.score - a.score
  })

  var contentUl = document.createElement("ul");

  for (var i = 0; i < high_score.length; i++) {
    var contentLi = document.createElement("li");
    contentLi.textContent = "Name: " + high_score[i].name + " Score: " + high_score[i].score;
    contentUl.append(contentLi);
    document.body.append(contentUl);
  }


}

function updateTime() {
  //decrement time
  //if time is = end quiz
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {
  //add a timer that will call updateTime every second
  if (time == 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);
  questionEl.textContent = questions[questionIndex].question;
  //write code to generate questions

  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
}

function nextQuestion() {
  //render next question
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {
  // check if answer is correct
  // Notify the user if their response is correct/wrong.  
  // Update the correctCount if necessary
  //wait 2 seconds and call next question
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
      time = time - 2;
      timerEl.textContent = time;
    }
  }
  setTimeout(nextQuestion, 2000);
}

//add event listener to option-lest.  the event handler is checkAnswer
renderQuestion();
optionListEl.addEventListener("click", checkAnswer);
