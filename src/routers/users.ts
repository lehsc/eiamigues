import {Router} from 'express'
import * as userEndpoints from '../controllers/user.js'
const userRouter = Router()

userRouter.get('/', userEndpoints.getUsers)
userRouter.post("/", userEndpoints.createUser)
userRouter.get('/:id', userEndpoints.getUser)
userRouter.get('/:id/posts', userEndpoints.getUserPosts)
userRouter.patch('/:id',userEndpoints.updateUser)
userRouter.delete('/:id', userEndpoints.deleteUser)

export default userRouter;