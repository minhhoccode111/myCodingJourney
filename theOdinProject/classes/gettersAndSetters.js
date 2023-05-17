// console.log("Hello world!");
"use strict";
let obj = {
  get propName() {
    return this.name;
  },
  set propName(value) {
    this.name = value;
  },
};
//Accessor properties are represented by getter and setter methods. In an object literal they are denoted by get and set
//The getter works when obj.propName is read, the setter works when it is assigned
obj.propName = "Minh";
console.log(obj.propName);
obj.propName = "Hoang";
console.log(obj.propName);

//For instance, we have a use object with name and surname
var user = {
  name: "Minh",
  surname: "Hoang",
};
//Now we want to add a fullName property, that should be "Hoang Minh". Of course, we don't want to copy-paste existing information, so we can implement it as an accessor
var user = {
  name: "Minh",
  surname: "Hoang",
  get fullName() {
    return `${this.surname} ${this.name}`;
  },
  set fullName(value) {
    [this.surname, this.name] = value.split(" ");
  },
};
user.fullName = "Kieu Tu";
//As the result, we have a "virtual" property fullName. It is readable and writable

console.log(user.name);
console.log(user.surname);
console.log(user.fullName);

//ACCESSOR DESCRIPTORS
//Descriptors for accessor properties are different from those for data properties
//For accessor properties, there is no value or writable, but instead there are get and set functions
//That is, an accessor descriptor may have
//get - a function without arguments, that works when a property is read
//set - a function with one argument, that is called when the property is set
//enumerable - same as for data properties
//configurable - same as for data properties
//For instance, to create an accessor fullName with defineProperty, we can pass a descriptor with get and set:
var user = {
  name: "Hoang",
  surname: "Minh",
};

Object.defineProperty(user, "fullName", {
  get() {
    return `${this.name} ${this.surname}`;
  },
  set(value) {
    [this.name, this.surname] = value.split(" ");
  },
});

// alert(user.fullName); //Hoang Minh

for (const key in user) console.log(key);

//Not that a property can be either an accessor (has get/set methods) or a data property (has a value), not both. If we try to supply both get and value in the same descriptor, there will be an error
// //Error invalid property descriptor
// Object.defineProperty({}, "prop", {
//   get() {
//     return 1;
//   },
//   value: 2,
// });

//SMARTER GETTERS/SETTERS
//Getters/setters can be used as wrappers over "real" property values to gain more control over operations with them.
//For instance, if we want to forbid too short names for user, we can have a setter name and keep the value in a separate property _name

var user = {
  get name() {
    return this._name;
  },
  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short, need at least 4 characters!");
      return;
    }
    this._name = value;
  },
};

user.name = "Pete";
console.log(user.name); //Pete

user.name = "An"; //Name is too short,...
console.log(user.name); //Pete

//So, the name is stored in _name property, and the access is done via getter and setter
//Technically, external code is able to access the name directly by using user._name. But there is a widely known convention that properties starting with an underscore "_" are internal and should not be touched from outside the object

//USING FOR COMPATIBILITY
//One of the great uses of accessors is that they allow to take control over a "regular" data property at any moment by replacing it with a getter and a setter and tweak its behavior
//Imagine we started implementing user objects using data properties name and age:
function User(name, age) {
  this.name = name;
  this.age = age;
}

let minh = new User("Minh", 23);
console.log(minh.age); //23
//...but sooner or later, things may change. Instead of age we may decide to store birthday, because it's more precise and convenient:

function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

  //Age is calculated from the current date and birthday
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday;
    },
  });
}

let hoang = new User("Hoang", new Date(2001, 1, 1));
console.log(hoang.birthday);
console.log(hoang.age);
