import { Router } from "express"
import { getAttributes, getAttribute, createAttribute, updateAttribute , deleteAttribute } from "../services/attribute"
import { Attributes } from "../models/attributes"

const attribRouter = Router()

attribRouter.get('/', async (req, res) => {
    try {
        const attributes =  await getAttributes()
        res.json(attributes).status(200)
    } catch (error) {
        res.json({msg: error})
    }
})

attribRouter.get('/:id', async (req, res) => {
    try {
        if (req.params.id){
            if (!isNaN(parseInt(req.params.id))){
                const attribute =  await getAttribute(Number(req.params.id))
                res.json(attribute).status(200)
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

attribRouter.post('/', async (req, res) => {
    try {
        const attribute = req.body as Attributes
        const id = await createAttribute(attribute)
        res.json({id}).status(201)
    } catch (error) {
        res.json({msg: error})
    }
})

attribRouter.patch('/:id', async (req, res) => {
    try {
        if (req.params.id){
            if (!isNaN(parseInt(req.params.id))){
                const data = req.body as Attributes
                const id = Number(req.params.id)
                data.id = id;
                await updateAttribute(data)
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

attribRouter.delete('/:id', async (req, res) => {
    try {
        if (req.params.id){
            if (!isNaN(parseInt(req.params.id))){
                const result = await deleteAttribute(Number(req.params.id))
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

export default attribRouter