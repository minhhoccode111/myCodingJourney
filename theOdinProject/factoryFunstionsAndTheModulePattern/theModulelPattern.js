//CREATING A MODULE
//first we start using a anonymous closure. Anonymous closures are just functions that wrap our code and create an enclosed scope around it. Closures help keep any state or privacy within that function. Closures are one of the best and most powerful features of JavaScript.
(function () {
  "use strict";
  //our code here
  return `bla bla`;
})();

//EXPORTING OUR MODULE
//Next we will want to export our module. This basically assigns the module to a variable that we can use to call our modules methods

const module_0 = (function () {
  "use strict";
  const helloWorld = () => {
    return "Hello World!";
  };
  return {
    helloWorld,
  };
})();

console.log(module_0.helloWorld()); //Hello World!

//PRIVATE METHODS AND PROPERTIES
//JavaScript does not have a private keyword by default but using closures we can create private methods and private state
const module_1 = (function () {
  let _sentence = "Hello World from module_1!";
  const getSentence = () => {
    return `${_sentence}`;
  };
  const setSentence = (newSentence) => {
    if (newSentence === "") {
      _deleteSentence();
    }
    _sentence = newSentence;
  };
  const _deleteSentence = () => {
    _sentence = null;
  };
  return {
    getSentence,
    setSentence,
  };
})();

// console.log(module_1.getSentence()); //Hello World from module_1
module_1.setSentence("Change to something else");
// console.log(module_1.getSentence()); //Change to something else
module_1.setSentence("");
// console.log(module_1.getSentence()); //empty

//Because our private properties are not returned they are not available outside of our module. Only our public method has given us access to our private methods. This gives us ability to create private state and encapsulation within our code.

//REVEALING MODULE PATTERN
//The Revealing Module Pattern is one of the most popular ways of creating modules. Using the return statement we can return an object literal that "reveals" only the methods or properties we want to be publicly available
const documentMock_0 = (() => ({
  querySelector: (selector) => ({
    innerHTML: null,
  }),
}))();

const documentMock_1 = (function () {
  return {
    querySelector: function (selector) {
      return {
        innerHTML: null,
      };
    },
  };
})();

const Formatter = (function (doc) {
  const log = (mess) => console.log(`[${Date.now()}] Logger: ${mess}`);

  const makeUpperCase = (str) => {
    log("Making uppercase");
    return Text.toUpperCase();
  };

  const writeToDOM = (selector, mess) => {
    doc.querySelector(selector).innerHTML = mess;
  };

  return {
    makeUpperCase,
    writeToDOM,
  };
})(document || documentMock_1);
