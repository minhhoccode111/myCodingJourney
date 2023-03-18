//PROTOTYPE INHERITANCE ON JAVASCRIPT.INFO
//In programming, we often want to take something and extent it.
//For instance, we have a use object with its properties and methods, and want to make admin and guest as slightly modified variants of it. We'd like to reuse what we have in user, not copy/reimplement its methods, just build a new object on top of it.
//Prototype inheritance is a language feature that helps in that
//[[Prototype]]
//In JavaScript, objects have a special hidden property [[Prototype]] (as named in the specification), that is either null or references another object. That object is called 'a prototype':
//When we read property from object, and it's missing, JavaScript automatically takes it from the prototype. In programming, this is called 'prototype inheritance'. And soon we'll study many examples of such inheritance, as well as cooler language features built upon it
//The property [[Prototype]] is internal and hidden, but there are many ways to set it.
//One of them is to use the special name __proto__, like this:
let animal = {
  eats: true,
};
let rabbit = {
  jumps: true,
};
rabbit.__proto__ = animal; //(*) //sets rabbit.[[Prototype]]=animal
//Now if we read a property from rabbit, and it's missing, JavaScript will automatically take it from animal.
//For instance:
//We can find both properties in rabbit now:
console.log(rabbit.eats); //true (**)
console.log(rabbit.jumps); //true
//Here the line (*) sets animal to be the prototype of rabbit
//Then when console.log tries to read property rabbit.eats (**), it's not in rabbit, so JavaScript follows the [[Prototype]] reference and finds it in animal (look from the bottom up)
//Here we can say that 'animal is the prototype of rabbit' or 'rabbit prototypically inherits from animal'
//So if animal has a lot of useful properties and methods, then they become automatically available in rabbit. Such properties are called 'inherited'
//If we have a method in animal, it can be called on rabbit:
animal.walk = function () {
  console.log("Walking");
};
//walk is taken from the prototype
rabbit.walk(); //Walking
//The prototype chain can be longer:
let longEar = {
  earLength: 10,
};
longEar.__proto__ = rabbit;
//walk is taken from the prototype chain
//and so do jumps
longEar.walk(); //Walking (from animal)
console.log(longEar.jumps); //true (from rabbit)
//Now if we read something from longEar, and it's missing, JavaScript will look for it in rabbit, and then in animal
//There are only two limitations:
//1.The reference can't go in circle. JavaScript will throw an error if we try to assign __proto__ in a circle.
//2.The value of __proto__ can be either an object or null. Other types are ignored
//Also it may be  obvious, but still: there can be only one [[Prototype]]. An object may not inherit from two others.
//__proto__ is a historical getter/setter for [[Prototype]]
// It’s a common mistake of novice developers not to know the difference between these two.

// Please note that __proto__ is not the same as the internal [[Prototype]] property. It’s a getter/setter for [[Prototype]]. Later we’ll see situations where it matters, for now let’s just keep it in mind, as we build our understanding of JavaScript language.

// The __proto__ property is a bit outdated. It exists for historical reasons, modern JavaScript suggests that we should use Object.getPrototypeOf/Object.setPrototypeOf functions instead that get/set the prototype. We’ll also cover these functions later.

// By the specification, __proto__ must only be supported by browsers. In fact though, all environments including server-side support __proto__, so we’re quite safe using it.
//WRITING DOESN'T USE PROTOTYPE
//The prototype is only used for reading properties
//Write/delete operations work directly with the object.
//We assign its own walk method to rabbit:
rabbit.walk = function () {
  console.log("Rabbit, bounce-bounce");
};
rabbit.walk(); //rabbit bounce bounce
//From now on, rabbit.walk() call finds the method immediately in the object and executes it, without using the prototype:
//Accessor properties are an exception, as assignment is handled by a setter function. So writing to such a property is actually the same as calling a function.
//For that reason admin.fullName works correctly in the code below:
let user = {
  first: "Hoang",
  last: "Minh",
  set fullName(value) {
    [this.first, this.last] = value.split(" ");
  },
  get fullName() {
    return `${this.first} ${this.last}`;
  },
};

