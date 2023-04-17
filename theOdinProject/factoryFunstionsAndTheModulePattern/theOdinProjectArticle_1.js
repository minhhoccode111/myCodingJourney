// console.log("Hello");
//MORE ABOUT JAVASCRIPT DESTRUCTURING
//ARR
const arr = [1, 2, 3, 4, 5];
const { ...a } = arr;
// console.log(a);

//OBJ
const obj = {
  firstName: "Hoang",
  lastName: "Minh",
  name: "Hoang Minh",
  age: 22,
  gender: "male",
  educated: true,
  level: "Junior",
  languages: ["javaScript", "HTML", "CSS", "Nodejs"],
};
//basic assignment
const { lastName, age } = obj;
console.log(lastName, age); //Minh 22

//assigning to new variable names
const { lastName: lastNameInObj, age: ageInObj } = obj;
console.log(lastNameInObj, ageInObj); //Minh 22

//INHERITANCE WITH FACTORIES FUNCTION IN JAVASCRIPT WITH DESTRUCTURING
function People(name) {
  const getName = () => name;
  const intro = () => `Hi, my name is ${name}`;
  return { getName, intro };
}

const me = People("Minh");
const you = People("Hoang");
// console.log(me);
// console.log(me.intro());
// console.log(me.getName());

// console.log(you);
// console.log(you.intro());
// console.log(you.getName());

const Programmer = (name, level) => {
  const { intro } = People(name);
  const greeting = () => `Hi, I am ${name}, ${level} developer.`;
  return { intro, greeting };
};

const minh = Programmer("Minh", "Junior");
// console.log(minh);
// console.log(minh.intro()); //Hi, my name is Minh
// console.log(minh.greeting()); // Hi, I am Minh, Junior developer.

//INHERITANCE WITH FACTORIES FUNCTION IN JAVASCRIPT WITH Object.assign()

const Nerd = (name, level) => {
  const prototype = { ...People(name), ...Programmer(name, level) };
  const doSomeNerdy = () => {
    return `Doing nerdy things.`;
  };
  return Object.assign({}, prototype, { doSomeNerdy });
};

const hoang = Nerd("Hoang", "Senior");
// console.log(hoang);
// console.log(hoang.doSomeNerdy());
// console.log(hoang.getName());
// console.log(hoang.greeting());
// console.log(hoang.intro());

//CLOSURE IN JAVASCRIPT
//Definition
//A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). IN OTHER WORDS, A CLOSURE GIVES YOU ACCESS TO AN OUTER FUNCTION'S SCOPE FROM AN INNER FUNCTION. In JavaScript, closures are created every time a function is created, at function creation time.
//To use a closure, define a function inside another function and expose it. To expose a function, return it or pass it to another function.
//The inner function will have access to the variables in the outer function scope, even after the outer function has returned
//USING CLOSURES
//Among other things, closures are commonly used to give objects data privacy. Data privacy is an essential property that helps us program to an interface, not an implementation. This is an important concept that helps us build more robust software because implementation details are more likely to change in breaking ways than interface contracts
//In javascript, closures are the primary mechanism used to enable data privacy.
//When you use closures for data privacy, the enclosed variables are only in scope within the containing (outer) function.
//You can't get at the data from an outside scope except through the object's privileged methods.
//In JavaScript, any exposed method defined within the closure scope is privileged
