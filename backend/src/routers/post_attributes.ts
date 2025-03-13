import { Router } from "express"
import { getPostAttributes, getPostAttribute, createPostAttribute, updatePostAttribute , deletePostAttribute } from "../services/post_attribute"
import { PostAttributes } from "../models/post_attributes"

const postAttribRouter = Router()

postAttribRouter.get('/', async (req, res) => {
    try {
        const postAttrib =  await getPostAttributes()
        res.json(postAttrib).status(200)
    } catch (error) {
        res.json({msg: error})
    }
})

postAttribRouter.get('/:id', async (req, res) => {
    try {
        if (req.params.id){
            if (!isNaN(parseInt(req.params.id))){
                const post =  await getPostAttribute(Number(req.params.id))
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

postAttribRouter.post('/', async (req, res) => {
    try {
        const post = req.body as PostAttributes
        const id = await createPostAttribute(post)
        res.json({id}).status(201)
    } catch (error) {
        res.json({msg: error})
    }
})

postAttribRouter.patch('/:id', async (req, res) => {
    try {
        if (req.params.id){
            if (!isNaN(parseInt(req.params.id))){
                const data = req.body as PostAttributes
                const id = Number(req.params.id)
                data.id = id;
                await updatePostAttribute(data)
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

postAttribRouter.delete('/:id', async (req, res) => {
    try {
        if (req.params.id){
            if (!isNaN(parseInt(req.params.id))){
                const result = await deletePostAttribute(Number(req.params.id))
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

export default postAttribRouter