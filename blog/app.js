// Set up Express
const express = require('express')
const app = express()

// Middleware imports
const morgan = require('morgan')

// View engine
app.set('view engine', 'ejs')

// Run server at localhost:3000
app.listen(3000, () => {
    console.log('Listening on localhost:3000...')
})

// Middleware
app.use(morgan('dev'))
app.use(express.static('public'))

// Respond to requests
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
})

app.get('/posts', (req, res) => {
    const posts = [
        { title: 'Post #1', body: 'Poggers post 1'},
        { title: 'Post #2', body: 'Poggers post 2'},
        { title: 'Post #3', body: 'Poggers post 3'}
    ]

    res.render('posts', { title: 'All posts', posts })
})

app.get('/posts/new', (req, res) => {
    res.render('new', { title: 'New post' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

// Runs if nothing else matched above
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' })
})
