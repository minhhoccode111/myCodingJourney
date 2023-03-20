console.log("Hello World from fromTheOdinProject.js");
//There are multiple ways to define objects but in most cases, it is best to use the object literal syntax as follows:
const myObject = {
  property: "Value!",
  otherProperty: 77,
  "property with spaces": function () {
    console.log(this);
  },
};
//2 ways to get information out of an object: dot notation and bracket notation
//dot notation
console.log(myObject.property); //Value!
//bracket notation
console.log(myObject["property with spaces"]); //ƒ () {console.log(this)}
//that returns a function
//bracket notation calling method
console.log(myObject["property with spaces"]()); //{property: 'Value!', otherProperty: 77, property with spaces: ƒ}
//and that returns myObject object because "this" in this case is an object method

//Which method you use will depend on context. Dot notation in cleaner and is usually preferred, but there are plenty of circumstances when it is not possible to use it. For example, myObject."property with spaces" won't work because that property is a string with a space in it. Likewise, you cannot use variable in dot notation:
const variable = "property";
myObject.variable; //undefined because it's looking for a property named "variable"
myObject[variable]; //this is equivalent to myObject["property"] and returns "Value!"
//LESSON OVERVIEW
//This section contains a general overview of topics that you will learn in this lesson.
// - How to write an object constructor and instantiate the object.
// - Describe what a prototype is and how it can be used
// - Explain prototypal inheritance.
// - Understand the basic do's and don't's of prototypical inheritance.
// - Explain what Object.create does
// - Explain what "this" keyword is

//OBJECT AS A DESIGN PATTERN
//One of the simplest ways you can begin to organize your code is by simply grouping things into objects. Take these examples from a "tic tac toe" game:
const playerOneName = "hoang";
const playerTwoName = "minh";
const playerOneMarker = "x";
const playerTwoMarker = "o";
//example 2
const playerOne = {
  name: "hoang",
  marker: "x",
};
const playerTwo = {
  name: "minh",
  marker: "o",
};
//At first glance, the first doesn't seem so bad and it actually takes fewer lines to write than the example using objects, but the benefits of the second approach are huge! Let me demonstrate:
function printName(player) {
  console.log(player.name);
}
//This is something that you just could NOT do with the example one setup. Instead, every time you wanted to print a specific player's name, you would have to remember to correct variable name and then manually console.log it:
console.log(playerOneName); //like this
console.log(playerTwoName); //and this
//Again, this isn't that bad... but what if you don't know which player's name you want to print?
function gameOver(winningPlayer) {
  console.log("Congratulations!");
  console.log(winningPlayer.name + " is the winner!");
}
//Or, what if we aren't making a 2 player game, but something more complicated such as an online shopping site with a large inventory? In that case, using object to keep track of an item's name, price, description and other things is the only way to go. Unfortunately, in that type of situation, manually typing out the contents of out object is not feasible either. We need a cleaner way to create out objects, which brings us to...
