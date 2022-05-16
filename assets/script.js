// Timer

// Quiz

const quizContainer = document.getElementById('quiz');

const myQuestions = [
    {
      question: "Conmmonly used data type do not include?",
      answers: {
        a: "Strings",
        b: "Booleans",
        c: "Numbers",
        d: "Assets"
      },
      correctAnswer: "d"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm"
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    }
  ];

  function buildQuiz(){
    // variable to store the HTML output
    const output = [];
  
    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
        // variable to store the list of possible answers
        const answers = [];
  
        // and for each available answer...
        for(letter in currentQuestion.answers){
  
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );
  
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }
  myQuestions.forEach( (currentQuestion, questionNumber) => {
    // the code we want to run for each question goes here
  });

  const answers = [];

  // and for each available answer...
  for(letter in currentQuestion.answers){
  
    // ...add an html radio button
    answers.push(
      `<label>
        <input type="radio" name="question${questionNumber}" value="${letter}">
        ${letter} :
        ${currentQuestion.answers[letter]}
      </label>`
    );
  }

  
  // add this question and its answers to the output
  output.push(
    `<div class="question"> ${currentQuestion.question} </div>
    <div class="answers"> ${answers.join('')} </div>`
  );

  quizContainer.innerHTML = output.join('');



// Final page



// Highscores list page
var scoreInput=100;

var formEl = document.querySelector("#record-form");
var scoreRecordEl = document.querySelector("#score-list");


var scoreFormHandler = function(event) {
  event.preventDefault();
  var scoreNameInput = document.querySelector("input[name='score-name'").value;

  // check if inputs are empty (validate)
  if (scoreNameInput === "" ) {
    alert("You need to fill out your initials!");
    return false;
  }
  
  formEl.reset();

  // reset form fields for next task to be entered
  document.querySelector("input[name='score-name']").value = "";
  
  var scoreDataObj = {
    name: scoreNameInput,
    score: scoreInput,
  };

  createScoreEl(scoreDataObj);
};

var createScoreEl = function(scoreDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "score-item";

  // create div to hold task info and add to list item
  var scoreInfoEl = document.createElement("div");
  scoreInfoEl.className = "score-info";
  scoreInfoEl.innerHTML = "<h3>" + scoreDataObj.name + "</h3><span>" + scoreDataObj.score + "</span>";
  listItemEl.appendChild(scoreInfoEl);

  console.dir(listItemEl);

  // add list item to list
  scoreRecordEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", scoreFormHandler);

