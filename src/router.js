import express from 'express'
import { userRouter } from './resources/users/user.router'
import userController from './resources/users/user.controller'
import { shotRouter } from './resources/shots/shot.router'
import shotController from './resources/shots/shot.controller'
import { authorization, authorize } from './middlewares'
import { blogRouter } from './resources/blogs/blog.router'
import blogController from './resources/blogs/blog.controller'
export const router = express.Router()

router.get('/', (req, res) => res.send('Home page'))

router.get('/about', (req, res) => res.send('about page'))

//router.get('/signin', (req, res) => res.send('sign in page'))
router.post('/signup', userController.createUser )

router.post('/signin', userController.signIn)

router.post('/createblog', blogController.createBlog)

router.get('/me', authorize, userController.getDashboard)

router.post('/createshot', shotController.createShot)

router.use('/shots', shotRouter)

//for likes and dislikes
router.put('/likeBlog', blogController.likeBlog)

router.put('/dislikeBlog', blogController.dislikeBlog)



router.use('/blogs', blogRouter)

router.use('/users', userRouter)