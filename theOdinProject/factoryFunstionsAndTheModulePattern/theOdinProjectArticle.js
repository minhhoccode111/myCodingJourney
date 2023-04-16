// console.log("The Odin Project Article");

//FACTORY FUNCTION INTRODUCTION
//Example you have this constructor
function DummyConstructor(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    return `This ${this.age} years old named ${this.name} says hi.`;
  };
}

const dCtr = new DummyConstructor("Hoang", 22);
DummyConstructor.prototype.type = "Human";
// console.log(dCtr); //object with name = "Hoang" and age=22
// console.log(dCtr.type); //Human (on prototype)

//And that constructor can be converted to this Factory Function
function dummyFactory(name, age) {
  let o = Object.create(dummyFactory.prototype);
  o.age = age;
  o.name = name;
  o.greet = function () {
    return `This ${this.age} years old named ${this.name} says hi.`;
  };
  return o;
}

const dFac = dummyFactory("Minh", 23);
dummyFactory.prototype.type = "Human";
dummyFactory.prototype.introduction = function () {
  console.log(this.name, this.age, this.greet());
};

// console.log(dFac); //object with name = "Minh" and age = 23
// console.log(dFac.type); //Human (on prototype)
dFac.introduction();

//KNOW ABOUT "THIS" KEYWORD
let myFunction = function () {
  return this; //this=global, [object Window]
};
// console.log(myFunction());//Window {window: Window, self: Window, document: document, name: '', location: Location, …}

let myObject = {
  myMethod: function () {
    return this; //this=myObject, [Object myObject]
  },
};
// console.log(myObject.myMethod()); //{myMethod: ƒ}

const button = document.getElementById("showThis");
button.addEventListener("click", function (e) {
  console.log(this); //this=<button id="showThis">Click to show "this" value</button>
  console.log(e.target); //e.target=<button id="showThis">Click to show "this" value</button>

  //this===e.target when we use "function" keyword

  const arrowInFunction = () => {
    console.log(this); //<button id="showThis">Click to show "this" value</button>
  };
  arrowInFunction();
});

button.addEventListener("mouseenter", (e) => {
  console.log(this); // window object
  //this===Window{} when we use arrow function
});

//PRIVATE AND PUBLIC SCOPE
//
