const User = require('../models/user')

function signupForm(req, res) {
    res.render('./users/form', { title: 'Sign Up', signup: true })
}

function loginForm(req, res) {
    res.render('./users/form', { title: 'Log In', signup: false })
}

function signup(req, res) {
    const { scryptSync, randomBytes } = require('crypto')

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    const salt = randomBytes(16).toString('hex')
    const passwordHash = scryptSync(password, salt, 64).toString('hex')

    User.push({
        id: User.length,
        name,
        email,
        passwordHash: `${salt}:${passwordHash}`
    })
}

function login(req, res) {
    const { scryptSync, timingSafeEqual } = require('crypto')

    const email = req.body.email
    const providedPassword = req.body.password
    const user = User.find(u => u.email === email )

    if (!user) {
        console.log(`User not found`)
        return
    }

    const [storedSalt, storedPasswordHash] = user.passwordHash.split(':')
    const providedPasswordHash = scryptSync(providedPassword, storedSalt, 64)
    const match = timingSafeEqual(providedPasswordHash, Buffer.from(storedPasswordHash, 'hex'))

    if (match) {
        console.log('Welcome back!')
    } else {
        console.log('Incorrect login data!')
    }
}

module.exports = {
    signupForm,
    loginForm,
    signup,
    login
}
