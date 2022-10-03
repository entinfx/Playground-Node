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
    console.log('Received: ' + data)
    return processData(data)
}).then(processedData => {
    console.log('Processed: ' + processedData)
}).catch(error => {
    console.log(error)
})

// Run getData() and processData() using async/await:
// * 'async' sets up the context for 'await'
// * 'await' will wait for the resolved value of a promise and return that value
// * All promise rejects will be caught in the catch block
async function getProcessedData() {
    try {
        const data = await getData()
        console.log('Received: ' + data)
        const processedData = await processData(data)
        console.log('Processed: ' + processedData)
    } catch(error) {
        console.log(error)
    }
}
getProcessedData()

// * 'async' functions explicitly return a resolved promise:
async function resolvedPromise() {
    return 'Promise resolved to this String'
}
console.log(resolvedPromise())

// Use 'Promise.all' to await multiple promises concurrently:
async function getMoreData() {
    try {
        const data = getData()
        const moreData = getData()
        const allData = await Promise.all([data, moreData])

        return allData
    } catch (error) {
        console.log(error)
    }
}

console.log(getMoreData())
