"use strict";
// console.log("Hello world from app.js");
//grab elements
const result = document.querySelector(".result");
const plus = document.querySelector("[data-plus]");
const minus = document.querySelector("[data-minus]");

//class Storage to do something with DOM localStorage
class Storage {
  static setStorage(num) {
    localStorage.setItem("counter", JSON.stringify(num));
  }
  static getStorage() {
    let storage =
      localStorage.getItem("counter") === null
        ? 0
        : JSON.parse(localStorage.getItem("counter"));
    return storage;
  }
}

//init variable
let counter = Storage.getStorage();

//UI class that has static methods to do something with UI
class UI {
  static display() {
    result.innerHTML = counter;
  }
  static increaseCounter() {
    plus.addEventListener("click", (e) => {
      counter++;
      Storage.setStorage(counter);
      UI.display();
    });
  }
  static decreaseCounter() {
    minus.addEventListener("click", (e) => {
      counter--;
      Storage.setStorage(counter);
      UI.display();
    });
  }
}

//call UI methods
UI.display();
UI.increaseCounter();
UI.decreaseCounter();

//add method to window when DOM content is loaded
window.addEventListener("DOMContentLoaded", (e) => {
  UI.display();
});
