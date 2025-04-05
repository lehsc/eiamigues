import {Router} from 'express'
import * as postsService from '../controllers/post.js'
const postRouter = Router()
postRouter.get('/:id?/:offset?', postsService.getPosts)
postRouter.get('/:id', postsService.getPost)
postRouter.get('/posts/:id/:page?', postsService.getPost)
postRouter.post('/', postsService.createPost)
postRouter.patch('/:id',postsService.updatePost)
postRouter.delete('/:id', postsService.deletePost)
export default postRouter;