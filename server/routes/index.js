const Router = require('express')
const blogRouter = require('./blog-router')
const userRouter = require('./user-router')

const router = new Router()

router.use('/user', userRouter)
router.use('/blog', blogRouter)

module.exports = router