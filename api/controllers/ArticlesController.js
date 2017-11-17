/**
 * ArticlesController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list: function (req, res) {
        return Articles.find({}).exec((err, articles) => {
            if (err) res.send(500, { err: 'Database error' })
            res.view('articles/list', { articles })
        })
    },
    findArticles: (req, res) => {
        const id = req.params.id
        console.log(id)
        return Articles.findOne({ id }).exec((err, article) => {
            if (err) return res.send(500, { err: 'Database error: ' + err.message })
            return res.view('articles/view', { article })
        })
    },

    add: function (req, res) {
        return res.view('articles/add')
    },
    create: function (req, res) {
        const { title, body } = req.body

        return Articles.create({ title, body}).exec(err => {
            if (err) res.send(500, { err: 'Database error' })
            res.redirect('/articles/list')
        })
    },
    delete: function (req, res) {
        const id = req.params.id
        
        return Articles.destroy({ id }).exec(err => {
            if (err) res.send(500, { err: 'Database error' })
            res.redirect('/articles/list')
        })
    },
    edit: function (req, res) {
        const id = req.params.id
        return Articles.findOne({ id }).exec((err, article) => {
            if (err) res.send(500, { err: 'Database error' })
            return res.view('articles/edit', { article })
        })
    },
    update: function (req, res) {
        const id = req.params.id
        const article = req.body
        
        return Articles.update(id, article).exec((err, article) => {
            if (err) res.send(500, { err: 'Database error' })
            return res.redirect('/articles/list')
        })
    }
};

