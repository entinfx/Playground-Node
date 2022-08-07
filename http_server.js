const http = require('http')
const fs = require('fs')

// const server = http.createServer()
// server.on('connection', (arg) => {
//     console.log('Server received a request.', arg)
// })

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')
    let path = './views/'

    switch (req.url) {
        case '/':
            res.statusCode = 200
            path += 'index.html'
            break
        case '/home':
            res.statusCode = 301 // HTTP 301 - moved permanently
            res.setHeader('Location', '/') // sends another GET request to /
            res.end()
            break
        case '/about':
            res.statusCode = 200
            path += 'about.html'
            break
        default:
            res.statusCode = 404
            path += '404.html'
    }

    fs.readFile(path, (error, data) => {
        if (error) {
            res.write(error)
        } else {
            res.write(data)
        }

        res.end()
    })
})

server.listen(3000, 'localhost', () => {
    console.log('Listening on localhost:3000')
})
