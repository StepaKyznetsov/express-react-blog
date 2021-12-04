const blogService = require('../services/post-service')
const commentService = require('../services/comment-service')
const ApiError = require('../exceptions/api-error')

class BlogController{

    async getPersonalPosts(req, res, next){
        try {
            const {id} = req.params
            const personalPosts = await blogService.getPersonalPosts(id)
            return res.json(personalPosts)
        }
        catch (e) {
            next(e)
        }
    }
    async getPostById(req, res, next){
        try {
            const {id} = req.params
            const post = await blogService.getPostById(id)
            return res.json(post)
        }
        catch (e) {
            next(e)
        }
    }
    async getAllPosts(req, res, next){
        try{
            const posts = await blogService.getAllPosts()
            return res.json(posts)
        }
        catch (e) {
            next(e)
        }
    }
    async createPost(req, res, next){
        try{
            const {title, content} = req.body
            const {refreshToken} = req.cookies
            const post = await blogService.createPost(title, content, refreshToken)
            return res.json(post)
        }
        catch (e) {
            next(e)
        }
    }
    async updatePost(req, res, next){
        try{
            const {title, content} = req.body
            const {refreshToken} = req.cookies
            const {id} = req.params
            const post = await blogService.updatePost(title, content, id, refreshToken)
            return res.json(post)
        }
        catch (e) {
            next(e)
        }
    }
    async removePost(req, res, next){
        try{
            const {id} = req.params
            const {refreshToken} = req.cookies
            await blogService.removePost(id, refreshToken)
            return res.json('post was successfully removed')
        }
        catch (e) {
            next(e)
        }
    }
    async getPostsComments(req, res, next){
        try{
            const {id} = req.params
            const comments = await commentService.getPostsComments(id)
            if (!comments.length) return res.json('this post doesnt have comments')
            return res.json(comments)
        }
        catch (e) {
            next(e)
        }
    }
    async typeComment(req, res, next){
        try{
            const {content} = req.body
            if (!content.length) throw ApiError.BadRequest('comment should have at least 1 symbol')
            const {id} = req.params
            const {refreshToken} = req.cookies
            const comment = await commentService.typeComment(content, id, refreshToken)
            return res.json(comment)
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = new BlogController()