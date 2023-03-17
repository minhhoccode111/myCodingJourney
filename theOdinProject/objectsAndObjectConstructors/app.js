"use strict";
// console.log("Hello world from app.js");
function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
}
Book.prototype.info = function () {
  return `
  This book has Title: ${this.title} is written by ${this.author} and has ${this.page} pages. Read is ${this.read}
  `;
};
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 600, true);
// console.log(book1.info());

let x = {};
let xR = Object.getPrototypeOf(x);
let xP = x.__proto__;
console.log(x);
console.log(xR);
console.log(xP);
console.log(Object.getPrototypeOf(Object.prototype));
