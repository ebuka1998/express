import express from 'express'
import shotController from './shot.controller'

export const shotRouter = express.Router()


shotRouter.get('/', shotController.getShots)

shotRouter.put('/:id', shotController.updateShot)

shotRouter.get('/:id', shotController.getShot)

shotRouter.delete('/:id', shotController.deleteShot)