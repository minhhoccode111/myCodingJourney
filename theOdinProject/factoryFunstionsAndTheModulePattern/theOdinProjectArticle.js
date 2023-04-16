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

console.log(varPriCtr); //PriCtr {getVal: ƒ, incVal: ƒ, editVal: ƒ}
console.log(varPriCtr.getVal()); //69
