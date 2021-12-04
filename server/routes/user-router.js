const Router = require('express')
const UserController = require('../controllers/user-controller')
const validator = require('express-validator')
const authMiddleware = require('../middleware/auth-middleware')

const userRouter = new Router()

userRouter.post('/registration',
    validator.body('email').isEmail(),
    validator.body('password').isLength({min: 3, max: 20}),
    validator.body('name').isLength({min: 3, max: 12}).isString(),
    UserController.registration)
userRouter.post('/login', UserController.login)
userRouter.get('/refresh', authMiddleware, UserController.refresh)
userRouter.post('/logout',authMiddleware, UserController.logout)
userRouter.get('/users', UserController.getAllUsers)
userRouter.get('/:id', UserController.getUserById)


module.exports = userRouter