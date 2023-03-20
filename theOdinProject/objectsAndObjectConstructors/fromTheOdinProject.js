console.log("Hello World from fromTheOdinProject.js");
//There are multiple ways to define objects but in most cases, it is best to use the object literal syntax as follows:
const myObject = {
  property: "Value!",
  otherProperty: 77,
  "property with spaces": function () {
    console.log(this);
  },
};
//2 ways to get information out of an object: dot notation and bracket notation
//dot notation
console.log(myObject.property); //Value!
//bracket notation
console.log(myObject["property with spaces"]); //ƒ () {console.log(this)}
//that returns a function
//bracket notation calling method
console.log(myObject["property with spaces"]()); //{property: 'Value!', otherProperty: 77, property with spaces: ƒ}
//and that returns myObject object because "this" in this case is an object method

//Which method you use will depend on context. Dot notation in cleaner and is usually preferred, but there are plenty of circumstances when it is not possible to use it. For example, myObject."property with spaces" won't work because that property is a string with a space in it. Likewise, you cannot use variable in dot notation:
const variable = "property";
myObject.variable; //undefined because it's looking for a property named "variable"
myObject[variable]; //this is equivalent to myObject["property"] and returns "Value!"
