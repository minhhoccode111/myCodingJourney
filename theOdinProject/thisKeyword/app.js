// "use strict";
// console.log("Hello World from HTML");
//THE "THIS" KEYWORD
//"this" references the object that is executing the current function
//when the function is inside an object -> then it is a method, and "this" references to the object
//when function is outside -> then it is a regular function, and "this" references to the global object (window, global)
const video = {
  title: "blabla",
  play() {
    console.log(this); //in object methods
  },
};
video.stop = function () {
  console.log(this); //in object methods
};
video.play(); //{title: 'blabla', play: ƒ, stop: ƒ}
video.stop(); //{title: 'blabla', play: ƒ, stop: ƒ}
//both methods reference to the object itself

function playVideo() {
  //in function
  console.log(this);
}
playVideo(); //Window {window: Window, self: Window, document: document, name: '', location: Location, …}
//when not using strict mode, this will reference to the global object, or window

function Video(title) {
  this.title = title;
  console.log(this); //in a constructor function
}

const vid = new Video("Ngu"); //Video {title: 'Ngu'}
//when using new operator, it creates a new object, and set "this" in that constructor function to point to that new object
//instead of window object, we get this video object

//RECAP
//1. When dealing with a regular function, "this" by default references the global object
//2. But when you call then function using the new operator, which is the case for constructor functions, "this" will reference a new empty object
