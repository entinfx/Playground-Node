// Set up Express
const express = require('express')
const app = express()

// Use EJS as view engine
app.set('view engine', 'ejs')

// Run server at localhost:3000
app.listen(3000, () => {
    console.log('Listening on localhost:3000...')
})

// Respond to requests
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

// Runs if nothing else matched above
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' })
})
