const Router = require('express')
const BlogController = require('../controllers/blog-controller')
const authMiddleware = require('../middleware/auth-middleware')

const blogRouter = new Router()

blogRouter.get('', BlogController.getAllPosts)
blogRouter.get('/:id', BlogController.getPostById)
blogRouter.get('/:id/comments', BlogController.getPostsComments)
blogRouter.get('/personal/:id', BlogController.getPersonalPosts)
blogRouter.post('/my/create', authMiddleware, BlogController.createPost)
blogRouter.post('/:id/type-comment', authMiddleware, BlogController.typeComment)
blogRouter.put('/my/update/:id', authMiddleware, BlogController.updatePost)
blogRouter.delete('/my/remove/:id', authMiddleware, BlogController.removePost)

module.exports = blogRouter