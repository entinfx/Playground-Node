// Imports
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Post = require('./models/post')

// Express app
const app = express()

// Set up database (not implemented)
const mongoURI = 'URI to MongoDB'
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log(`Connected to MongoDB: ${result}`)

        app.listen(3000, () => {
            console.log('Listening on localhost:3000...')
        })
    })
    .catch((error) => {
        console.log(`Couldn't connect to MongoDB: ${error}`)
    })

// View engine for Express
app.set('view engine', 'ejs')

// Middleware (runs on every request)
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

    const post = new Post({
        title: '',
        body: ''
    })

    post.save()
        .then(result => {
            res.send(result)
        })
        .catch(error => {
            console.log(error)
        })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

// Runs if nothing else matched above
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' })
})
