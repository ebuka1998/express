import mongoose from 'mongoose'
import pick from 'lodash.pick'
import Joi from 'joi'


const schema = {
    title : {
        type: String,
        required: true,
        trim: true
    },

    description : {
        type: String,
        trim: true
    },

    author: {
        type: String,
        required: true
    },

    image: String,

    draft:{
        type: Boolean,
        default: false
    }
}

//creating the model
const shotSchema = new mongoose.Schema(schema, { timestamps : true })

/** choosing what I want to send back to the user */

shotSchema.methods.toJSON = function() {
    let shotObject = this.toObject()
    return shotObject = pick(shotObject, ['_id', 'title', 'description', 'author', 'image', 'draft'])
}

/** export the model */
export const Shot = mongoose.model('shot', shotSchema)


/** for validation */
export function validateShot(data) {
    const schema = Joi.object().keys({
        title: Joi.string().required().label('you must provide a title'),
        description: Joi.string(),
        author: Joi.required().label('you must be logged in to post a shot'),
    })
    return Joi.validate(data, schema)
}