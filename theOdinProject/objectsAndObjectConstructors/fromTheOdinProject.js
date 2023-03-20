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
//OBJECT CONSTRUCTORS
//When you have a specific type of object that you need to duplicate like our player or inventory items, a better way to create them is using an object constructor, which is a function that looks like this:
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}
//And which you use by calling the function with the "new" keyword:
const player = new Player("hoang", "x");
console.log(player.name); //"hoang"
//Just like with objects created using the Object Literal method, you can add functions to the object:
Player.prototype.sayName = function () {
  console.log(this.name);
};
player.sayName(); //"hoang"

const player1 = new Player("kieu", "x");
const player2 = new Player("tu", "o");
player1.sayName(); //"kieu"
player2.sayName(); //"tu"

//EXERCISES
const bookConstructor = function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, read it?: ${read}`;
  };
};
const theHobbit = new bookConstructor(
  "The Hobbit",
  "J.R.R. Tolkien",
  295,
  false
);
console.log(theHobbit.info());
//THE PROTOTYPE
//Before we go much further, there's something important you need to understand about JavaScript objects. All objects in JavaScript have a prototype. Stated simply, the prototype is another object that the original object inherits from, which is to say, the original object has access to all of its prototype's methods and properties.
//If you're understood the concept of the prototype, this next bit about constructors will not be confusing at all!
function Student(name, grade) {
  this.name = name;
  this.grade = grade;
}
Student.prototype.sayName = function () {
  return `${this.name} say hi!`;
};
Student.prototype.goToProm = function () {
  return `Ey... wanna go to prom with me?`;
};
//if you're using constructors to make your objects it is best to define functions on the prototype of that object. Doing so means that a single instance of each function will be shared between all of the Student objects. If we declare the function directly in to constructor, like we did when they were first introduced, that function would be duplicated every time a new Student is created. In this example, that wouldn't really matter much, but in a project that is creating thousands of objects, it really can make a difference.

//RECOMMENDED METHOD FOR PROTOTYPAL INHERITANCE
//So far you have seen several ways of making an object inherit the prototype from another object. At this point in history, the recommended way of setting the prototype of an object is Object.create()
//Object.create() very simple returns a new object with the specified prototype and any additional properties you want to add. For our purposes, you use it like so:
function Pupil() {}

Pupil.prototype.sayName = function () {
  return this.name;
};
function FourthGrader(name) {
  this.name = name;
  this.grade = 4;
}
FourthGrader.prototype = Object.create(Pupil.prototype);

const binh = new FourthGrader("binh");
console.log(binh.sayName()); //console.logs "binh"
console.log(binh.grade); //4
//You can probably figure out what's going on here. After creating the constructor for FourthGrader, we set its prototype to a new object with the prototype Pupil.prototype i.e an empty object with its __proto__ pointing to Pupil.prototype

//WARNING: This doesn't work
// FourthGrader.prototype = Pupil.prototype;//this doesn't work
//because it will literally set FourthGrader's prototype to Pupil.prototype (i.e not a copy of Pupil.prototype), which could cause problems if you want to edit something in the future. Consider one more example:
function ErrorPupil() {}
ErrorPupil.prototype.sayName = function () {
  return this.name;
};
function ErrorFourthGrader(name) {
  this.name = name;
  this.grade = 4;
}

//DON'T DO THIS
ErrorFourthGrader.prototype = ErrorPupil.prototype;

function ErrorThirdGrader(name) {
  this.name = name;
  this.grade = 3;
}

//noooo! Not again!
ErrorThirdGrader.prototype = ErrorPupil.prototype;
ErrorThirdGrader.prototype.sayName = function () {
  return "Hahaha this cause an error!";
};
const newPupil = new ErrorFourthGrader("newPupil");
console.log(newPupil.sayName()); //"Hahaha this cause an error!"
//If we had used Object.create in this example, then we could safely edit the ErrorThirdGrader.prototype.sayName function without changing the function for ErrorFourthGrader as well.
