// Imports
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Post = require('./models/post') // [MongoDB isn't implemented]

// Express app
const app = express()

// Set up database (not implemented)
const mongoURI = 'URI to MongoDB'

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((result) => {
//         console.log(`Connected to MongoDB: ${result}`)

//         app.listen(3000, () => {
//             console.log('Listening on localhost:3000...')
//         })
//     })
//     .catch((error) => {
//         console.log(`Couldn't connect to MongoDB: ${error}`)
//     })

// View engine for Express
app.set('view engine', 'ejs')

// Run Express server
app.listen(3000, () => {
    console.log('Listening on localhost:3000...')
})

// Middleware (runs on every request)
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // allows to receive POST reqs

// Respond to requests
app.get('/', (req, res) => {
    // res.render('index', { title: 'Home' })
    res.redirect('/posts')
})

app.get('/posts', (req, res) => {
    // let posts

    // Post.find().sort({ createdAt: -1 })
    //     .then(result => {
    //         // res.send(result)
    //         posts = result
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })

    res.render('posts', { title: 'All posts', Post })
})

app.get('/posts/:id', (req, res) => {
    // Post.findById(req.params.id)
    //     .then(post => {
    //         res.render('post', { title: post.title, post })
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })

    const post = Post[req.params.id]

    if (post) {
        res.render('post', { title: post.title, post })
    } else {
        res.status(404).render('404', { title: 'Not found' })
    }
})

app.get('/post/new', (req, res) => {
    res.render('new', { title: 'New post' })

    // const post = new Post({
    //     title: '',
    //     body: ''
    // })

    // post.save()
    //     .then(result => {
    //         res.send(result)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
})

app.post('/posts', (req, res) => {
    // const post = new Post(req.body)

    // post.save()
    //     .then(result => {
    //         res.redirect('/posts')
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })

    Post.push({
        id: Post.length,
        title: req.body.title,
        body: req.body.body
    })

    res.redirect('/posts')
})

app.delete('/posts/:id', (req, res) => {
    // Post.findByIdAndDelete(req.params.id)
    //     .then(() => {
    //         res.json({ redirect: '/posts' })
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })

    Post.splice(req.params.id, 1)
    res.json({ redirect: '/posts' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

// Runs if nothing else matched above
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not found' })
})
