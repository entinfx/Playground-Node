function about(req, res) {
    res.render('./static/about', { title: 'About' })
}

module.exports = {
    about
}
