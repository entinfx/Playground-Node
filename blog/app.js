// Libraries imports
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

// Routes imports
const postRoutes = require('./routes/posts')
const staticRoutes = require('./routes/static')
const errorRoutes = require('./routes/errors')

// Express app
const app = express()

// Database (not implemented)
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

// View engine
app.set('view engine', 'ejs')

// Express server
app.listen(3000, () => {
    console.log('Listening on localhost:3000...')
})

// Middleware
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // allows to receive POST reqs

// Respond to requests
app.get('/', (req, res) => res.redirect('/posts'))
app.use('/posts', postRoutes)
app.use(staticRoutes)
app.use(errorRoutes)
