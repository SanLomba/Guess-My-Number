'use strict';
//NOTE: To select an element in JS from a HTML file, you write document.querySelector() and in the parentheses you write the same selector that you would use in CSS, like a dot (.) for classes, a hasthag(#) for IDs, etc. When selecting an element, always write the selector and name in a string. Check the videos in section 6 for more information and check the HTML notes as well. To see only the content of the selected element. use the .textContent method net to the 2nd parentheses of the element selector, this way only the content will be seen.

//console.log(document.querySelector('.message').textContent);

/* What is DOM and DOM manipulation?
The DOM is called Document Object Model and it's a structured representation of HTML documents (a tree structure), which allows JavaScript to access and manipulate HTML elements and styles, this is DOM manipulation. Thanks to this, we can change text, HTML attributes and even CSS styles. The DOM is automatically created by the browser. The DOM is stored in a tree structure, where each element represents an object in this structure. The starting object is called Document, which serves as an entry point for JavaScript, that's why we used document as a starting obejct to get information from the HTML file in the example above. The child element of document is the HTML element, this is because it is the root element of all HTML documents. After that follow the child elements of HTML, which are usually the head and body elements. This tree goes on and on since in each element there might be more elements and inside those elements there may be more and so on until you reach a poiint where there are no more elments. (Watch video 71 in section 7 for more details) The DOM and DOM methods are part of WEB APIs, which stand for Application Programming Interface, which aren't part of JavaScript but can interact with JavaScript. 
*/

//To change the content of the message, we would just do it as if we were writing a variable containing a string, as you can see below. This is DOM manipulation, we manipulated the text content of one of the DOM notes.
//document.querySelector('.message').textContent = '🎉 Correct Number!';

//document.querySelector('.number').textContent = 13;
//document.querySelector('.score').textContent = 87;

//To get, manipulate or set the value of an input field (the place where values can be entered), we need to use .value instead of .textContent.
//document.querySelector('.guess').value = 6;
//console.log(document.querySelector('.guess').value);

//In order to make an application react, we need an event listner, which will wait for a specific event to occur which will cause a reactio from our code.

/*
NOTE

To listen for events, we first need to establish where the event should happen. This is done by using the query selector that has been used before document.querySelector() and in the parentheses select where the event should occur, in this case it would be in the check button. After that, add an event listener method, this will be the one used .addEventListener() next to the last parentheses, and since it's a method, we have to write the parentheses next to it and write down name of the event inside them as a string.

After specifying to the event listener what to look out for, we need to specify the reaction to the event. We do this by creating a function that contains the code of what should happen whenever the specific event occurs. The .addEventListener method is special, in that it expects as a second argument the event handler function (the reaction to the event). In this case, it will display the number in the guess box in the console and also change the message from "Start guessing..." to "🎉 Correct Number". Anything insterted into the function will happen when the event happens.

Math is an object given by JavaScript that gives multiple methods, one would be .random, which gives a random number from 0 to 1. Then using Math.trunc with Math.random in its parentheses, the decimal part of the number is removed. Then, depending on what the max number we want is, we multiply it by the max number, in this case 20 and add 1 to it since the Math.random metod wouldn't be able to reach 20, it would be a max of 19.99999 and removing the decimal, it would be only 19. Since Math.trunc and Math.random are methods, remember to always include the parentheses next to them.

It is always best to have all the data in our code, since it allows our application to know the score at all times. We should always have the data in our code and not rely on the DOM to hold it.

In the section where the player wins, we can se that to select an element, we write the same as if we were selecting a class but without a dot, since the dot is for classes and to selecet elements of a certain type we need the element name. To change the style of that element, we write .style next to the parentheses and write another dot with the property of the style that we want to change. Check the section where it says "When player wins". We can see how the CSS style is manipulated. Also, whenever we are manipulating a style, we always need to specify a string, meaning that we always have to write the value as a string. Also, remember to specify the unit, like pixels, rem, etc.

The change in style we see when the player wins, is an inline style, meaning that it doesn't change the content in the CSS file but instead it just applied over. Like a new coat of paint in a way.

Refactoring is the action of rewrting the code in order for it to behave the same way but exlcuding all of the duplicate code or semi-duplicate code. You can do this by merging identical or very similar code together and in the case of small differences, add a small line of code that covers that small change, or by creating functions that use the same pieces of code.

*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

//Message Function
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

//Body Background Color Function
const styleBodyBackground = function (color) {
  document.querySelector('body').style.backgroundColor = color;
};

//Secret Number Content
const secretNumberContent = function (content) {
  document.querySelector('.number').textContent = content;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //When there is no input
  if (!guess) {
    displayMessage('⛔️ No Number!');

    //When player wins
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    secretNumberContent(secretNumber);

    styleBodyBackground('#60b347');
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      score--;
      document.querySelector('.score').textContent = score;
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
    } else {
      displayMessage('💥 You have lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }

  //Again Function (Coding Challenge 1)
  document.querySelector('.again').addEventListener('click', function () {
    score = 20;
    document.querySelector('.score').textContent = score;
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    displayMessage('Start guessing...');
    secretNumberContent('?');
    document.querySelector('.guess').value = '';

    styleBodyBackground('#222');
    document.querySelector('.number').style.width = '15rem';
  });
});
