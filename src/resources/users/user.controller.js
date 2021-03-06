import { User, validateUser } from './user.model'
import pick from 'lodash.pick' 
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import devConfig from '../../config/dev'
import config from '../../config'

/** create the user controller */
const userController = {

     async signIn(req, res) {
        //checking for valid details
        const { error } = validateUser(req.body) 
        if(error) {
            return res.status(400).send(error.details[0].message)
        }

        /* check if user exist */
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(400).send('invalid email or password')
        
        /**decode hashed password and compare password */
        const password =  bcrypt.compare(req.body.password, user.password)
        if(!password) { return res.status(400).send('invalid password or email') }

        //create and assign a token
        const token = jwt.sign({_id: user._id}, config.secrets.JWT_SECRET)

        res.header('auth-token', token).send({success: true, token: token, user: user}) 
        
    },



    async createUser(req, res)  {
          
            //checking for valid details
            const { error } = validateUser(req.body) 
            if(error) {
                return res.status(400).send(error.details[0].message)
            }

            //checking if email exists in the database
            const emailExist = await User.findOne({email: req.body.email})
            if(emailExist) return res.status(400).send( {message: 'email already exist'})

            let user = new User(pick(req.body, ['email', 'password', 'username']))
                try {
                    await user.save()
                    res.status(201).json({ success: true, message: 'account created', user: user })

            } catch (error) {
                res.status(400).send(error)
            }
                 
    },

    async getUsers(req, res)  {
        try {
            const result = await User.find().sort('createdAt')
            res.status(200).send(result)

        } catch (error) {
            res.status(400).send(error)
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new : true })
            res.status(200).send(user)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.deleteOne({_id: req.params.id})
            res.status(200).send(user)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async getProfile(req, res) {
        try {
            const user = await User.findById(req.params.id)
            if(!user) {
                return res.status(404).send('user not found')
            }
            res.status(200).send(user)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async getDashboard(req, res) {
        try {
           const user = await User.findById(req.user._id)
            res.status(200).send(user)
        } catch (error) {
            res.status(400).send(error)
        }
    }

}

export default userController