## Use this to take notes

### Constructor Functions

- <strong>Constructor Functions</strong> are functions that are used to construct new objects. The <code>new</code> operator is used to create new instances based off a constructor function. We have seen some built-in JavaScript constructors,such as new Array(), new Object(), new String() but we can also create out own custom templates from which to build new objects
- As an example, let's say we are creating a very simple, text-based role-playing game. A user can select a character and then choose what character class they will have, such as warrior healer, thief and so on
- Since each characters will share many characteristics, such as having a name, a level, and hit points, it makes sense to create a constructor as a template. However, since each character class may have vastly different abilities, we want to make sure each character only has access to their own abilitites. Let's take a look at how we can accomplish this with prototype inheritance and constructors.
- To begin, a constructor function is just a regular function. It becomes a constructor when it is called on by an instance with the new keyword. In JavaScript, we capitalize the first letter of a constructor function by convention.
- We have created a constructor function called Hero with two parameters: name and level. Since every character will have a name and a level, it makes sense for each new character to have these properties. The this keyword will refer to the new instance that is created, so setting this.name to the name parameter ensures the new object will have a name property set
- now we can create a new instance with new
- Now if we get the [[Prototype]] of hero1, we will be able to see the constructor as Hero(). (Remember this has the same input as hero1.**proto**, but is the proper method to use)
