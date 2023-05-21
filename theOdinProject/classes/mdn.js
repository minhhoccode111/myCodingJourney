// console.log("Hoang Minh");

//CLASS USING
//Within a class body, there are a range of features available
class MyClass {
  //constructor
  constructor() {
    //...constructor body
  }

  //instance field
  myField = "foo";
  //Instance method
  myMethod() {
    //myMethod body
  }

  //Static field
  static myStaticField = "bar";
  //Static method
  static myStaticMethod() {
    //myStaticMethod body
  }
  //Static block
  static {
    //Static initialization code
  }

  //field, methods, static fields, and static methods all have "private" forms
  #myPrivateField = "bar";
}

//The pattern above would roughly translate to the following with function constructors:
function MyClassConstructor() {
  this.myField = "foo";
  //constructor body
}

MyClassConstructor.myStaticField = "bar";
MyClassConstructor.myStaticMethod = function () {
  //myStaticMethod body
};
MyClassConstructor.prototype.myMethod = function () {
  //myMethod body
};
(function () {
  //static initialization code
})();

//Private field
class Pri {
  #privateVar;
  constructor(name, age) {
    this.#privateVar = [name, age];
  }
  get pri() {
    return this.#privateVar;
  }
  set pri(value) {
    this.#privateVar = value.split(" ");
  }
}

const pri = new Pri("Hoang Minh", 23);
console.log(pri);
pri.pri = "Minh Hoang 22";
console.log(pri);

//A class element can be characterized by three aspects:
//Kind: Getter, setter, method or field
//Location: Static or instance
//Visibility: public or private
//Together, they add up to 16 possible combinations. To divide the reference more logically and avoid overlapping content, the different elements are introduced in detail in different pages

//INHERITANCE
//The extends keyword is used in class declarations or class expressions to create a class as a child of another constructor (either a class or a function)

// class Animal {
//   constructor(name, weight) {
//     this.name = name;
//     this.weight = weight;
//   }

//   speak() {
//     console.log(`${this.name} makes a noise!`);
//   }
//   eat() {
//     console.log("nom nom");
//   }
// }

class Dog extends Animal {
  tail = 1;
  constructor(name, weight, color) {
    super(name, weight);
    this.color = color;
  }

  speak() {
    console.log(`${this.name} is barking like a dog!`);
  }
}

const dog = new Dog("Chihuahua", 5, "black");
console.log(dog);
dog.tail = 0;
console.log(dog);
dog.speak();

//EXTENDS KEYWORD
//The extends keyword can be used to subclass custom classes as well as built-in objects. Any constructor that can be called with new and has the prototype property can be the candidate for the parent class. The two conditions must both hold -- for example, bound functions and proxy can be constructed, but they don't have a prototype property, so they cannot be subclassed
//The extends keyword is used in class declarations or class expressions to create a class that is a child of another class

//ex
class DateFormatter extends Date {
  getFormatterDate() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${this.getDate()}-${months[this.getMonth()]}-${this.getFullYear()}`;
  }
}

console.log(new DateFormatter("January 1, 2001 23:15:30").getFormatterDate());

//An expression that evaluates to a constructor function (including a class) or null

//DESCRIPTION
//The extends keyword can be used to subclass custom classes as well as built-in objects.
//Any constructor that can be called with new and has the prototype property can be the candidate for the parent class. The two conditions must both hold -- for example, bound functions and proxy can be constructed, but they don't have a prototype property, so they cannot be subclassed

function OldStyleClass() {
  this.someProperty = 1;
}
OldStyleClass.prototype.someMethod = function () {};

class ChildClass extends OldStyleClass {}

class ModernClass {
  someProperty = 1;
  someMethod() {}
}

class AnotherChildClass extends ModernClass {}

//The prototype property of the ParentClass must be an Object or null, but you would rarely worry about this in practice, because a non-object prototype doesn't behave as it should anyway. (It's ignored by the new operator.)

function ParentClass() {}
ParentClass.prototype = 3;

// class ChildClass extends ParentClass{}
//Uncaught TypeError: Class extends value does not have valid prototype property 3

console.log(Object.getPrototypeOf(new ParentClass()));
//[Object: null prototype]{}
//Not actually a number!

//Extends sets the prototype for both ChildClass and ChildClass.prototype

// class ParentClass {}
// class ChildClass extends ParentClass {}

//Allows inheritance of static properties
Object.getPrototypeOf(ChildClass) === ParentClass;
//Allows inheritance of instance properties
Object.getPrototypeOf(ChildClass.prototype) === ParentClass.prototype;

//The right-hand side of extends does not have to be an identifier. You can use any expression that evaluates to a constructor. This is often useful to create mixins. The "this" value in the extends expression is the "this" surrounding the class definition, and referring to the class's name is a ReferenceError because the class is not initialized yet. await and yield work as expected in this expression

class SomeClass extends class {
  constructor() {
    console.log("Base class");
  }
} {
  constructor() {
    super();
    console.log("Derived class");
  }
}

new SomeClass();
//Base class
//Derived class

//MIX-INS
//Abstract subclasses or mix-ins are templates for classes. A class can only have a single superclass, so multiple inheritance from tooling classes, for example, is not possible. The functionality must be provided by the superclass.

//A function with a superclass as input and a subclass extending that superclass as output can be used to implement mix-ins:

const calculatorMixin = (BassClass) => {
  return class extends BassClass {
    calc() {
      //Do something here
    }
  };
};

const randomizedMixin = (BassClass) => {
  return class extends BassClass {
    randomize() {
      //Do something here
    }
  };
};

// Now a class that uses these min-ins can then be written like this:
class Foo {}
class Bar extends calculatorMixin(randomizedMixin(Foo)) {
  //Do something here
}

//Is "Class" in ES6 The New "Bad" Part?

//It's a "good" part because:
//1. Class is something everyone learns and making the syntax better is a good thing
//2. It's an optional feature and there are other ways to create objects like factory functions
//3. Using it for limited purpose is fine.

//It's a "bad" part because:
//1. The concept of "class" doesn't exist in JavaScript
//2. Concept of classes makes things brittle. Prototypes are better and very flexible
//3. It guides people away from goodness and power of functional programming

//
