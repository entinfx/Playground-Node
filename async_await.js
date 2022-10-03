const tick = Date.now()
const log = msg => { console.log(`${Date.now() - tick}: ${msg}`) }

function getData() {
    return new Promise((resolve, reject) => {
        const errorOccurred = false

        if (errorOccurred) {
            reject('Error: Could not get data.')
            return
        }

        resolve('Some cool data.')
    })
}

function processData(data) {
    return new Promise((resolve, reject) => {
        const errorOccurred = false

        if (errorOccurred) {
            reject('Error: Could not process data.')
            return
        }

        resolve(data + ' And more data!')
    })
}

// Run getData() and processData() using then/catch:
getData().then(data => {
    log('Received: ' + data)
    return processData(data)
}).then(processedData => {
    log('Processed: ' + processedData)
}).catch(error => {
    log(error)
})

// Run getData() and processData() using async/await:
// * 'async' sets up the context for 'await'
// * 'await' will wait for the resolved value of a promise and return that value
// * All promise rejects will be caught in the catch block
async function getProcessedData() {
    try {
        const data = await getData()
        log('Received: ' + data)
        const processedData = await processData(data)
        log('Processed: ' + processedData)
    } catch(error) {
        log(error)
    }
}
getProcessedData()

// * 'async' functions explicitly return a resolved promise:
async function resolvedPromise() {
    return 'Promise resolved to this String'
}
log(resolvedPromise())

// Use 'Promise.all' to await multiple promises concurrently:
async function getMoreData() {
    try {
        const data = getData()
        const moreData = getData()
        const allData = await Promise.all([data, moreData])

        return allData
    } catch (error) {
        log(error)
    }
}
getMoreData().then(allData => log(allData))

// Use 'Promise.resolve.then()' to run the entire code inside off the main
// thread. Using just 'return new Promise()' will run asynchronously only the
// resolve statement itself.
function timeConsumingFunc() {
    return Promise.resolve().then(msg => {
        let i = 0
        while (i < 1000000000) i++
        return log(`Time consuming function is done! (i = ${i})`)
    })
}
timeConsumingFunc()