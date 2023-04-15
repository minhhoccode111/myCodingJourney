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
// console.log(bla_0);
// console.log(bla_1);

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
// console.log(dummy_0.introInProto()); //use method and variable on the prototype object just like nothing

// console.log(objProto.isPrototypeOf(dummy_0)); //true
// console.log(DummyConstructor.prototype === objProto); //true

//how to write a factory method that return a function.
//example a book factory that take title, author, page and read status

function aBookFactoryToReturnABookObject(title, author, pages, read) {
  let obj = Object.create(aBookFactoryToReturnABookObject.prototype);
  obj.title = title;
  obj.author = author;
  obj.pages = pages;
  obj.read = read;
  obj.bookIntro = function () {
    return `${this.title} ${this.author} ${this.pages}, read it: ${this.read}`;
  };
  return obj;
}
aBookFactoryToReturnABookObject.prototype = {
  getAuthor: function () {
    return this.author;
  },
  getTitle: function () {
    return this.title;
  },
  setAuthor: function (newAuthor) {
    this.author = newAuthor;
  },
  setTitle: function (newTitle) {
    this.title = newTitle;
  },
};

const book_0 = aBookFactoryToReturnABookObject(
  "Headfirst JavaScript",
  "Minh author",
  790,
  true
);
const book_1 = aBookFactoryToReturnABookObject(
  "Headfirst Design Pattern",
  "Hoang author",
  730,
  false
);
const book_2 = aBookFactoryToReturnABookObject(
  "Headfirst HTML and CSS",
  "Dang author",
  490,
  true
);
const book_3 = aBookFactoryToReturnABookObject(
  "Data Structures and Algorithms",
  "Pro author",
  590,
  false
);
const book_4 = aBookFactoryToReturnABookObject(
  "Think like a programmer",
  "Newbie author",
  690,
  true
);
console.log(book_0);
console.log(book_0.__proto__);
console.log(book_0.bookIntro());
console.log(book_0.getTitle());
book_0.setTitle("Ngu");
console.log(book_0.getTitle("Ngu"));
