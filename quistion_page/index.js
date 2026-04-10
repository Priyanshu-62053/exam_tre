// =======================
// Select All Elements
// =======================

// question number (Question 1, Question 2 ...)
let quesNum = document.querySelector("#quesNum");

// question text
let question_para = document.querySelector(".question_para");

// all options (A,B,C,D)
let option = document.querySelectorAll(".option");

// buttons
let prev_btn = document.querySelector("#prev");
let next_btn = document.querySelector("#next");


// question counter
let quesCount = document.querySelector("#quesCount");


// =======================
// Variables
// =======================

// current question index
let current_question = 0;

// user score
let user_score = 0;

// store user answers
let user_ans = [];

// question counter display
let quesCounter = 1;



// =======================
// Load Question Function
// =======================

function loadcontent() {

  // show question number
  if (quesCounter <= questions.length && quesCounter > 0) {
    quesCount.textContent = "Question " + quesCounter;
  }

  // show question
  question_para.textContent =
    questions[current_question].question;


  // show options
  for (let i = 0; i < option.length; i++) {
    option[i].textContent =
      questions[current_question].options[i];

    // remove previous selection color
    option[i].classList.remove("right");
    option[i].classList.remove("wrong");
  }


  // =======================
  // Restore Previous Answer
  // =======================

  // agar user ne pehle answer select kiya hai
  if (user_ans[current_question] !== undefined) {

    let selectedIndex = user_ans[current_question];

    // correct answer highlight
    if (
      questions[current_question].answer === selectedIndex
    ) {
      option[selectedIndex].classList.add("right");
    }
    else {
      option[selectedIndex].classList.add("wrong");
    }

  }

}



// =======================
// Option Click Event
// =======================

// NOTE:
// Event listener outside loadcontent
// warna multiple event trigger hoga

for (let i = 0; i < option.length; i++) {

  option[i].addEventListener("click", function () {

    // remove old selection
    for (let j = 0; j < option.length; j++) {
      option[j].classList.remove("right");
      option[j].classList.remove("wrong");
    }


    // =======================
    // Score Fix Logic
    // =======================

    // agar pehle correct answer diya tha
    // to score minus karo
    if (
      user_ans[current_question] ===
      questions[current_question].answer
    ) {
      user_score--;
    }


    // store user answer
    user_ans[current_question] = i;


    // check answer
    if (questions[current_question].answer === i) {

      option[i].classList.add("right");

      user_score++;

    }
    else {
      option[i].classList.add("wrong");
    }

  });

}



// =======================
// Next Button
// =======================

next_btn.addEventListener("click", function () {

  // boundary check
  if (current_question < questions.length - 1) {

    current_question++;
    quesCounter++;

    loadcontent();

  }

});



// =======================
// Previous Button
// =======================

prev_btn.addEventListener("click", function () {

  // boundary check
  if (current_question > 0) {

    current_question--;
    quesCounter--;

    loadcontent();

  }

});



// =======================
// First Load
// =======================

loadcontent();


//-------------------------timer-----------------
  
let timerClock = document.querySelector("#timerClock");
 let totalTime = 30 * 60;

 let stop =setInterval(function(){
  
   let Minutes = totalTime / 60
 let Seconds = totalTime % 60
 timerClock.textContent= "⌛"+"Time left "+parseInt(Minutes) +":"+parseInt( Seconds);

  if (Seconds<10){
timerClock.textContent= "⌛"+"Time left "+parseInt(Minutes) +":"+"0"+parseInt( Seconds);
  }

  if (Minutes<5){
   timerClock.style.color="red";
  }

  if (totalTime<=0){
    clearInterval(stop)
  }
  totalTime--;

} , 1000);

//---------------------Submit button logic :-----------------
let submit_btn = document.querySelector("#submit");


submit_btn.addEventListener("click", function(){
  // when button click timer must stop:
  clearInterval(stop);
let score=0;//  variabl for count correct ans :
  
 // for counting the correct ans :
  for(let i=0; i<questions.length; i++){
     if(user_ans[i]!==undefined && questions[i].answer===user_ans[i]){
        score++;
       }
 }
 console.log(score);
 // store in local storage : for result page:
 localStorage.setItem("score", score);
localStorage.setItem("total", questions.length);

window.location.href = "../result_page/result.html";
});



