// Global Constants
// How long to wait before starting playback of the clue sequence
const nextClueWaitTime = 1200;
// Changing number of buttons to 9
const numberOfButtons = 9;
// Amount of time that cluePauseTime decreases per sequence
const timeChange = 75;
// Max number of mistakes until game is over (starts at 0)
const mistakeMax = 2;
// Pause time in between clues
const cluePauseTime = 500;

// Global Variables
// Array of pattern sequence
var pattern = [];
// Current stage of sequence
var progress = 0;
// Whether game is active or not
var gamePlaying = false;
// Whether tone is playing or not
var tonePlaying = false;
// Volume of tone must be between [0.0, 1.0]
var volume = 0.5;
// Number of guesses user has made
var guessCounter = 0;
// How long to hold each clue's light/sound
let clueHoldTime = 1000;
// Number of mistake's user has made
let mistakeCounter = 0;
// Array of custom images
let images = [];
// Max time user has to make a guess before losing
let maxTime = 15;
// Actual time remaining for user to make a guess
let timeCounter = maxTime;
// Timer itself
let timer = null;
// Tell whether the sequence is done playing sounds or not
let sequenceCounter = 0;
/**
 * Called to start the game normally or when a player has paused/won/loss
 */
function startGame() {
  // Initialize game variables
  progress = 0;
  gamePlaying = true;

  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

/**
 * Initializes game variables for the first time
 * Called using when the body of the webpage loads
 */
function init() {
  // Create more game buttons dynamically this time
  let buttonArea = document.getElementById("gameButtonArea");

  // Create buttons
  for (let i = 1; i < numberOfButtons + 1; i++) {
    let div = document.createElement("DIV");
    div.classList.add("buttonDIV");
    div.style.width = 200;
    div.style.height = 200;

    let button = document.createElement("BUTTON");
    button.id = "button" + i;
    button.onclick = function () {
      guess(i);
    };
    button.onmousedown = function () {
      startTone(i);
    };
    button.onmouseup = function () {
      stopTone();
    };
    buttonArea.appendChild(button);
  }

  // Create more frequencies for the additional buttons
  // Frequencies will be random for every game
  generateFreqMap();
  generatePattern();
}

/**
 * Generate the game pattern by using math.random
 */
function generatePattern() {
  pattern = [];
  for (let i = 0; i < numberOfButtons; i++) {
    pattern.push(Math.floor(Math.random() * 9) + 1);
  }
}

/**
 * Pausing the game
 */
function stopGame() {
  // Reset game variables
  gamePlaying = false;
  stopTimer();

  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

// Sound Synthesis Functions
const freqMap = [];

/**
 * Generate random frequencies to be used as sounds in the game
 */
function generateFreqMap() {
  for (let i = 0; i < numberOfButtons + 1; i++) {
    // Math.random with range to create frequencies between 300 and 500
    freqMap.push(Math.random() * (500 - 300) + 300);
  }
}

/**
 * Play the tone of a button
 * @param {int} btn button number
 * @param {int} len length
 */
function playTone(btn, len) {
  // o.frequency.value = freqMap[btn]
  // g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  // tonePlaying = true
  playAudioClip("audio" + btn);
  setTimeout(function () {
    stopTone();
  }, len);
}

/**
 * Start playing the sound
 * @param {int} btn 
 */
function startTone(btn) {
  if (!tonePlaying) {
    playAudioClip("audio" + btn);
    tonePlaying = true;
  }
}

/**
 * Stop playing the sound
 */
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

/**
 * Light up the button
 * Used for sounds and images
 * @param {int} btn button number
 */
function lightButton(btn) {
  let button = document.getElementById("button" + btn);
  button.classList.add("lit");

}

/**
 * Turn off button
 * @param {int} btn button number
 */
function clearButton(btn) {
  let button = document.getElementById("button" + btn);
  button.classList.remove("lit");

}

/**
 * Play the sound from a single button
 * @param {int} btn button number
 */
function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playAudioClip("audio" + btn);
    setTimeout(clearButton, clueHoldTime, btn);
    sequenceCounter++;

    if (sequenceCounter - 1 == progress) {
      timer = setInterval(startTimer, 1000);
    }
  }
}

/**
 * Play the sounds from all the buttons within the
 * revealed sequence so far
 */
function playClueSequence() {
  guessCounter = 0;
  sequenceCounter = 0;
  // Set delay to initial wait time
  let delay = nextClueWaitTime;
  // For each clue that is revealed so far
  for (let i = 0; i <= progress; i++) {
    // Set a timeout to play that clue
    setTimeout(playSingleClue, delay, pattern[i]);
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
}

/**
 * Set the text of an HTML element
 * @param {HTMLElement} element the element to set the text
 * @param {string} text the text to be set to
 */
function setText(element, text) {
  document.getElementById(element).innerHTML = text;
}

/**
 * Start playing the sound clip associated with an Audio HTMLElement
 * @param {HTMLElement} elementName the audio element to be played
 */
function playAudioClip(elementName) {
  document.getElementById(elementName).play();
}

/**
 * Reset all game variables to default state
 * Function will be called when game is won or lost
 */
function resetGame() {
  // Reset game variables
  timeCounter = maxTime;
  clueHoldTime = 1000;
  guessCounter = 0;
  mistakeCounter = 0;

  // Fix changed sequences
  generatePattern();
  stopGame();
  stopTimer();
  
  // Reset screen display text
  setText("timer", "Timer: " + timeCounter);
  setText("lives", "Lives: " + (mistakeMax + 1 - mistakeCounter));
}

/**
 * Display message that game was lost
 */
function loseGame() {
  resetGame();
  alert("Game Over. You lost.");

}

/**
 * Display message that game was won
 */
function winGame() {
  resetGame();
  alert("Game Over. You won!");
}

/**
 * Start the timer count down
 */
function startTimer() {
  timeCounter--;
  setText("timer", "Timer: " + timeCounter);

  if (timeCounter == 0) 
    loseGame();
}

/**
 * Stop the time count down
 */
function stopTimer() {
  clearInterval(timer);
}

/**
 * User makes a guess on the sequence and determine whether the game
 * is lost or won or is continuing.
 * @param {int} btn the button that was guessed 
 */
function guess(btn) {
  if (!gamePlaying)
    return;

  // User guess correctly
  if (btn == pattern[guessCounter]) {
    // User guess is the same as current progress amount
    if (guessCounter == progress) {
      // User has guessed entire sequence correctly
      if (guessCounter == pattern.length - 1) {
        winGame();
      } 
      // Pattern of sequence isn't fully revealed yet
      else {
        progress++;
        clueHoldTime -= timeChange;
        timeCounter = maxTime;

        stopTimer();
        setText("timer", "Timer: " + timeCounter);
        playClueSequence();
      }
    }
    // User hasn't finished guessing yet
    else {
      guessCounter++;
    }
  } 
  // User guessed incorrectly
  else {
    // User hasn't used all strikes yet
    if (mistakeCounter != mistakeMax) {
      mistakeCounter++;
      timeCounter = maxTime;

      stopTimer();
      setText("lives", "Lives: " + (mistakeMax + 1 - mistakeCounter));
      setText("timer", "Timer: " + timeCounter);
      playClueSequence();
    } 
    // User used all strikes and messed up, game over
    else {
      loseGame();
    }
  }
}
