// console.log("Hoang Minh");

//RECALL
function Gamer(name, birthday) {
  this.name = name;
  this.birthday = birthday;
  Object.defineProperty(this, "age", {
    get() {
      let thisYear = new Date().getFullYear();
      return thisYear - this.birthday.getFullYear();
    },
  });
}

const hoang = new Gamer("Hoang Minh", new Date(2001, 0, 1));
console.log(hoang);
console.log(hoang.age);

//THE "CLASS" SYNTAX
//The basic syntax is:
class MyExampleClass {
  //class methods
  constructor(argument1, argument2) {
    this.argument1 = argument1;
    this.argument2 = argument2;
  }
  method1() {
    //Bla bla
  }
  method2() {
    //Bla bla
  }
}

//Then use "new MyExampleClass()" to create a new object with all the listed methods
//The constructor() method is called automatically by "new", so we can initialize the object there. For example:
class User_0 {
  constructor(name) {
    this.name = name;
    this.firstName = name.split(" ")[0];
    this.lastName = name.split(" ")[1];
  }
  getFullName() {
    return this.name;
  }
  getFirstName() {
    return (() => this.firstName)();
  }
  getLastName() {
    return this.lastName;
  }
  sayHi() {
    console.log(`${this.name} say Hi!`);
  }
}

const minh = new User_0("Hoang Minh");
minh.sayHi();
console.log(minh.getFullName());
// console.log(minh.getFirstName());
console.log(minh.getLastName());

//WHAT IS A CLASS?
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `${this.name} say Bla bla!`;
  }
}

//What "class User {...}" construct really does is:
//1. Creates a function named User, that becomes the result of the class declaration. The function code is taken from the constructor method (assumed empty if we don't write such method).
//2. Stores class methods, such as sayHi, in User.prototype

//After "new User" object is created, when we call its method, it's taken from the prototype, just as described in the chapter F.prototype. So the object has access to class methods.

//class is a function
console.log(typeof User); //function

//...or, more precisely, the constructor method
console.log(User === User.prototype.constructor); //true

//The methods are in User.prototype, e.g:
console.log(User.prototype.sayHi); //the code of sayHi method

//there are exactly two methods in the prototype
console.log(Object.getOwnPropertyNames(User.prototype)); //constructor, sayHi

//NOT JUST SYNTACTIC SUGAR
//Sometimes people say that "class" is a "syntactic sugar" (syntax that is designed to make things easier to read, but doesn't introduce anything new), because we could actually declare the same thing without using the "class" keyword at all
//example

//create a constructor function
function Animal(name) {
  this.name = name;
}

//a function prototype has "constructor" property by default, so we don't need to create it

//2. Add the method to prototype
Animal.prototype.eat = function () {
  let a = this.name
    .split(" ")
    .reduce(
      (total, current) =>
        total + " " + current[0].toUpperCase() + current.slice(1),
      ""
    );
  return `${a} is eating!`;
};

//Usage
const dog = new Animal("andrew tate bla bla bla");
console.log(dog.eat());
console.log(dog.name);

//The result of this definition is about the same. So, there are indeed reasons why "class" can be considered a syntactic sugar to define a constructor together with its prototype methods.
//Still, there are important differences.
//1. First, a function created by "class" is labelled by a special internal property [[IsClassConstructor]]: true. So it's not entirely the same as creating it manually

//The language checks for that property in a variety of places. For example, unlike a regular function, it must be called with "new":
console.log(typeof User); //function
// User(); //Error: Class constructor User cannot be invoked without "new"

//Also, a string representation of a class constructor in most javaScript engines start with the "class..."

console.log(User); //class User{...}
//2.Class methods are non-enumerable. A class definition sets enumerable flag to false for all methods in the "prototype". And that's good, because if we for..in over an object, we usually don't want its class methods

//3. Classes always use strict. All code inside the class construct is automatically in strict mode

//CLASS EXPRESSION
//Just like function, classes can be defined inside another expression, passed around, returned, assigned, etc.
//Example

let blabla = class {
  sayHi() {
    console.log("Hello World");
  }
};

const boo = new blabla();
boo.sayHi();

