const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)
// module.exports = Post 

// MongoDB is not implemented, exporting object array instead to fake it
module.exports = [
    { id: 0, title: 'Post #1', body: 'Post #1 is rather poggers!' },
    { id: 1, title: 'Post #2', body: 'Post #2 is rather poggers!' },
    { id: 2, title: 'Post #3', body: 'Post #3 is rather poggers!' }
]
