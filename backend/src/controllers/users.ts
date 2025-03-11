import express, {Express, Request, Response, Router} from 'express'
import { getUsers, getUser, createUser, deleteUser, updateUser } from '../services/user'
import { Users } from '../models/users'

const userRouter = Router()

userRouter.get('/', async (req, res) => {
    try {
        const users = await getUsers()
        res.json(users).status(200)
    } catch (error) {
        res.json({msg: error})
    }
})

userRouter.post('/', async (req, res) => {
    const data = req.body as Users;
    const id = await createUser(data)
    res.json({id}).status(201)
})

userRouter.get('/:id', async (req, res) => {
    if(req.params.id){
        if(!isNaN(parseInt(req.params.id))){
            const id = parseInt(req.params.id)
            const user = await getUser(id)
            res.json(user).status(200)
            return
        }

        res.json({msg: "id not provided"}).status(400)
        return
    }

    res.json({msg: "id not provided"}).status(400)
    return
})

userRouter.patch('/:id', async (req, res) => {
    if(req.params.id){
        if(!isNaN(parseInt(req.params.id))){
            const data = req.body as Users
            const id = Number(req.params.id)
            data.id = id;
            await updateUser(data)
            res.json({id}).status(200)
            return
        }

        res.json({msg: "id not provided"}).status(400)
        return
    }

    res.json({msg: "id not provided"}).status(400)
    return
})

userRouter.delete('/:id', async (req, res) => {
   const result = await deleteUser(Number(req.params.id))
   res.json({isDeleted: result}).status(200)
})

export default userRouter;