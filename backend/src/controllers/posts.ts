import { Router } from "express"
import { getPosts, getPost, createPost, updatePost , deletePost } from "../services/post"
import { Posts } from "../models/posts"

const postRouter = Router()

postRouter.get('/', async (req, res) => {
    try {
        const posts =  await getPosts()
        res.json(posts).status(200)
    } catch (error) {
        res.json({msg: error})
    }
})

postRouter.get('/:id', async (req, res) => {
    try {
        if (req.params.id){
            if (!isNaN(parseInt(req.params.id))){
                const post =  await getPost(Number(req.params.id))
                res.json(post).status(200)
            } else{
                res.json({msg: "id not provided"}).status(400)
                return
            }
        } else{
            res.json({msg: "id not provided"}).status(400)
            return
        }
        
    } catch (error) {
        res.json({msg: error})
    }
})

postRouter.post('/', async (req, res) => {
    try {
        const post = req.body as Posts
        const id = await createPost(post)
        res.json({id}).status(201)
    } catch (error) {
        res.json({msg: error})
    }
})

postRouter.patch('/:id', async (req, res) => {
    try {
        if (req.params.id){
            if (!isNaN(parseInt(req.params.id))){
                const data = req.body as Posts
                const id = Number(req.params.id)
                data.id = id;
                await updatePost(data)
                res.json({id}).status(200)
                return
            }

            res.json({msg: "id not provided"}).status(400)
            return
        }

        res.json({msg: "id not provided"}).status(400)
        return
        
    } catch (error) {
        res.json({msg: error})
    }
})

postRouter.delete('/:id', async (req, res) => {
    try {
        if (req.params.id){
            if (!isNaN(parseInt(req.params.id))){
                const result = await deletePost(Number(req.params.id))
                res.json({isDeleted: result}).status(200)
                return
            }

            res.json({msg: "id not provided"}).status(400)
            return
        }

        res.json({msg: "id not provided"}).status(400)
        return

        
    } catch (error) {
        res.json({msg: error})
    }
})

export default postRouter