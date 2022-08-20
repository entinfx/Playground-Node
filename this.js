const pikachu = {
    name: 'Pikachu',
    type: 'electric',
    delay: 3000,

    attack() {
        console.log(this.name + ' attacks') // 'this' points to 'pikachu'
    },

    say(phrase) {
        // In a normal function 'this' will bind to 'setTimeout'
        setTimeout(function() {
            console.log(`${this.name} said ${phrase}`)
        }, this.delay)

        // In an arrow function 'this' will bind to 'pikachu'
        setTimeout(() => {
            console.log(`${this.name} said ${phrase}`)
        }, this.delay)
    }
}

const attack = pikachu.attack
// attack() // 'this' has global context now, to bind it back to an object do:
const pikachuAttacks = attack.bind(pikachu)
// pikachuAttacks() // 'this' now points to the 'pikachu' object again

pikachu.say('yoo dude how u doin')
