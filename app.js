const express = require('express')
const app = express()

// Use EJS as a View Engine
app.set('view engine', 'ejs')
// EJS automatically looks for views in the ./views folder. To use another
// folder use the following
// app.set('views', 'my-views')

// Listen for requests on localhost:3000
app.listen(3000, () => {
    console.log('Express: listening on localhost:3000...')
})

// Once a request is sent to the browser, the rest of the file isn't executed
// until the next request is performed.
app.get('/', (req, res) => {
    // sendFile automatically sets header and status code
    // res.sendFile('./views/index.html', { root: __dirname })
    res.render('index')
})

app.get('/blogs/create', (req, res) => {
    res.render('create')
})

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', { root: __dirname })
    res.render('about')
})

// Redirects
// app.get('/about-us', (req, res) => {
//     // redirect sets status code automatically
//     res.redirect('/about')
// })

// 404: Not found - if no requests above matched, this middleware function fires
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname })
    res.status(404).render('404')
})
