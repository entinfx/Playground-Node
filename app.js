const express = require('express')
const app = express()

app.listen(3000)

// Once a request is sent to the browser, the rest of the file isn't executed
// until the next request is performed.
app.get('/', (req, res) => {
    // sendFile automatically sets header and status code
    res.sendFile('./views/index.html', { root: __dirname })
})

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname })
})

app.get('/about-us', (req, res) => {
    // redirect sets status code automatically
    res.redirect('/about')
})

// If no requests above matched, this middleware function fires
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname })
})