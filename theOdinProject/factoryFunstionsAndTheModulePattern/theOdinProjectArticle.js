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
  return this.name, this.age, this.greet();
};

// console.log(dFac); //object with name = "Minh" and age = 23
// console.log(dFac.type); //Human (on prototype)
// console.log(dFac.introduction());

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
//PUBLIC SCOPE
let publicVar = 10; //create a public variable named publicVar
function getPublicVar() {
  return publicVar; //create a public function to return public variable named publicVar
}
function increasePublicVar() {
  publicVar++; //create a public function to increase public variable named publicVar by 1
}
increasePublicVar();
increasePublicVar();
// console.log(getPublicVar());//12

// //FACTORY FUNCTION THAT RETURN A PUBLIC OBJECT
// function factoryObject(value = 0) {
//   //factory function has default value property set to 0
//   let o = Object.create(factoryObject.prototype); //create a new object with Object.create() to set its __proto__ to this factory function prototype object so that it has the __proto__ property does the inheritance
//   o.value = value; //init object property named value with factory function argument
//   return o; //then return object
// }
// factoryObject.prototype = {
//   getObjVar: function () {
//     return this.value;
//   },
//   increaseObjVar: function () {
//     this.value++;
//   },
// };
// let varContainObj = factoryObject(5);
// console.log(varContainObj);
// console.log(varContainObj.value);
// varContainObj.increaseObjVar();
// varContainObj.increaseObjVar();
// console.log(varContainObj.getObjVar());
// console.log(varContainObj.__proto__);
// console.log(varContainObj.__proto__ === factoryObject.prototype); //true

//FACTORY FUNCTION THAT RETURN A PUBLIC OBJECT WITH PRIVATE VALUE PROPERTY

// function factoryObjPriVal(value = 20) {
//   let val = value;
//   let getVal = function () {
//     return val;
//   };
//   let incVal = function () {
//     val++;
//   };
//   let editVal = function (newVal) {
//     val = newVal;
//   };
//   return { getVal, incVal, editVal };
// }

// const varFOPV_0 = factoryObjPriVal(-5);

// console.log(varFOPV_0);
// console.log(varFOPV_0.getVal()); //-5
// varFOPV_0.editVal(100);
// console.log(varFOPV_0.getVal()); //100
// varFOPV_0.incVal();
// console.log(varFOPV_0.getVal()); //101
// //so every object we create with factory function will has methods to access to its private value with this pattern
// console.log(varFOPV_0.val); //undefined

//CONSTRUCTOR FUNCTION THAT RETURN A PUBLIC OBJECT WITH PRIVATE VALUE PROPERTY
function PriCtr(priVal = 0) {
  if (!(this instanceof PriCtr)) {
    return new PriCtr(priVal);
  }
  let val = priVal;
  this.getVal = function () {
    return val;
  };
  this.incVal = function () {
    val++;
  };
  this.editVal = function (newVal) {
    val = newVal;
  };
}

const varPriCtr = new PriCtr(69);

// console.log(varPriCtr); //PriCtr {getVal: ƒ, incVal: ƒ, editVal: ƒ}
// console.log(varPriCtr.getVal()); //69

//PUBLIC AND PRIVATE SCOPE
//In many programming languages, you'll hear about "private" and "public" scope. In JavaScript there is no such thing. We can, however, emulate public and private scope through things like Closures
//By using JavaScript design patterns, such as the Module pattern for example, we can create "public" and "private" scope. A simple way to create private scope, is by wrapping our functions inside a function. As we've learned, functions create scope, which keeps things out of the global scope.
const module_0 = (function (str) {
  //private scope inside here
  const printHello = function (str) {
    //add function to use in our app
    return "Hello World " + str;
  };
  return printHello;
})();
// printHello();// Uncaught ReferenceError: myFunction is not defined
// when we come to calling our function, it would be out of scope and that's a private scope
// But what if we want the function to be public? There's a great pattern (called the Module Pattern [and Revealing Module Pattern]) which allows us to scope our functions correctly, using private and public scope and an object.
//Here is a global namespace, called Module, which contains all of my relevant code for that module:
var Module = (function () {
  return {
    //the return statement here is what returns our public methods, which are accessible in the global scope, and can contain as many methods as we want. We can extend the Module as we wish
    //below is 4 public methods
    printHello: function (str) {
      return `${str} say Hello World from HTML!`;
    },
    talking: function () {
      return "Talking";
    },
    greeting: function () {
      return "Greeting";
    },
    walking: function () {
      return "Walking";
    },
  };
})();
// console.log(Module.talking()); //Talking

//So what about private methods? This is where a lot of developers go wrong and pollute the global namespace by dumping all their functions in the global scope. Functions that help our code WORK do not need to be in the global scope, only the API calls do - things that NEED to be accessed globally in order to work. Here's how we can create private scope, by NOT returning functions.
var Module = (function () {
  const privateFunc = function () {
    //this is a private function because it has not been returned by outer function
    return `Hello world private function`;
  };
  const publicFunc = function () {
    //this is a public function because it has been returned by outer function
    return `Hello world public function`;
    // return privateFunc(); //has access to privateFunc, we can call it
  };
  return {
    value: 10,
    publicFunc,
  };
})();
// console.log(Module.value); //10
// console.log(Module.publicFunc()); //Hello world public function
// console.log(Module.privateFunc()); //Error because it is private function
//This means that publicFunc can be called, but privateFunc can't, as it's privately scoped. There privately scoped functions are things like helpers, addClass, removeClass, Ajax/XHR, Array, Object, etc.Anything you can think of.
//So anything in the same scope has access to anything in the same scope, even after the function has been returned. Which means, out public methods have access to our private ones, so they can still interact but are unaccessible in the global scope.
//This allows a very powerful level of interactivity, as well as code security. A very important part of JavaScript is ensuring security, which is exactly WHY we cannot afford to put all functions in the global scope as they'll be publicly available, which makes them open to vulnerable attacks.
//One neat naming convention is to begin private methods with an underscore, which visually helps you differentiate between private and public methods.
var Module = (function () {
  const _privateFunc = function () {
    return "Hello world from private method";
  };
  const publicFunc = function () {
    return "Hello world from public method";
  };
  const callPrivateFunc = function () {
    return _privateFunc();
  };
  return { publicFunc, callPrivateFunc };
})();
// console.log(Module.publicFunc()); //Hello world from public method
// console.log(Module.callPrivateFunc()); //Hello world from private method
