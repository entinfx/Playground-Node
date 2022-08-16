function notFound(req, res) {
    res.status(404).render('./errors/404', { title: 'Not found' })
}

module.exports = {
    notFound
}
