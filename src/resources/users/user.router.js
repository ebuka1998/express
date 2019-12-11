import express from 'express'
import userController from './user.controller'
export const userRouter = express.Router()

//userRouter.get('/', (req, res) => res.send('user list'))

//userRouter.post('/', userController.createUser)

userRouter.get('/', userController.getUsers)

userRouter.put('/:id', userController.updateUser)

userRouter.delete('/:id', userController.deleteUser)

userRouter.get('/:id', userController.getProfile)

/*userRouter.get('/:id', (req, res) => {
    res.send(`user id is ${req.params.id}`)
})*/