/**************************************************************************************************
 Title:  Color Guessing Gam
 Author: Tony Laner
 Date:   10/14/201

 Description:
 Win the game by guessing the RGB color number. A person can choose an easy or hard level.
 The easy level provides three colors, while hard level provides six colors to choose.
 All colors and the position of the collors are generated randomly.
 The location of the correct color on the grid is also randomly placed.

 Purpose:
 This is the first site developed utilizing HTML, CSS and JavaScript.
 The goal of this exercise is to gain understanding and practice using the DOM and Javascript.

 Highlights:
 This is my first website built from scratch using HTML5 CSS3 and JavaScript.
 100% of the functionality and 80% of the styling was completed prior to doing the code-along exercise.
 All logic and workflow is original. Additionally, I added the hover and unhover capabilities
 of the color choices.

 The in-file documentation, shown in the JavaScript file, demonstrates my style in documentation.
 It is important in code documentation to reduce trouble shooting time and make it easier to modify.
 *****************************************************************************************************/

// Establish all DOM variables
var bigHeader    = document.querySelector("#bigHeader"),
    matchColor   = document.querySelector("#matchColor"),

    newColors    = document.querySelector("#newColors"),
    answer       = document.querySelector("#answer"),
    easyMenu     = document.querySelector("#easyMenu"),
    hardMenu     = document.querySelector("#hardMenu"),

    colorOptions = document.getElementsByClassName("colorOptions");

// Establish all global variables
var gameLevel               = "",
    noHoverClass            = "nohover",
    levelEasy               = "EASY",
    levelHard               = "HARD",
    selectedSkillLevelClass = "selectedEasyHard"

// Main program to run and activate the page
init();

/**
 * init: This function activates the page, sets the game level to hard and sets the page event listeners
*/
function init() {
   gameLevel = levelHard;
   hardMenu.classList.toggle(selectedSkillLevelClass);
   startGame(gameLevel);
   setEventListener();
}

/**
 * startGame: This function sets the match color, removes the game status with setGameStatus function, and
 *            presents color options based on the skill level of the game.
*/
function startGame(level) {
   setMatchColor();
   setGameStatus(null);
   setColorOptions(level);
}

/**
 * setEventListener: Establish the event listeners for the page.
 */
function setEventListener() {
   newColors.addEventListener("click", function () {
      newColors.textContent = "NEW COLORS";
      startGame(gameLevel)}); // Overall function
   easyMenu.addEventListener("click", function () {
      gameLevel = easyMenu.textContent;
      gameChoice(gameLevel)}); // Big Header function
   hardMenu.addEventListener("click", function () {
      gameLevel = hardMenu.textContent;
      gameChoice(gameLevel)}); // Big Header function
   for (var i = 0; i < colorOptions.length; i++) {
      colorOptions[i].addEventListener("click", function () {isChoiceCorrect(this, gameLevel)});
   };
}

/**
 * getRandomColorNmb: Generates a random rgb color
 * @return {text} returns a rgb color in the following format "rgb(###, ###, ###)"
 */
function getRandomColorNmb() {
   var colorMin = 0;
   var colorMax = 255;
   var vReturn = "rgb("+ getRandomIntInclusive(colorMin,colorMax) + ", "
                       + getRandomIntInclusive(colorMin,colorMax) + ", "
                       + getRandomIntInclusive(colorMin,colorMax) +")";
return vReturn;}

/**
 * getRandomIntInclusive: Get a Random number between and including min and max
 * @param  {number} min The bottom range of numbers
 * @param  {number} max The top range of numbers
 * @return {number} returns a random number found between the bottom and top range.
*/
function getRandomIntInclusive(min,max) {
   min = Math.ceil(min);
   max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;}

/**
 * setMatchColor: Determines the match color.
 * Resets the backgroundColor of the header to the initial color.
 */
function setMatchColor() {
   bigHeader.style.backgroundColor = "";
   matchColor.textContent = getRandomColorNmb(); // Overall function
}

/**
 * gameChoice: Set the game level which was selected by the user]
 * @param  {text} level: The skill level of the game. Options are "HARD" with six choices or ""
*/
function gameChoice(level) {
   easyMenu.classList.toggle(selectedSkillLevelClass);
   hardMenu.classList.toggle(selectedSkillLevelClass);
   startGame(level);
}

/**
 * setGameStatus: Set the game status for the game.
 * @param {bollean} options: There are three type of game status. "True": Person won the game.
 *                           "False": Person made a wrong selection. "Null": Resets the game status
 */
function setGameStatus(options) {
   if (options === true) {
      answer.textContent = "Correct";
      newColors.textContent = "PLAY AGAIN?"}
   else if (options === false) {
      answer.textContent = "Try Again";}
   else {answer.textContent = "";};
}

/**
 * setColorOptions: Based on the game level this function sets the color options and sets one option as the correct color.
 * @param {text} gameLevel The game level has two options "EASY" with three color options and "HARD" with six color options
 */
function setColorOptions(gameLevel) {
   // Set color options for selection
   for (var i = 0; i < colorOptions.length; i++) {
      colorOptions[i].style.backgroundColor = getRandomColorNmb();
      colorOptions[i].classList.remove(noHoverClass);
      if (gameLevel === levelEasy && i > 2) {
         colorOptions[i].style.backgroundColor = "";
         colorOptions[i].classList.add(noHoverClass);
      }
   }
   // Set correct option for selection
   if (gameLevel === levelEasy) {
      correctOptionIs = getRandomIntInclusive(0,2);
   }
   else {
      correctOptionIs = getRandomIntInclusive(0,(colorOptions.length - 1));
   }
   colorOptions[correctOptionIs].style.backgroundColor = matchColor.textContent;
};

/**
* isChoiceCorrect: Determines if the user has selected the correct color. If yes, this function changes the background color of header and
*                  all color options to the correct color and sets game status to correct.
*                  If no, then the color option selected is removed and the game status is set to "try again".
* @param {object} arrayElement The color selected from the grid
* @param {text} level The two game levels. "EASY" with three color options and "HARD" with six color options.
 */
function isChoiceCorrect(arrayElement, level) {
   if (arrayElement.style.backgroundColor === matchColor.textContent) {
      if (level === levelEasy) {
         for (var i = 0; i < 3; i++) {
            colorOptions[i].style.backgroundColor = matchColor.textContent
            colorOptions[i].classList.add(noHoverClass);
         }
      }
      else if (level === levelHard) {
         for (var i = 0; i < colorOptions.length; i++) {
            colorOptions[i].style.backgroundColor = matchColor.textContent
            colorOptions[i].classList.add(noHoverClass);
         }
      };
      bigHeader.style.backgroundColor = matchColor.textContent;
      setGameStatus(true);
   }
   else {
      arrayElement.style.backgroundColor = "";
      arrayElement.classList.add(noHoverClass);
      setGameStatus(false);
   }
}
