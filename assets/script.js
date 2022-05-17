//selecting all required elements

const info_box = document.querySelector(".info_box");
const start_btn = document.querySelector(".buttons .start");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const record_box = document.querySelector(".record_box");
const submit_btn = document.querySelector(".submit");
const restart_quiz = record_box.querySelector(".buttons .restart");
const clear_highscore = record_box.querySelector(".buttons .clear");
const formEl = document.querySelector("#record-form");
const scoreRecordEl = document.querySelector("#score-list");
const recordtitle = document.querySelector(".record_title");

info_box.classList.add("activeInfo");

let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let widthValue = 0;
let timeleft= 30;

// if Start Quiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    startTimer(timeleft); //calling startTimer function
    timeText.textContent = "Time Left"; //change the timeText to Time Left
}

const next_btn = document.querySelector("footer .next_btn");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//if user clicked on option
function optionSelected(answer){
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("selected"); //adding color to selected option
    }
    else{
        answer.classList.add("selected"); //adding color to selected option
        clearInterval(counter); 
        startTimer(timeleft-10);//Timeleft substract 10 s wiht wrong answer
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag = '<span> You got <p>'+ userScore*10 +'</p> out of <p>'+ questions.length*10+'</p>.</span>';
    scoreText.innerHTML = scoreTag;
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){

        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        timeleft = time;
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            showResult();
        }
        return timeleft;
    }
}

// if Submit button clicked
submit_btn.onclick = ()=>{
    result_box.classList.remove("activeResult"); //hide result box
    record_box.classList.add("activeRecord"); //show record box
    scoreFormHandler();
}

// Highscore record list code
var scoreFormHandler = function() {
  var scoreNameInput = document.querySelector("input[name='score-name'").value;

  // check if inputs are empty (validate)
  if (scoreNameInput === "" ) {
    alert("You need to fill out your initials!");
    record_box.classList.remove("activeRecord"); //remove record box
    return showResult(); 
  }
  
  formEl.reset();

  // reset form fields for next task to be entered
  document.querySelector("input[name='score-name']").value = "";
  
  var scoreDataObj = {
    name: scoreNameInput,
    score: userScore*10,
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
  scoreInfoEl.innerHTML = "<span>"+scoreDataObj.name+"        "+scoreDataObj.score+"</span>";
  listItemEl.appendChild(scoreInfoEl);

  console.dir(listItemEl);

  // add list item to list
  scoreRecordEl.appendChild(listItemEl);
};

// if Restart Quiz button clicked
restart_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}
// if Clear Record button clicked
clear_highscore.onclick = ()=>{
   scoreRecordEl.innerHTML = ""; //clear the record
}