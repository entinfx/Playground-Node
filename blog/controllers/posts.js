const Post = require('../models/post')

function index(req, res) {
    // let posts

    // Post.find().sort({ createdAt: -1 })
    //     .then(result => {
    //         // res.send(result)
    //         posts = result
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })

    res.render('./posts/index', { title: 'All posts', Post })
}

function form(req, res) {
    res.render('./posts/form', { title: 'New post' })

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
}

function show(req, res) {
    // Post.findById(req.params.id)
    //     .then(post => {
    //         res.render('./posts/show', { title: post.title, post })
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })

    const post = Post[req.params.id]

    if (post) {
        res.render('./posts/show', { title: post.title, post })
    } else {
        res.status(404).render('./errors/404', { title: 'Not found' })
    }
}

function create(req, res) {
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
}

function destroy(req, res) {
    // Post.findByIdAndDelete(req.params.id)
    //     .then(() => {
    //         res.json({ redirect: '/posts' })
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })

    Post.splice(req.params.id, 1)
    res.json({ redirect: '/posts' })
}

module.exports = {
    index,
    form,
    show,
    create,
    destroy
}
