/* Destructuring arrays */
const [banana, apple, strawberry] = ['banana', 'apple', 'strawberry']
console.log(banana)

// Provide default value for undefined values
const [firstName = 'N/A', age] = [undefined, 25]
console.log(firstName)

/* Destructuring objects */
const { one, two, three } = { one: 1, two: 2, three: 3 }
console.log(one)

// Rename objects
const { name: callsign } = { name: 'X Æ A-12' }

/* Swap array elements */
let [x, y] = [9, 6]; // <-- semicolon necessary here or js get confused :/
[x, y] = [y, x] // swap using destructuring
console.log(x, y)
