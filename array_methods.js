const pokemon = [
    {
        name: 'Pikachu',
        category: 'mouse',
        weight: 13.2,
        type: 'electric'
    },

    {
        name: 'Quilava',
        category: 'volcano',
        weight: 41.9,
        type: 'fire'
    },

    {
        name: 'Meowth',
        category: 'scratch cat',
        weight: 9.3,
        type: 'normal'
    },

    {
        name: 'Rattata',
        category: 'mouse',
        weight: 7.7,
        type: 'normal'
    }
]

/* Filter */
// Returns a filtered array
// const fatPokemon = pokemon.filter(pokemon => pokemon.weight > 10.0)
// console.log(fatPokemon)

/* Map */
// Modifies eaach element and returns a new array
// const fitPokemon = pokemon.map(pokemon => pokemon.weight -= 5.0)
// console.log(fitPokemon)

/* Some */
// Returns true if array contains element that satisfies predicate
const containsNormalPokemon = pokemon.some(pokemon => pokemon.type === 'normal')
// console.log(containsNormalPokemon)

/* Every */
// Returns true if all elements satisfy predicate
const allAreNormalPokemon = pokemon.every(pokemon => pokemon.type === 'normal')
// console.log(allAreNormalPokemon)

/* Sort */
// Sorts elements according to a given predicate
// const fromFittestToFattest = pokemon.sort((p1, p2) => p1.weight - p2.weight)
// console.log(fromFittestToFattest)

/* Reduce */
// Reduce array to a single value
const totalFat = pokemon.reduce((accumulator, currentValue) => accumulator + currentValue.weight, 0)
// console.log(totalFat)
