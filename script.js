"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = localStorage.getItem("highScore") || 0;

const displayMessage = function (message, color = "#eee") {
  const messageElement = document.querySelector(".message");
  messageElement.textContent = message;
  messageElement.style.color = color;

  
  setTimeout(function () {
    messageElement.textContent = "Start guessing...";
    messageElement.style.color = "#eee";
  }, 5000);
};

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".score").textContent = score;
  document.querySelector(".guess").value = "";
  displayMessage("Start guessing...");
});

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

 
  if (guess < 1 || guess > 20 || isNaN(guess)) {
    displayMessage("Enter a number between 1 and 20!", "red");
    return;
  }

  
  if (guess === secretNumber) {
    displayMessage("Awesome you entered the correct answer");
    document.querySelector(".number").textContent = secretNumber;

    document.querySelector("body").style.backgroundColor = "#60b347";

    document.querySelector(".number").style.width = "30rem";
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      document.querySelector(".highscore").textContent = highScore;
    }

    
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "Too high" : "Too low");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("You lost the game");
      document.querySelector(".score").textContent = 0;
    }
  }
});



document.querySelector(".highscore").textContent = highScore;
