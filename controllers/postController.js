const BlogPost = require('../models/BlogPost');

module.exports = {
    async index(req, res, next) {
        try {
            console.log('fetching posts')
            const posts = await BlogPost.find()
            res.json(posts)
        } catch (error) {
            res.status(404).json(error)
        }
    },
    async show(req, res, next) {
        try {
            const post = await BlogPost.findOne({ _id: req.params.id })
            res.json(post)
        } catch (error) {
            res.status(404).json(error)
        }
    },
    async store(req, res, next) {
        try {
            const { title, tags, content } = req.body;
            console.log(title)
            const result = await BlogPost.create({ title: title, tags: tags, content: content })
            if (!result) {
                return res.status(404).json({
                    message: 'Error saving post',
                })
            }
            const post = await BlogPost.findOne({ _id: result._id })
            return res.status(200).json(post)

        } catch (error) {
            console.log(error)
        }
    },
    async destroy(req, res, next) {
        const _id = req.params.id
        try {
            const result = await BlogPost.deleteOne({ _id: _id })
            if (result.deletedCount === 1) {
                return res.status(200).json({ message: "Post deleted." })
            }
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}