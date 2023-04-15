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
