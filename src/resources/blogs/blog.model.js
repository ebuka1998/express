import mongoose from 'mongoose'
import Joi from 'joi'
import pick from 'lodash.pick'
import { join } from 'path'


const schema = {

    title: { type: String, required: true },

    body:  { type: String, required: true },

    createdBy:  { type: String },

    createdAt: { type: Date, default: Date.now() },

    likes: { type: Number, default: 0 },

    likedBy: { type: Array},

    dislikes: { type: Number, default: 0 },

    dislikedBy: { type: Array },

    comments: [
        {
            comment: { type: String },
            
            commentator: { type: String }
        }
    ]


}


const blogSchema = new mongoose.Schema(schema, { timestamps: true })


/* choosing what I want to send back to the backend * */
blogSchema.methods.toJSON = function () {
    let blogObject = this.toObject()
    return blogObject = pick(blogObject, ['_id', 'title', 'body', 'createdBy', 'likedBy', 'likes'])
}


export const Blog = mongoose.model('blog', blogSchema)

/**validation */
export function validateBlog(data) {
    const schema = Joi.object().keys({
        title: Joi.string().required().label('you must provide a title'),
        body: Joi.string().required().label('you must provide body'),
        createdBy: Joi.string().required().label('login first'),
        //likedBy: joi.Array().label('something went wrong')
    })
    return Joi.validate(data, schema)
}