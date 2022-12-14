const tick = Date.now()
const log = msg => { console.log(`${Date.now() - tick}: ${msg}`) }

// The callback way
function doSomethingC1(errorCallback, dataCallback) {
    const errorOccurred = true

    if (errorOccurred) {
        errorCallback('Error!')
    } else {
        dataCallback('Some cool data')
    }
}

// doSomethingC1(error => {
//     console.log(error)
// }, data => {
//     console.log(data)
// })

// Another callback way
function doSomethingC2(callback) {
    const errorOccurred = true

    if (errorOccurred) {
        callback('Error!', null)
    } else {
        callback(null, 'Some cool data')
    }
}

// doSomethingC2((error, data) => {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log(data)
//     }
// })

// The promise way
function doSomethingP() {
    return new Promise((resolve, reject) => {
        const errorOccurred = true

        if (errorOccurred) {
            reject('Error!')
        } else {
            resolve('Some cool data')
        }
    })
}

// doSomethingP()
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((error) => {
//         console.log(error)
//     })

// Promise.all() allows to run multiple promises concurrently, instead of
// waiting for each to finish before the next one starts:
const promiseA = new Promise((resolve, reject) => {
    resolve('Promise A')
})

const promiseB = new Promise((resolve, reject) => {
    resolve('Promise B')
})

const promiseC = new Promise((resolve, reject) => {
    resolve('Promise C')
})

Promise.all([
    promiseA,
    promiseB,
    promiseC
]).then(msg => console.log(msg))

// Promise.race() returns as soon as the first promise is done:
Promise.race([
    promiseA,
    promiseB,
    promiseC
]).then(msg => console.log(msg))

// Use 'Promise.resolve.then()' to run the entire code inside off the main
// thread. Using just 'return new Promise()' will run asynchronously only the
// resolve statement itself.
function timeConsumingFunc() {
    return Promise.resolve().then(_ => {
        let i = 0
        while (i < 1000000000) i++
        return log(`Time consuming function is done! (i = ${i})`)
    })
}
timeConsumingFunc()