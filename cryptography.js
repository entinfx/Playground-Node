/* Hash */
//
// Properties:
// * Produces a fixed length meaningless representation of an input
// * Always produces the same output given the same input
// * Cannot be easily reversed
//
// Use:
// * Storing data without knowing it's true value (e.g. passwords). If the DB is
//   hacked, the hacker won't be able to use the passwords because they are
//   encrypted.
//
const { createHash, timingSafeEqual } = require('crypto')

function hash(password) {
    return createHash('sha256').update(password).digest('hex')
}

const hashedPassword = hash('qwerty12345')

console.log(`Original password: ${'qwerty12345'}`)
console.log(`Hashed password: ${hashedPassword}`)


/* Salt */
//
// Many common passwords' hash values are pre-calculated, stored in 'rainbow'
// tables and can be looked up by an attacker. A salt is a random value added to
// the input before it's hashed, so that the hash can't be looked up. It is
// important to store the salt with the hash in the database.
//
const { scryptSync, randomBytes } = require('crypto')
let users = []

function hashSalted(password, salt) {
    const hashedSaltedPassword = scryptSync(password, salt, 64).toString('hex')
    return hashedSaltedPassword
}

function signup(name, password) {
    const salt = randomBytes(16).toString('hex')
    const user = { name, password: `${salt}:${hashSalted(password, salt)}` }
    users.push(user)
}

signup('Booba', 'qwerty12345')

function login(name, providedPassword) {
    const user = users.find(u => u.name === name)

    if (!user) {
        console.log('User not found')
        return
    }

    const [storedSalt, storedPassword] = user.password.split(':')

    // To prevent Timing Attacks, check if stored and just created hashes match
    // by using 'timingSafeEqual()':
    const providedPasswordBuffer = Buffer.from(hashSalted(providedPassword, storedSalt), 'hex')
    const storedPasswordBuffer = Buffer.from(storedPassword, 'hex')
    const match = timingSafeEqual(providedPasswordBuffer, storedPasswordBuffer)

    if (match) {
        console.log('Access Granted!')
    } else {
        console.log('Access Denied!')
    }
}

login('Booba', 'qwerty12345')


/* HMAC - Hash-based Message Authentication Code */
//
// It is a hash function that requires a password. In order to create the same
// hash signature, the same password must be used.
//
// Example: JWT (JSON Web Token) for authentication on the web. When a user logs
// in on a server, the server generates a token with the user's key. The client
// and the server can pass the token back and forth. The server gains trust to
// the token because it knows that only someone that knows the key can generate
// the correct hash (token).
//
const { createHmac } = require('crypto')

// const key = 'super secret key'
// const message = 'super important message'

// const hmac = createHmac('sha256', key).update(message).digest('hex')
// console.log(hmac) // hmac is only the same if the key/password is the same


/* Symmetric encryption */
//
// Encrypting and decrypting a message with a key. Symmetric encryption shares
// the same password for encrypting and decrypting a message.
//
const { createCipheriv, createDecipheriv } = require('crypto')

// const message = 'super important message'
// const key = randomBytes(32)
// const iv = randomBytes(16) // init. vector - prevents ident. sequences of text

// Encrypt:
// You can encrypt multiple messages with the same cipher, as long as
// 'cipher.final()' hasn't been called.
// const cipher = createCipheriv('aes256', key, iv)
// const cipherText = cipher.update(message, 'utf-8', 'hex')
                //    + cipher.final('hex') // encrypted message

// Decrypt:
// const decipher = createDecipheriv('aes256', key, iv)
// const decryptedMessage = decipher.update(cipherText, 'hex', 'utf-8')
                        //  + decipher.final('utf-8') // decrypted message

// console.log(decryptedMessage)


/* Assymmetric encryption */
//
// Use:
// * Encrypting and decrypting a message with a set of public and private keys.
// * Signing a message to prove authenticity of sender.
//
// Encryption example: HTTPS websites with SSL certificates. Browser sends data encrypted
// with a public key of the website's certificate, and the server decrypts the
// data with a its private key.
//
const { generateKeyPairSync } = require('crypto')
const { publicEncrypt, privateDecrypt } = require('crypto')

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        // cipher: 'aes-256-cbc',
        // passphrase: 'unlock plz'
    }
})

const message = 'top secret message plz dont hack thx'
const encryptedMessage = publicEncrypt(publicKey, Buffer.from(message))
const decryptedMessage = privateDecrypt(privateKey, encryptedMessage)
console.log(decryptedMessage.toString('utf-8'))

// Signing example:
//
const { createSign, createVerify } = require('crypto')
// Sign:
const signer = createSign('rsa-sha256')
signer.update(message)
const signature = signer.sign(privateKey, 'hex')
// Verify:
const verifier = createVerify('rsa-sha256')
verifier.update(message)
const messageIsLegit = verifier.verify(publicKey, signature, 'hex') // => true