let admin = {
  __proto__: user,
  isAdmin: true,
};
console.log(admin.fullName); //'Hoang Minh'//(*)
//setter triggers!
admin.fullName = "Kieu Tu"; //(**)
console.log(admin.fullName); //'Kieu Tu', state of admin modified
console.log(user.fullName); //'Hoang Minh', state of user protected
//Here in the line (*) the property admin.fullName has a getter in the prototype user, so it is called. And in the line (**) the property has a setter in the prototype, so it is called
//THE VALUE OF 'THIS'
// An interesting question may arise in the example above: what’s the value of this inside set fullName(value)? Where are the properties this.name and this.surname written: into user or admin?

// The answer is simple: this is not affected by prototypes at all.

// No matter where the method is found: in an object or its prototype. In a method call, this is always the object before the dot.

// So, the setter call admin.fullName= uses admin as this, not user.

// That is actually a super-important thing, because we may have a big object with many methods, and have objects that inherit from it. And when the inheriting objects run the inherited methods, they will modify only their own states, not the state of the big object.

// For instance, here animal represents a “method storage”, and rabbit makes use of it.

// The call rabbit.sleep() sets this.isSleeping on the rabbit object:
animal.breath = function () {
  if (!this.isSleeping) {
    return "breathing";
  }
};
animal.sleep = function () {
  this.isSleeping = true;
};

rabbit.name = "white rabbit";
//modifies rabbit.isSleeping
rabbit.sleep();

console.log(rabbit.isSleeping); //true
console.log(animal.isSleeping); //undefined (no such property in the prototype)
//If we had other objects, like bird, snake, etc, inheriting from animal, they would also gain access to methods of animal. But this in each method call would be the corresponding object, evaluated at the call-time (before dot), not animal. So when we write data into this, it is stored into these objects.
// As a result, methods are shared, but the object state is not.
//FOR...IN LOOP
console.log(Object.keys(rabbit)); //jump, walk, name, isSleeping (4)
//Object.keys only returns own keys

for (const prop in rabbit) console.log(prop); //jumps, walk, name, isSleeping, eats, breath, sleep (7)
//for...in loops over both own and inherited keys

//If that's not what we want, and we'd like to exclude inherited properties, there's a built-in method obj.hasOwnProperty(key): it returns true if obj has its own (not inherited) property named key
//So we can filter out inherited properties (or do something else with them):
for (const prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    console.log(`Our: ${prop}`);
    //Our: jumps, walk, name, isSleeping
  } else {
    console.log(`Inherited: ${prop}`);
    //Inherited: eats, breath, sleep
  }
}
//Here we have the following inheritance chain: rabbit inherits from animal, that inherits from Object.prototype (because animal is a literal object {...}, so it's by default), and then null above it:
//Note, there's one funny thing. Where is the method rabbit.hasOwnProperty coming from? We did not define it. Looking at the chain we can see that the method is provided by Object.prototype.hasOwnProperty. In other words, it's inherited
//...But why does hasOwnProperty not appear in the for...in loop like eats and jumps do, if for...in lists inherited properties?
//The answer is simple: it's not enumerable. Just like all other properties of Object.prototype, is has enumerable: false flag. And for...in only lists enumerable properties. That's why it and the rest of the Object.prototype properties are not listed.
//ALMOST ALL OTHER KEY/VALUE-GETTING METHODS IGNORE INHERITED PROPERTIES
//almost all other key/value-getting methods, such as Object.keys, Object.values and so on ignore inherited properties.
//They only operate on the object itself. Properties from the prototype are not taken into account
//SUMMARY
//1. In JavaScript, all objects have a hidden [[Prototype]] property that's either another object or null
//2. We can use obj.__proto__ to access it (a historical getter/setter, there are other ways, to be covered soon)
//3. The object referenced by [[Prototype]] is called a 'prototype'
//4. If we want to read a property of obj or call a method, and it doesn't exist, then JavaScript tries to find it in the prototype.
//5. Write/delete operations act directly on the object, they don't use the prototype (assuming it's a data property, not a setter)
//6. If we call obj.method(), and the method is taken from the prototype, this still references obj. So methods always work with the current object even if they are inherited.
//7. The for...in loop iterates over both its own and its inherited properties. All other key/value-getting methods only operate ob the object itself
//TASKS
