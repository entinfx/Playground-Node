function getData() {
    return new Promise((resolve, reject) => {
        const errorOccurred = false

        if (errorOccurred) {
            reject('getData(): Error!')
        } else {
            resolve('Some cool data')
        }
    })
}

// We can also use the 'async' keyword to make the function return a resolved
// promise of a value it's returning
async function processData(data) {
    data += ', and more data!'
    return data
}

// Without async await
// getData()
//     .then(data => {
//         console.log(data)
//         return processData(data)
//     })
//     .then(processedData => {
//         console.log(processedData)
//     })
//     .catch(error => {
//         console.log(error)
//     })

// With async await
// * 'async' makes the function's return value a promise resolved to that value
// * 'async' also sets up a context to use 'await'
// * 'await' will wait for the resolved value of a promise and return that value
// * All promise rejects will be caught in the catch block
async function testAsyncAwait() {
    try {
        // Multiple awaits in a row will make them wait for each other:
        // const data = await getData()
        // const moreData = await getData()

        // to run them concurrently, group them into a single promise and await
        const data = getData()
        const moreData = getData()
        const allData = await Promise.all([data, moreData])

        return allData
    } catch (error) {
        console.log(error)
    }
}

testAsyncAwait()