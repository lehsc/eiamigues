import * as postsService from '../services/post.js'
import { Request, Response } from 'express'
import { Filters } from '../types/response.js'
import { Posts } from '../models/posts.js'
export const getPosts = async (req: Request<Partial<Filters>, {}, {}>, res: Response) => {
 try {
        const posts =  await postsService.getPosts(req.params)
        res.json(posts).status(200)
    } catch (error) {
        res.json({msg: error})
    }
}


export const getPost = async (req: Request<Required<{id: number}>, {}, {}>, res: Response) => {
    try {
           const posts =  await postsService.getPost(req.params.id)
           res.json(posts).status(200)
       } catch (error) {
           res.json({msg: error})
       }
}

export const getUserPosts = async(req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
}

export const createPost = async(req: Request<{}, Posts>, res: Response) => {
    try {
        const id = await postsService.createPost(req.body)
        res.json({id}).status(201)
    } catch (error) {
        res.json({msg: error})
    }
}


export const updatePost = async(req: Request<{id: number}, Posts>, res: Response) => {
    try {
        if (req.params.id){
                const data = req.body as Posts
                const id = Number(req.params.id)
                data.id = id;
                await postsService.updatePost(data)
                res.json({id}).status(200)
                return
            }

            res.json({msg: "id not provided"}).status(400)
            return
        }
    catch (error) {
        res.json({msg: error})
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        if (req.params.id){
            if (!isNaN(parseInt(req.params.id))){
                const result = await postsService.deletePost(Number(req.params.id))
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
}
