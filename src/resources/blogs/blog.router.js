import express from 'express'
import blogController from './blog.controller'


export const blogRouter = express.Router()


//blogRouter.post('/createblog', blogController.createBlog)

blogRouter.get('/', blogController.getBlogs)

blogRouter.get('/:id', blogController.getBlog)

blogRouter.put('/:id', blogController.updateBlog)

