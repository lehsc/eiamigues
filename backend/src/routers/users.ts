import {Router} from 'express'
import * as userEndpoints from '../controllers/user'
const userRouter = Router()

userRouter.get('/', userEndpoints.getUsers)
userRouter.post("/", userEndpoints.createUser)
userRouter.get('/:id', userEndpoints.getUser)
userRouter.patch('/:id',userEndpoints.updateUser)
userRouter.delete('/:id', userEndpoints.deleteUser)

export default userRouter;