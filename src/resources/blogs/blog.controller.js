import { validateBlog, Blog } from "./blog.model"
import pick from 'lodash.pick'
import { User } from "../users/user.model"
import config from "../../config"

const blogController = {

    async createBlog (req, res)  {
        const { error } = validateBlog(req.body)
        if(error) {
            return res.status(400).send( error.details[0].message )
        }

        //creating the blog
        let blog = new Blog(pick(req.body, ['title', 'body', 'createdBy']))

        try {
            await blog.save()
            res.status(201).send(blog)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async getBlogs (req, res) {
        try {
            const result = await Blog.find().sort({'createdAt': -1})
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error)
        }
    },


    async getBlog (req, res) {
        try {
            const blog = await Blog.findById(req.params.id)
            if(!blog) {
                return res.status(400).send('blog not found')
            }
            res.status(200).send(blog)
        } catch (error) {
            res.status(404).send(error)
        }
    },


    async updateBlog (req, res)  {
        try {
            const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).send(blog)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    //controller for liking the blog post

    async likeBlog (req, res) {

          try {
            const blog = await Blog.findById( req.body._id )

            const user = await User.findById({user: req.user.username})

           /* if(user.username === blog.createdBy) {
                return res.status(400).send('you cannot like your own post')
            }

           /*if(blog.likedBy.includes(user.username)) {
                return res.json({success: false, message: 'you have already liked this post'})
            }*/

            if(blog.dislikedBy.includes(user.username)) {
                blog.dislikes--
                const arrayIndex = blog.dislikedBy.indexOf(user.username)
                blog.dislikedBy.splice(arrayIndex, 1)
                blog.likes++
                blog.likedBy.push(user.username)

                await blog.save()

                res.json({success: true, message: 'blog liked'})
            } else {

                blog.likes++
                blog.likedBy.push(user.username)

                await blog.save()

                res.json({success: true, message: 'blog liked'})   
            }
        } catch (error) {
             res.status(400).send(error)
        }
    },



    async dislikeBlog (req, res) {
        try {
            const blog = await Blog.findById(  req.body._id )

            const user = await User.findOneAndUpdate(  req.body._id )

            if(user._id === blog.createdAt) {
                return res.status(400).send('you cannot dislike your own post')
            }

            if(blog.dislikedBy.includes(user.username)) {
                return res.json({success: false, message: 'you have already disliked this post'})
            }

            if(blog.likedBy.includes(user.username)) {
                blog.likes--;
                const arrayIndex = blog.likedBy.indexOf(user.username)
                blog.likedBy.splice(arrayIndex, 1)
                blog.dislikes++
                blog.dislikedBy.push(user.username)

                await blog.save()

                res.json({success: true, message: 'blog disliked'})
            } else {

                blog.dislikes++
                blog.likedBy.push(user.username)

                await blog.save()

                res.json({success: true, message: 'blog disliked'})   
            }
        } catch (error) {
             res.status(401).send(error)
        }
    }










}


export default blogController