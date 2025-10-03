let gameSeq=[];
let userSeq=[];
let level=0;
let started=false;
const btnColors=["red","blue","green","yellow"];

// document.addEventListener("keypress",function(){
//     if(!started){
//         document.querySelector("h2").textContent="Level "+level;
//         nextSequence();
//         started=true;
//     };
// });

function btnFlash(color){
    let btn=document.querySelector("."+color);
    btn.classList.add("flash"); 
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);
};

function nextSequence(){
    userSeq=[];
    level++;
    document.querySelector("h2").textContent="Level "+level;
    let randomNum=Math.floor(Math.random()*4);
    let randomChosenColor=btnColors[randomNum];
    gameSeq.push(randomChosenColor);
    console.log(gameSeq);
    btnFlash(randomChosenColor);
};  

let buttons=document.querySelectorAll(".btn");
let start =document.querySelector(".start");

start.addEventListener("click",function(){
    if(!started){
        document.querySelector("h2").textContent="Level "+level;
        nextSequence();
        started=true;
    };

});

function checkAnswer(idx){
    console.log("current level: "+level);
    if(userSeq[idx]===gameSeq[idx]){ 
        if(userSeq.length===gameSeq.length){
            setTimeout(function(){
                nextSequence();
                addPoint();
            },1000);
        };
    } else{
        document.querySelector("h2").innerHTML=`Game Over! Your Score Was  ${(level-1)*100} </br> Press 'START' to Restart`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function() {
                document.querySelector("body").style.backgroundColor="#000080";
            }, 150);
        // startOver();
        gameOver();
    }   
     
};

function startOver(){   

}       


function btnClick(event){
    let userChosenColor=event.target.id;
    userSeq.push(userChosenColor);
    console.log(userSeq);
    checkAnswer(userSeq.length-1);
}

for (btn of buttons) {
    btn.addEventListener("click",btnClick);
}

// Initialize scores
let currentScore = 0;
let highestScore = localStorage.getItem("highestScore") || 0;

// Update UI initially
document.getElementById("highest-score").innerText = "Highest Score: " + highestScore;
document.getElementById("current-score").innerText = "Score: " + currentScore;

// Function: add points
function addPoint() {
  currentScore += 100; // Or your game logic
  document.getElementById("current-score").innerText = "Score: " + currentScore;
}

// Function: when game ends
function gameOver() {
  if (currentScore > highestScore) {
    highestScore = currentScore;
    localStorage.setItem("highestScore", highestScore); // Save in browser
  }

  level=0;
  gameSeq=[];
  started=false;

  alert("Game Over! Your Score: " + currentScore + "\nHighest Score: " + highestScore);

  // Update UI
  document.getElementById("highest-score").innerText = "Highest Score: " + highestScore;

  // Reset score
  currentScore = 0;
  document.getElementById("current-score").innerText = "Score: " + currentScore;
}

// Simon Says Game
// Create a game where the user has to remember and repeat a sequence of colors.
// The game should display a sequence of colors, and the user must click the colors in the same order.
// If the user clicks the correct sequence, the game continues with a longer sequence.
// If the user makes a mistake, the game ends and displays the user's score (the length of the longest correct sequence).
