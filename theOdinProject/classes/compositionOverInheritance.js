// console.log("Hello World");

//COMPOSITION OVER INHERITANCE
//The problem with inheritance

//We have 2 classes are Dog and Cat. They have 1 duplicate method is poop() and 2 specific methods are meow() and bark(). So to not repeat ourselves we let Dog and Cat inherit from Animal class that have a poop() method
class Animal {
  poop() {}
}

class Dog extends Animal {
  bark() {}
}

class Cat extends Animal {
  meow() {}
}

//It seems to work just fine. But as long as our app gets bigger. We will have another inheritance classes

//We have 2 classes are RobotCleaner and RobotKiller. They have 1 duplicate method is drive() and 2 specific methods are clean() and kill(). So to not repeat ourselves we let RobotCleaner and RobotKiller inherit from Robot class that have a drive() method
class Robot {
  drive() {}
}

class RobotCleaner extends Robot {
  clean() {}
}

class RobotKiller extends Robot {
  kill() {}
}

//And this is how things get worse. What is we want a RobotKillerDog class which can bark(), kill() and drive() at the same time? Inheritance is not possible now because we cannot inherit from Robot class and Animal class at the same time.

//And that's inheritance problem

//COMPOSITION
const barker = (state) => ({
  bark: () => {
    console.log(`Woof! I am ${state.name}`);
  },
});

const driver = (state) => ({
  drive: () => {
    state.position = state.position + state.speed;
  },
});

// barker({ name: "Ngu" }).bark(); //Woof, I am Ngu

const killer = (state) => ({
  kill: () => {
    console.log(`I am killing!`);
  },
});

const getPosition = (state) => {
  return {
    getPosition: () => state.position,
  };
};

const DogRobotKiller = (name) => {
  let state = {
    name,
    position: 0,
    speed: 100,
  };

  return Object.assign(
    {},
    killer(state),
    driver(state),
    barker(state),
    getPosition(state)
  );
};

const robotDog_0 = DogRobotKiller("Milo");
console.log(robotDog_0);

robotDog_0.bark();
robotDog_0.drive();
console.log(robotDog_0.getPosition());
robotDog_0.kill();

//And that's how composition is over inheritance
//if we want to create a normal dog
//first we have poop() method

const pooper = (state) => ({
  poop: () => {
    console.log(`Whoops! I am pooping!`);
  },
});

const DogComposition = (name) => {
  let state = {
    name,
  };

  return Object.assign({}, pooper(state), barker(state));
};

const smallDog = DogComposition("Chihuahua");
console.log(smallDog);
smallDog.poop();
smallDog.bark();

//If we want to create a normal cat

const meower = (state) => ({
  meow: () => {
    console.log(`Meow! I am ${state.name}`);
  },
});

const CatComposition = (name) => {
  let state = {
    name,
  };
  return Object.assign({}, meower(state), pooper(state));
};

const smallCat = CatComposition("Kitty");
console.log(smallCat);
smallCat.meow();
smallCat.poop();

//If we want to create a normal RobotCleaner

const cleaner = (state) => ({
  clean: () => {
    console.log(`${state.name} is cleaning!`);
  },
});

const RobotCleanerComposition = (name) => {
  let state = {
    name,
    position: 0,
    speed: 100,
  };

  return Object.assign({}, driver(state), cleaner(state), getPosition(state));
};

const smallRobotCleaner = RobotCleanerComposition("Small Robot Cleaner");
console.log(smallRobotCleaner);
smallRobotCleaner.clean();
smallRobotCleaner.drive();
console.log(smallRobotCleaner.getPosition());

//If we want to create a normal RobotKiller
const RobotKillerComposition = (name) => {
  let state = {
    name,
    position: 0,
    speed: 100,
  };

  return Object.assign({}, killer(state), driver(state), getPosition(state));
};
const smallRobotKiller = RobotKillerComposition("Small Robot Killer");
console.log(smallRobotKiller);
smallRobotKiller.kill();
smallRobotKiller.drive();
console.log(smallRobotKiller.getPosition());

//Static method
//Static method isn't set on the prototype, instead it set on the class itself (or the constructor function)

class StaticMethodClassTest {
  static staticMethod() {}
  prototypeMethod() {}
}

//And that similar to this constructor function
function StaticMethodFunctionTest() {}
StaticMethodFunctionTest.prototype.prototypeMethod = function () {};
StaticMethodFunctionTest.staticMethod = function () {};

//
//And the "this" keyword in a static method in a class is point back to that class
//ex:
class StaticTest {
  static World() {
    return "World";
  }

  static Hello() {
    return "Hello " + this.World();
  }
}

console.log(StaticTest.Hello()); //Hello World
