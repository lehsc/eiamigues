import { Router } from "express"
import { getAnswers, getAnswer, createAnswer, updateAnswer , deleteAnswer } from "../services/answer"
import { Answers } from "../models/answers"

const answerRouter = Router()

answerRouter.get('/', async (req, res) => {
    try {
        const answers =  await getAnswers()
        res.json(answers).status(200)
    } catch (error) {
        res.json({msg: error})
    }
})

answerRouter.get('/:id', async (req, res) => {
    try {
        if (req.params.id){
            if (!isNaN(parseInt(req.params.id))){
                const post =  await getAnswer(Number(req.params.id))
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

answerRouter.post('/', async (req, res) => {
    try {
        const post = req.body as Answers
        const id = await createAnswer(post)
        res.json({id}).status(201)
    } catch (error) {
        res.json({msg: error})
    }
})

answerRouter.patch('/:id', async (req, res) => {
    try {
        if (req.params.id){
            if (!isNaN(parseInt(req.params.id))){
                const data = req.body as Answers
                const id = Number(req.params.id)
                data.id = id;
                await updateAnswer(data)
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

answerRouter.delete('/:id', async (req, res) => {
    try {
        if (req.params.id){
            if (!isNaN(parseInt(req.params.id))){
                const result = await deleteAnswer(Number(req.params.id))
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

export default answerRouter