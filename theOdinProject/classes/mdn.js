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

class Animal {
  constructor(name, weight) {
    this.name = name;
    this.weight = weight;
  }

  speak() {
    console.log(`${this.name} makes a noise!`);
  }
  eat() {
    console.log("nom nom");
  }
}

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
