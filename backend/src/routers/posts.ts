import {Router} from 'express'
import * as postsService from '../controllers/post'
const postRouter = Router()
postRouter.get('/:id?/:offset?', postsService.getPosts)
postRouter.get('/:id', postsService.getPost)
postRouter.post('/', postsService.createPost)
postRouter.patch('/:id',postsService.updatePost)
postRouter.delete('/:id', postsService.deletePost)
export default postRouter;