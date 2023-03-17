"use strict";
// // console.log("Hello world from app.js");
// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }
// Book.prototype.info = function () {
//   return `
//   This book has Title: ${this.title} is written by ${this.author} and has ${this.page} pages. Read is ${this.read}
//   `;
// };
// const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 600, true);
// // console.log(book1.info());

// let x = {};
// let xR = Object.getPrototypeOf(x);
// let xP = x.__proto__;
// console.log(x);
// console.log(xR);
// console.log(xP);
// console.log(Object.getPrototypeOf(Object.prototype));

// Initialize a constructor function for a new Hero
function Hero(name, level) {
  this.name = name;
  this.level = level;
}
// We have created a constructor function called Hero with two parameters: name and level. Since every character will have a name and a level, it makes sense for each new character to have these properties. The this keyword will refer to the new instance that is created, so setting this.name to the name parameters ensures the new object will have a name property set.
//Now we can create a new instance with new keyword
let hero1 = new Hero("Bjorn", 1);
//If we console out hero1, we will see a new object has been created with the new properties set as expected
console.log(hero1); //Hero {name:'Bjorn', level:1}
//Now if we get the [[Prototype]] of hero1, we will be able to see the constructor as Hero(). Remember, this has the same input as hero1__proto__, but is the proper method to use
Object.getPrototypeOf(hero1); //constructor: ƒ Hero(name, level)
//You may notice that we've only defined properties and not methods in the constructor. It is a common practice in JavaScript to define methods on the prototype for increased efficiency and code readability
//We can add a method to Hero using prototype. We'll create a greet() method
//Add greet method to the Hero prototype
Hero.prototype.greet = function () {
  return `${this.name} say hello.`;
};
//Since greet() is in the prototype of Hero, and hero1 in an instance of Hero, the method is available to hero1
hero1.greet(); //Bjorn say hello
//if you inspect the [[Prototype]] of Hero, you will see greet() as an available option now.
//This is good, but now we want to create classes for the heroes to use. It wouldn't make sense to put all the abilities for every class into the Hero constructor, because different classes will have different abilities. We want to create new constructor functions, but we also want them to be connected to the original Hero.
//We can use the call() method to copy over properties from one constructor into another constructor. Let's create a Warrior and a Healer constructor.
//Initialize Warrior constructor
function Warrior(name, level, weapon) {
  //chain constructor with call
  Hero.call(this, name, level);
  //add new property
  this.weapon = weapon;
}

//Initialize Healer constructor
function Healer(name, level, spell) {
  Hero.call(this, name, level);
  this.spell = spell;
}

//Both new constructor now have the properties of Hero and a few unique ones. We'll add the attack() method to Warrior, and the heal() method to Healer

Warrior.prototype.attack = function () {
  return `${this.name} attack with ${this.weapon}`;
};
Healer.prototype.heal = function () {
  return `${this.name} casts ${this.spell}`;
};
