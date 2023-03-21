const myObj = Object.create(Object.prototype);
const myLiteralObj = {};

console.dir(myObj.prototype);
//undefined
console.dir(myLiteralObj);
//an object that its prototype is Object constructor's prototype
console.dir(myLiteralObj.__proto__);
//Object constructor's prototype
console.dir(myObj);
//an object that its prototype is Object constructor's prototype
console.dir(myObj.__proto__);
//Object constructor's prototype
console.dir(Object.prototype);
//Object constructor's prototype
//So basically they all have the same pointer to Object constructor's prototype

//And if you want to create an object that don't have prototype, then:
const noProto = Object.create(null);
console.dir(noProto);
//no properties

//SO WHAT ABOUT CONSTRUCTOR?
const Car = function (color) {
  this.color = color;
};

const car1 = new Car("red");
const car2 = Object.create(Car.prototype);

console.dir(car1);
//car1 has the color property
console.dir(car2);
//car2 doesn't has the color property
//But why? Because when we use "new" keyword with Car constructor, it will initialize "color" property at the same time.
//But when we only use Object.create() to create a new clone Car constructor's prototype to assign it to car2. Then car2 wouldn't have a color property (because not calling Car constructor's function with new keyword to create new obj and assign to it a color property)
Car.prototype.colorOnPrototype = "Red color on prototype";

console.dir(car1.colorOnPrototype);
//"Red color on prototype"
console.dir(car2.colorOnPrototype);
//"Red color on prototype"

//when we change Car.prototype, change will appear on both car1 and car2
