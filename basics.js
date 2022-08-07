/* Module system */
// Every file that exports objects is called a module.
// 'global' object represents global scope.
// 'module' object represents current file.

/* Module Wrapper Function */
// Every module is implicitly wrapped in a function:
// function (exports, require, module, __filename, __dirname) { module code }
// 'require' is just a parameter of this function, and not a global function.

/* Path module */
const path = require('path')
const pathObject = path.parse(__filename)
console.log(pathObject)

/* File System */
const fs = require('fs')

// Create a folder
if (fs.existsSync('./test_folder')) {
    console.log('Folder already exists')
} else {
    console.log('Folder doesn\'t exist. Creating folder...')

    fs.mkdir('./test_folder', error => {
        if (error) {
            console.log(error)
        } else {
            console.log('Folder created successfully')
        }
    })
}

// Read a file
fs.readFile('./test_folder/file.txt', (error, file) => {
    if (error) {
        console.log(error)
        console.log('File doesn\'t exist. Creating file...')

        fs.writeFile('./test_folder/new_file.txt', 'Hello, World!', () => {
            console.log('File written successfully')
        })
    } else {
        console.log('File already exists')
        console.log(file)
    }
})

// Reading a directory (list files and directories)
fs.readdir('./', function(error, files) {
    if (error) {
        console.log(error)
    } else {
        console.log(files)
    }
})

// Read/write file stream
const readStream = fs.createReadStream('./test_folder/new_file.txt', { encoding: 'utf8' })
const writeStream = fs.createWriteStream('./test_folder/another_file.txt')

readStream.on('data', (chunk) => {
    console.log(chunk)
    writeStream.write(chunk)
}) // or:

readStream.pipe(writeStream)

/* Events module (see logger.js) */
const Logger = require('./logger')
const logger = new Logger()
const eventName = 'someEvent'

// Listen for an event
logger.on(eventName, (arg) => {
    /* Code to execute when an event occurs */
    console.log('An event happened.', arg)
})

// Fire an event
logger.log('someEvent', '#')
