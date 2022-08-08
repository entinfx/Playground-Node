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
    res.render('index', { title: 'Home' })
})

app.get('/blogs', (req, res) => {
    const posts = [
        { title: 'Blog #1', body: 'Poggers blog 1'},
        { title: 'Blog #2', body: 'Poggers blog 2'},
        { title: 'Blog #3', body: 'Poggers blog 3'}
    ]

    res.render('blogs', { title: 'All posts', posts })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'New post' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

// Redirects
// app.get('/', (req, res) => {
//     res.redirect('/blogs')
// })

// 404: Not found - if no requests above matched, this middleware function fires
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' })
})