//Similar to Named function expression, class expressions may have a name.
//If a class expression has a name, it's visible inside the class only:

//Named Class Expression
//(No such term in the spec, but that's similar to Named Function)
const foo = class FooFoo {
  sayHi() {
    console.log(FooFoo); //FooFoo name is visible only inside the class
  }
};

new foo().sayHi(); //Works, shows FooFoo definition
// console.log(FooFoo); //Error, FooFoo name isn't visible outside of the class

//We can even make classes dynamically "on-demand" like this:
function makeClass(phrase) {
  return class {
    sayHi() {
      console.log(phrase);
    }
  };
}

const booBoo = makeClass("Hello");
new booBoo().sayHi();

//GETTERS/SETTERS
//Just like literal objects, classes may include getters/setters, computed properties etc
//Here's an example for user.name implemented using get/set
class Use {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    if (value.length < 4) {
      console.log("Name too short!");
      return;
    }
    this._name = value;
  }
}

let use = new Use("Minh");
console.log(use);
console.log(use.name); //Minh
use.name = "Hoang";
console.log(use.name); //Minh

use = new Use("asd"); //Name is too short
console.log(use);

//Technically, such class declaration works by creating getters and setters in Use.prototype
console.log(use.name); //Minh

//COMPUTED NAMES [...]
//Here's an example with a computed method name using brackets [...]
class Us {
  ["say" + "Hi"]() {
    console.log("Saying Hi");
  }
}

const us = new Us();
us.sayHi();

//CLASS FIELDS
//Previously, our classes only had methods
//"Class fields" is a syntax that allows to add any properties
//For instance, let's add name property to class U

class U {
  name = "Hoang Minh";

  sayHi() {
    console.log(`Hello, ${this.name}`);
  }
}

const u = new U();
u.sayHi(); //Hello Minh
//So we just write "=" in the declaration, and that's it
//The important difference of class fields is that they are set on individual objects, not U.prototype
console.log(Object.getPrototypeOf(u));
console.log(U.prototype.name); //undefined

//We can also assign values using more complex expressions and function calls
class Useru {
  // name = prompt("Name, please.", "Hoang Minh");
}

const useru = new Useru();

//MAKING BOUND METHODS WITH CLASS FIELDS
//As demonstrated, functions in javaScript have a dynamic "this". It depends on the context of the call
//So if an object method is passed around and called in another context, "this" won't be a reference to its object anymore
//For instance, this code will show undefined
class Button {
  constructor(value) {
    this.value = value;
  }
  click() {
    console.log(this.value);
  }
}

let button = new Button("Hello");
setTimeout(button.click, 3000); //undefined

//The problem is called "losing this"
//There are two ways to fix this:
//1. pass a wrapper-function, such as setTimeout(()=>button.click(),3000)
//2. Bind the method to object, e.g. In the constructor
//Class fields provide another, quite elegant syntax
class Butto {
  constructor(value) {
    this.value = value;
  }
  click = () => {
    console.log(this.value);
  };
}

const butto = new Butto("Hello");

setTimeout(butto.click, 3000); //Hello
//The class field click=()=>{...} is created on a per-object basis, there's a separate function for each Butto object, with this inside it referencing that object. We can pass butto.click around anywhere, and the value of this will always be correct
//That's especially useful in browser environment, for event listener

//SUMMARY
//The basic class syntax look like this:

class MyClass {
  prop = value; //property
  constructor() {
    //constructor
    //...
  }
  method() {} //method

  get something() {} //getter method
  set something(value) {} //setter method

  [Symbol.iterator]() {} //method with computed name(symbol here)
}

//MyClass is technically a function (the one that we provide as constructor), while methods, getters and setters are written to MyClass.prototype
//In the next chapters we'll learn more about classes, including inheritance and other features

class Clock {
  constructor({ template }) {
    this.template = template;
  }
  stop() {
    clearInterval(timer);
  }
  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = "0" + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = "0" + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = "0" + secs;

    let output = this.template
      .replace("h", hours)
      .replace("m", mins)
      .replace("s", secs);
    console.log(output);
  }
}

const clock = new Clock({ template: "h:m:s" });
clock.start();
