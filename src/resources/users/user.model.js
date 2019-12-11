import mongoose from 'mongoose'
import pick from 'lodash.pick'
import bcrypt from 'bcryptjs' //this is for hashing password
import Joi from 'joi' // this is for validation
import jwt from 'jsonwebtoken'
import devConfig from '../../config/dev'

/* create schema* */
const schema = {
    email: {
        type: String,
        required: [true, 'please enter your email'],
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: [true, 'please enter your password'],
        trim: true,
        minlength: 6
    },

    username: {type: String, trim: true},
    photoURL: String,
    bio: String,
    url: String,
    isAdmin: Boolean
}

/* create the model* */
const userSchema = new mongoose.Schema(schema, { timestamps : true })

/* hash password before saving * */
userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } else {
        next()
    }
})

/** choose user data to send back to the client  **/
userSchema.methods.toJSON = function() {
    let userObject = this.toObject()
    return pick(userObject, ['_id', 'email', 'username', 'photoURL', 'bio', 'url'])
}

//registration/ sign in
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        {_id: this._id, isAdmin: this.isAdmin },
        devConfig.secrets.JWT_SECRET
    )
    return token
}

/* export the model* */
export const User = mongoose.model('user', userSchema)

/** for validation */
export function validateUser(data) {
    const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        username: Joi.string().required().min(6),
        password: Joi.string().required().min(6)
    })
    return Joi.validate(data, schema)
}