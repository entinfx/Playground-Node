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