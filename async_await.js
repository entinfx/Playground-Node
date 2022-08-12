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

function processData(data) {
    return new Promise((resolve, reject) => {
        const errorOccurred = false
        data += ', and more data!'

        if (errorOccurred) {
            reject('processData(): Error!')
        } else {
            resolve(data)
        }
    })
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
// * 'await' will process the resolve portion of the promise
// * All promise rejects will be caught in the catch block
async function testAsyncAwait() {
    try {
        const data = await getData()
        console.log(data)
        const processedData = await processData(data)
        console.log(processedData)
    } catch (error) {
        console.log(error)
    }
}

testAsyncAwait()