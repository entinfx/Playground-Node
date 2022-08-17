/* Prototype-based language */
// Every object has a [[Prototype]] property that can be used to extend
// object properties and methods.

/* Classes are functions */
// Classes were added in the ECMAScript 2015 (ES6) language specification.
const x = function() {}
const y = class {}
// These two objects have the same [[Prototype]]:
console.log(Object.getPrototypeOf(x))
console.log(Object.getPrototypeOf(y))

// With prototypes, any function can become an instance:
const instanceFromFunction = new x()
const instanceFromClass = new y()
console.log(x)
console.log(y)

/* Defining a class */
// With constructor functions, the common practice is to assign methods directly
// to the prototype:
function Pokemon(name, type) {
    this.name = name
    this.type = type
}

Pokemon.prototype.attack = () => {
    console.log(`${this.name} (${this.type}) attacks!`)
}

// With classes the syntax is simplified:
// class Pokemon {
//     constructor(name, type) {
//         this.name = name
//         this.type = type
//     }

//     attack() {
//         console.log(`${this.name} (${this.type}) attacks!`)
//     }
// }

/* Inheritance */
function Pikachu(name, type, nickname) {
    // Call superclass constructor
    Pokemon.call(this, name, type)

    // Add new property
    this.nickname = nickname
}

// With ES6 syntax:
// class Pikachu extends Pokemon {
//     constructor(name, type, nickname) {
//         // Call superclass constructor
//         super(name, type)

//         // Add new property
//         this.nickname = nickname
//     }
// }

/* Composition (alternative to inheritance) */
// This function takes an object and returns an object with a method put into it
function swimmer({ name }) {
    return {
        swim: () => console.log(`${name} is swimming!`)
    }
}

const shark = swimmer({ name: 'Shark' })
shark.swim()

// This function takes a property, and returns an object with that property and
// a function created by swimmer()
function swimmingMonster(name) {
    const monster = { name }

    return {
        ...monster, // returns all the properties and methods of an object
        ...swimmer(monster)
    }
}

// We can create another 'behavior' method
function flyer({ name }) {
    return {
        fly: () => console.log(`${name} is flying!`)
    }
}

// ...and another object function that makes objects that combine both swimming
// and flying behaviors
function swimmingFlyingMonster(name) {
    const monster = { name }

    return {
        ...monster, // returns all the properties and methods of an object
        ...swimmer(monster),
        ...flyer(monster)
    }
}

const monster = swimmingFlyingMonster('Fred')
monster.swim()
monster.fly()
