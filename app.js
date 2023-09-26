// app.js
let winScore = document.querySelector('.win-score');
let drawScore = document.querySelector('.draw-score');
let lossScore = document.querySelector('.loss-score');

const message = document.querySelector('.message');
const endMessage = document.querySelector('.end-message');

let playerChoiceText = document.querySelector('.choice-text-player');
let playerChoiceImg = document.querySelector('.choice-img-player');

let computerChoiceText = document.querySelector('.choice-text-computer');
let computerChoiceImg = document.querySelector('.choice-img-computer');

const buttons = document.querySelector('.buttons');
const resetButton = document.querySelector('.reset');

const choices = {
  rock: {loses: 'paper', beats: 'scissors'},
  paper: {loses: 'scissors', beats: 'rock'},
  scissors: {loses: 'rock', beats: 'paper'}
}

//Wins, Draws, Losses
let scores = [0, 0, 0];



let playerChoice;

const getComputerChoice = () => {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

const displayMsg = (playerChoice, computerChoice) => {
  const playerUpper = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1);
  const computerUpper = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
  if (choices[playerChoice].beats === computerChoice) {
    message.textContent = `${playerUpper} beats ${computerChoice}, you win!`;
    updateScore(0);
  } else if (choices[playerChoice].loses === computerChoice) {
    message.textContent = `${computerUpper} beats ${playerChoice}, you lose!`;
    updateScore(2);
  } else {
    message.textContent = `It's a draw`;
    updateScore(1);
  }
}

const resetCPUUI = () => {
  computerChoiceText.textContent = '???';
  computerChoiceImg.src = './img/icons8-question-mark-100.png';
  message.textContent = '';
}

const updateScore = num => {
  scores[num]++;
  checkScore(scores);
};

const updateUI = (playerChoice, computerChoice) => {
  setTimeout(() => {
    playerChoiceText.textContent = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1);
    playerChoiceImg.classList.add('animate__animated');
    playerChoiceImg.classList.add('animate__bounce');
    
    playerChoiceImg.src = `./img/icons8-${playerChoice}-100.png`;
  }, 200)

  //Delay UI output for CPU
  setTimeout(() => {
    displayMsg(playerChoice, computerChoice);
    computerChoiceText.textContent = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
    computerChoiceImg.classList.add('animate__animated');
    computerChoiceImg.classList.add('animate__bounce');
    updateScoreUI();
    computerChoiceImg.src = `./img/icons8-${computerChoice}-100.png`;
  }, 2000);
}

const updateScoreUI = () => {
  winScore.textContent = scores[0];
  drawScore.textContent = scores[1];
  lossScore.textContent = scores[2];
}

const resetAll = () => {
  buttons.style.display = '';
  computerChoiceText.textContent = '???';
  playerChoiceText.textContent = '???';
  computerChoiceImg.src = playerChoiceImg.src = './img/icons8-question-mark-100.png';
  winScore.textContent = drawScore.textContent = lossScore.textContent = 0;
  endMessage.textContent = "Best of 5";
  endMessage.className = '';
  endMessage.classList.add('end-message');
  scores.fill(0, 0, 3);
  message.textContent = '';
}

resetButton.addEventListener('click', function(e){
  e.preventDefault();
  resetAll();
});

buttons.addEventListener('click', function(e){
  e.preventDefault();
  playerChoiceText.textContent = '???';
  playerChoiceImg.src = './img/icons8-question-mark-100.png';
  playerChoiceImg.classList.remove('animate__animated');
  playerChoiceImg.classList.remove('animate__bounce');
  computerChoiceImg.classList.remove('animate__animated');
  computerChoiceImg.classList.remove('animate__bounce');
  buttons.style.display = 'none';
  resetCPUUI();
  playerChoice = e.target.innerHTML.toLowerCase();
  playRound(playerChoice, getComputerChoice());
});

const playRound = (playerChoice, computerChoice) => {
  updateUI(playerChoice, computerChoice);
}

const checkScore = score => {
  buttons.style.display = '';
  const sum =  scores.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  if(sum === 5){
    buttons.style.display = 'none';
    if(scores[0] > scores[2]) {
      endMessage.classList.remove('hide-end-message');
      endMessage.classList.add('text-success');
      endMessage.textContent = "You win!";
    } else if(scores[0] < scores[2]) {
      endMessage.classList.remove('hide-end-message');
      endMessage.classList.add('text-danger');
      endMessage.textContent = "You lose!";
    } else {
      endMessage.classList.remove('hide-end-message');
      endMessage.classList.add('text-secondary');
      endMessage.textContent = "It's a draw...";
    }
  }
}



