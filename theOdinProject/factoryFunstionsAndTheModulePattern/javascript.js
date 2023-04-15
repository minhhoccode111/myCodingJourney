//Constructor Functions Pattern to prevent forget "new" keyword
//Ex
function MyConstructor(string, number, boolean) {
  //prevent forget "new" keyword
  if (!(this instanceof MyConstructor)) {
    return new MyConstructor(string, number, boolean);
  }
  this.string = string;
  this.number = number;
  this.boolean = boolean;
}
MyConstructor.prototype.intro = function () {
  return this.string + this.number + this.boolean;
};

const bla_0 = new MyConstructor("asd", 22, true); //with "new" keyword
const bla_1 = MyConstructor("def", 23, false); //without "new" keyword
console.log(bla_0);
console.log(bla_1);

const objProto = {
  string: "string in objProto",
  number: 100,
  boolean: false,
  introInProto: function () {
    return this.string + this.number + this.boolean;
  },
  methodsInProto: function () {
    return this.introInProto();
  },
}; //object to be other constructor function's prototype

function DummyConstructor() {
  if (!(this instanceof DummyConstructor)) {
    return new DummyConstructor();
  }
} //dummy throw away constructor

DummyConstructor.prototype = objProto; //set objProto object to be constructor's prototype

let dummy_0 = DummyConstructor();
console.log(dummy_0.introInProto()); //use method and variable on the prototype object just like nothing

console.log(objProto.isPrototypeOf(dummy_0)); //true
console.log(DummyConstructor.prototype === objProto); //true
