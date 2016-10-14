////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Title:  Color Guessing Game
//
//  Author: Tony Lanera
//
//  Date:   10/14/2016
//
//  Description:
//  Win the game by guessing the RGB color number. A person has 3 (Easy) to 6 Hard)
//  choices depending on skill level. The all colors and position of the correct color are random.
//  Even I do not know the next colors and where the correct color appear.
//
//  Purpose:
//  This is the first site developed utilizing HTML, CSS and Javascript.
//  The goal of this exercise is to gain understanding and practice using the DOM and Javascript.
//  The HTML and CSS is not complexed.
//
//  Highlights:
//  This is my first javascript built from scratch. 100% of the functionality and
//  80% of the styling was completed prior to doing the code-along exercise.
//  I did review the solution for the transition animation and responsive capablities.
//  All logic and workflow is orignal. Additionaly, I added the hover and unhover capablities
//  of the color choices.
//
//  The infile documentation, shown in this javascript file, demostrates my style in documentation.
//  It is important in code documentation to reduce trouble shooting time and make it easier to modify.
//
///////////////////////////////////////////////////////////////////////////////////////////////////////

// Establish all DOM variables
   // DOM variables for Big header
      var bigHeader   = document.querySelector("#bigHeader"),
          matchColor  = document.querySelector("#matchColor");

   // DOM variables for menu
      var newColors   = document.querySelector("#newColors"),
          answer      = document.querySelector("#answer"),
          easyMenu    = document.querySelector("#easyMenu"),
          hardMenu    = document.querySelector("#hardMenu");

   // DOM variable for table color palatte
      var colorOptions = document.getElementsByClassName("colorOptions");

// Establish all global variables
   var gameLevel = "" // Two options for game level HARD or EASY

// Main program to run and activate the page
   init();

   function init() {
      // initialize the game
         gameLevel = "HARD";
         hardMenu.classList.toggle("selectedEasyHard");
         startGame(gameLevel);

      // Capture gammer action - What are they going to do
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

// All Functions are listed in the following section
   // Overall Functions: Are not specific to a particular area of the page.
   // Big Header Functions: Are functions that only effect the Big Header area
   // Menu Functions: Are functions that only effect the Menu area
   // Palatte Functions: Are functions that only effect the Menu area

// Overall Functions: are not specific to a particular area of the page.
   // This function will start the game
      function startGame(level) {
         setMatchColor(); // Header Function
         setWinner(null); // Menu Function
         setColorOptions(level);  // Table Function
      return;}

   // This will get a random color
      function getRandomColorNmb() {
         var colorMin = 0;
         var colorMax = 255;
         var vReturn = "rgb("+ getRandomIntInclusive(colorMin,colorMax) + ", "
                             + getRandomIntInclusive(colorMin,colorMax) + ", "
                             + getRandomIntInclusive(colorMin,colorMax) +")";
      return vReturn;}

   // Get a Random number between and including min and max
      function getRandomIntInclusive(min,max) {
         min = Math.ceil(min);
         max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;}

// Big Header Functions: Used to manipulate the big header section
   // Set the master color for the game
      function setMatchColor() {
         bigHeader.style.backgroundColor = "";
         matchColor.textContent = getRandomColorNmb(); // Overall function
      return;}

   // Set the game level selected by the gammer
      function gameChoice(level) {
         easyMenu.classList.toggle("selectedEasyHard");
         hardMenu.classList.toggle("selectedEasyHard");
         startGame(level);
      return;}

// Menu Functions
   // Set Winner - Display
      function setWinner(options) {
         if (options === true) {
            answer.textContent = "Correct";
            newColors.textContent = "PLAY AGAIN?"}
         else if (options === false) {
            answer.textContent = "Try Again";}
         else {answer.textContent = "";};
      return;}

// Palatte Functions - Color Selections
   // Set random colors option for selections
      function setColorOptions(gameLevel) {
         // Set color options for selection
         for (var i = 0; i < colorOptions.length; i++) {
            colorOptions[i].style.backgroundColor = getRandomColorNmb();
            colorOptions[i].classList.remove("nohover");
            if (gameLevel === "EASY" && i > 2) {
               colorOptions[i].style.backgroundColor = "";
               colorOptions[i].classList.add("nohover");
            }
         }
         // Set correct option for selection
         if (gameLevel === "EASY") {
            correctOptionIs = getRandomIntInclusive(0,2);
         }
         else {
            correctOptionIs = getRandomIntInclusive(0,(colorOptions.length - 1));
         }
         colorOptions[correctOptionIs].style.backgroundColor = matchColor.textContent;
      };

   // Check if Choice is correct
      function isChoiceCorrect(arrayElement, level) {
         if (arrayElement.style.backgroundColor === matchColor.textContent) {
            if (level === "EASY") {
               for (var i = 0; i < 3; i++) {
                  colorOptions[i].style.backgroundColor = matchColor.textContent
                  colorOptions[i].classList.add("nohover");
               }
            }
            else if (level === "HARD") {
               for (var i = 0; i < colorOptions.length; i++) {
                  colorOptions[i].style.backgroundColor = matchColor.textContent
                  colorOptions[i].classList.add("nohover");
               }
            };
            bigHeader.style.backgroundColor = matchColor.textContent;
            setWinner(true);
         }
         else {
            arrayElement.style.backgroundColor = "";
            arrayElement.classList.add("nohover");
            setWinner(false);
         }
      return;}
