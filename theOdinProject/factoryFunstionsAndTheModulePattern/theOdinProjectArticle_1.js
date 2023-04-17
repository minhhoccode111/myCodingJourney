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
