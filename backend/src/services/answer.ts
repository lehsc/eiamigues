import { connectdb } from "../config/db";
import { Answers } from "../models/answers";

export const getAnswers = async (): Promise<Answers[]> => {
    const db = await connectdb()
    const answers = await db.query("SELECT * FROM answers ORDER BY id DESC")
    return answers.rows as Answers[]
}

export const getAnswer = async (id: number): Promise<Answers | null> => {
    const db = await connectdb()
    const Answer = await db.query("SELECT * FROM answers WHERE id = $1", [id])
    if (Answer) return Answer.rows[0] as Answers
    return null
}

export const createAnswer = async (answer: Answers): Promise<number> => {
    const db = await connectdb()
    const result = await db.query("INSERT INTO answers (user_id, post_id, content, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [answer.user_id, answer.post_id, answer.content, answer.created_at, answer.updated_at])
    if (result.rows[0].id) return result.rows[0].id
    return 0;
}

export const updateAnswer = async (answer: Answers): Promise<number> => {
    const db = await connectdb()
    const data = await getAnswer(answer.id)

    if (data){
        const result = await db.query("UPDATE answers SET user_id = $1, post_id = $2, content = $3, created_at = $4, updated_at = $5 WHERE id = $6 RETURNING id",
            [answer.user_id, answer.post_id, answer.content, answer.created_at, answer.updated_at, answer.id])
        if (result.rows[0].id) return result.rows[0].id

        return 0;
    }

    return 0;
}

export const deleteAnswer = async (id: number): Promise<boolean> => {
    const db = await connectdb()
    const isDeleted = await db.query("DELETE FROM answers WHERE id = $1 RETURNING 1 AS RESULT", [id])
    if (isDeleted) return true
    return false
}