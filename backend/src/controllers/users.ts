import { Router } from 'express'
import * as userEndpoints from '../routes/user' // imports all of the exported values of the module and sticks them in an object (userEndpoints)

const userRouter = Router()

userRouter.get('/', userEndpoints.getUsers)
userRouter.post("/", userEndpoints.createUser)
userRouter.get('/:id', userEndpoints.getUser)
userRouter.patch('/:id',userEndpoints.updateUser)
userRouter.delete('/:id', userEndpoints.deleteUser)

export default userRouter;